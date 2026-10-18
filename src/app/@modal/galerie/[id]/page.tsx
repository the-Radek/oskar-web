import Photo from '@/app/galerie/[id]/photo';

// Everything interception doesn't catch: hard navigation (direct visit, refresh, shared link).
// standalone, since there's no guarantee the listing was already in view before this.
export default function ImageModal({ params }: { params: Promise<{ id: string }> }) {
  return <Photo params={params} standalone />;
}
