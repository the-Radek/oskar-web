'use client';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import type { GoBackButtonProps } from './go-back-button.types';

export default function GoBackButton({ children, ...rest }: GoBackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => router.back()}
      {...rest}
    >
      {children}
    </Button>
  );
}
