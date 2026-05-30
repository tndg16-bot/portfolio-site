export interface NoteItem {
  title: string;
  url: string;
  publishedAt: string;
  excerpt: string;
  slug: string;
  categories?: string[];
  thumbnail?: string;
}
