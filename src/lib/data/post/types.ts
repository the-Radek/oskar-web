/**
 * A published post as listed (excerpt instead of content).
 */
export interface PostSummary {
  id: number;
  title: string;
  /** ISO date string */
  createdAt: string;
  excerpt: string;
  image: { src: string; alt: string; blurDataURL?: string } | null;
}
