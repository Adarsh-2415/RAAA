export interface SliderImage {
  id: string;
  image_url: string;
  image_path: string;
  status: "draft" | "published" | "deleted";
  display_order: number;
}
