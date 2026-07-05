import Button from '@mui/material/Button';
import Link from 'next/link';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

export default function ApplicationButton() {
  return (
    <Button
      size="large"
      variant="contained"
      component={Link}
      href="/prihlaska"
      startIcon={<EditDocumentIcon />}
      sx={{ alignSelf: 'center' }}
    >
      Podat přihlášku
    </Button>
  );
}
