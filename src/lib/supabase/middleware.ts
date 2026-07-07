import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

  const supabase = createServerClient(
    dbUrl,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do NOT rely on client session checks. Verify from Supabase getUser()
  let user = null;
  try {
    if (dbUrl !== "https://placeholder.supabase.co") {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    }
  } catch (err) {
    console.error("Middleware session verification error:", err);
  }

  const url = request.nextUrl.clone();

  // If user is not authenticated and trying to open a protected admin route, redirect to login
  if (!user && url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // If user is authenticated and trying to open the login page, redirect to dashboard
  if (user && url.pathname === "/admin/login") {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
