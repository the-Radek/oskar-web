export interface LightboxProps {
  params: Promise<{ id: string }>;
  /** Opened directly (not over the gallery): closing navigates to the gallery instead of back,
   * and a missing image is a real 404 instead of an inline message. */
  standalone?: boolean;
}
