import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import { getImage, getImageWindow, isImageInPost } from '@/lib/actions/image';
import { parseId } from '@/lib/utilities/parse-id';
import { LIGHTBOX_CHUNK } from '@/app/galerie/constants';
import LightboxView from './view';
import type { LightboxProps } from './lightbox.types';

function postIdFromPath(path: string | null): number | undefined {
  const match = path?.match(/^\/clanky\/(\d+)\/?(?:[?#]|$)/);
  return match ? Number(match[1]) : undefined;
}

export default async function LightboxPhoto({ params, standalone = false }: LightboxProps) {
  const { id } = await params;
  const image = await getImage(parseId(id));

  if (!image) {
    if (standalone) notFound();
    return (
      <Backdrop open sx={{ zIndex: 'modal' }}>
        <Typography color="inherit">Fotografie nenalezena.</Typography>
      </Backdrop>
    );
  }

  // soft navigation from a post: walk that post's images instead of the whole gallery
  const origin = standalone ? undefined : postIdFromPath((await headers()).get('next-url'));
  const postId = origin && (await isImageInPost(image.id, origin)) ? origin : undefined;

  const initial = await getImageWindow(image, LIGHTBOX_CHUNK, postId);
  return <LightboxView initial={initial} standalone={standalone} postId={postId} />;
}
