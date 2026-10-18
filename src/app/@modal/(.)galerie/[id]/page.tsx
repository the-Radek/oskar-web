import Photo from '@/app/galerie/[id]/photo';

// Soft navigation from anywhere already inside the app (root is always mounted): intercepted,
// so whatever page you're on stays mounted and only this slot's content changes.
export default function ImageModal({ params }: { params: Promise<{ id: string }> }) {
  return <Photo params={params} />;
}
