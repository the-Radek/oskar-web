import { notFound } from 'next/navigation';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import { getImage, getImageWindow } from '@/lib/actions/image';
import { parseId } from '@/lib/utilities/parse-id';
import { LIGHTBOX_CHUNK } from '@/app/galerie/constants';
import LightboxView from './view';
import type { LightboxProps } from './lightbox.types';

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

  const initial = await getImageWindow(image, LIGHTBOX_CHUNK);
  return <LightboxView initial={initial} standalone={standalone} />;
}
