import PhotoNotFound from '@/app/galerie/[id]/photo.not-found';

// Hard navigation: shown in the modal slot, the status comes from the notFound() that got here.
export default function StandalonePhotoNotFound() {
  return <PhotoNotFound standalone />;
}
