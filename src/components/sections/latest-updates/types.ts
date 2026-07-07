export interface UpdateArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage?: string;
  publishDate: string;
  author: string;
  status: "draft" | "published";
  isFeatured?: boolean;
  isPinned?: boolean;
  attachments?: { label: string; url: string }[];
  seoTitle?: string;
  seoDescription?: string;
  readingTime?: string;
}

export interface LatestUpdatesProps {
  articles: UpdateArticle[];
  categories: string[];
  isLoading?: boolean;
  error?: string | null;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onSearch?: (query: string) => void;
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
  searchQuery?: string;
}
