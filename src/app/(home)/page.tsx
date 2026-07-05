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
      <Typography variant="h2" component="h2">
        Heading 2
      </Typography>
      <Typography variant="h3" component="h3">
        Heading 3
      </Typography>
      <Typography variant="h4" component="h4">
        Heading 4
      </Typography>
      <Typography variant="h5" component="h5">
        Heading 5
      </Typography>
      <Typography variant="h6" component="h6">
        Heading 6
      </Typography>
      <p>
        This is a sample paragraph to demonstrate the body text styling. It should be easy to read
        and visually appealing.
      </p>
      <GoogleButton />
      <RouterLink href="/clanky">Články</RouterLink>
    </main>
  );
}
