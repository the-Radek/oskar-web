import GoogleButton from '@/components/auth/GoogleButton';
import ApplicationButton from '@/components/common/ApplicationButton';
import RouterLink from '@/components/navigation/RouterLink';
import Typography from '@mui/material/Typography';

export default async function Home() {
  return (
    <main>
      <ApplicationButton />
      <Typography variant="h1" component="h1">
        Aktuality
      </Typography>
      <GoogleButton />
      <RouterLink href="/clanky">Články</RouterLink>
    </main>
  );
}
