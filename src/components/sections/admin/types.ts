export interface DashboardStats {
  totalLatestUpdates: number;
  totalServices: number;
  totalCSRActivities: number;
  totalTeamMembers: number;
  totalGalleryAlbums: number;
  totalGalleryImages: number;
  totalContactEnquiries: number;
  totalPublishedContent: number;
  totalCareersForm: number;
  unreadContactEnquiries: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  module: string;
  adminEmail: string;
  createdAt: string;
}

export interface SystemHealthStatus {
  supabaseConnection: "green" | "yellow" | "red";
  databaseStatus: "green" | "yellow" | "red";
  storageStatus: "green" | "yellow" | "red";
  authenticationStatus: "green" | "yellow" | "red";
  environment: string;
  lastSync: string;
}

export interface AdminDashboardProps {
  stats: DashboardStats;
  activities: ActivityLog[];
  health: SystemHealthStatus;
  isLoading?: boolean;
  error?: string | null;
}
