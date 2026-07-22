import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, name, email, phone, subject, message, role, resumeUrl, photoUrl } = body;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    const receiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL;

    if (!smtpHost || !smtpUser || !smtpPass || !receiverEmail) {
      console.warn("SMTP configuration is missing in environment variables. Email sending skipped.");
      return NextResponse.json(
        { success: false, message: "Email configuration incomplete." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // SSL configuration
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false // bypass self-signed certificate verification
      }
    });

    const isCareer = type === "career";
    const emailSubject = isCareer 
      ? `[Career Application] New candidate: ${name}`
      : `[Contact Enquiry] New submission: ${subject || "No Subject"}`;

    // Elegant HTML body styling matching firm branding
    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #C9A227; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="color: #0F172A; margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 0.5px;">R.A. AGGARWAL & ASSOCIATES</h2>
          <p style="color: #6B7280; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; font-weight: 600; tracking: 1px;">Admin Notification Service</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="font-size: 14px; color: #374151; line-height: 1.5; margin: 0 0 16px 0;">Hello Admin,</p>
          <p style="font-size: 14px; color: #374151; line-height: 1.5; margin: 0 0 20px 0;">You have received a new <strong>${isCareer ? "Job Application" : "Contact Enquiry"}</strong> submission from the website.</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #4B5563; font-weight: bold; width: 140px;">Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${name || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #4B5563; font-weight: bold;">Email Address</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;"><a href="mailto:${email}" style="color: #C9A227; text-decoration: none;">${email || "N/A"}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #4B5563; font-weight: bold;">Phone Number</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${phone || "N/A"}</td>
          </tr>
          ${isCareer ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #4B5563; font-weight: bold;">Applied Position</td>
              <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${role || "N/A"}</td>
            </tr>
          ` : `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #4B5563; font-weight: bold;">Subject</td>
              <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${subject || "N/A"}</td>
            </tr>
          `}
        </table>

        ${message ? `
          <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <span style="display: block; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #878680; margin-bottom: 6px;">Message / Cover Letter</span>
            <p style="font-size: 13px; color: #292524; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        ` : ""}

        ${isCareer && (resumeUrl || photoUrl) ? `
          <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 24px; font-size: 12px; color: #6B7280;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #374151;">Media attachments:</p>
            ${resumeUrl ? `<div style="margin-bottom: 4px;">• <a href="${resumeUrl}" style="color: #C9A227; text-decoration: none;" target="_blank">View Uploaded Resume (Supabase Storage)</a></div>` : ""}
            ${photoUrl ? `<div>• <a href="${photoUrl}" style="color: #C9A227; text-decoration: none;" target="_blank">View Candidate Portrait (Supabase Storage)</a></div>` : ""}
          </div>
        ` : ""}

        <div style="text-align: center; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 24px; font-size: 11px; color: #9CA3AF;">
          This is an automated message sent from the R.A. Aggarwal & Associates website portal.
        </div>
      </div>
    `;

    // Configure attachments array
    const attachments: any[] = [];

    if (isCareer) {
      if (resumeUrl) {
        attachments.push({
          filename: `Resume_${name.replace(/\s+/g, "_")}.pdf`,
          path: resumeUrl,
        });
      }
      if (photoUrl) {
        attachments.push({
          filename: `Photo_${name.replace(/\s+/g, "_")}.jpg`,
          path: photoUrl,
        });
      }
    }

    await transporter.sendMail({
      from: `"${isCareer ? "Careers Portal" : "Website Enquiries"}" <${smtpUser}>`,
      to: receiverEmail,
      subject: emailSubject,
      html: htmlContent,
      attachments,
    });

    return NextResponse.json({ success: true, message: "Notification email sent." });
  } catch (error: any) {
    console.error("API send-email error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to dispatch email." },
      { status: 500 }
    );
  }
}
