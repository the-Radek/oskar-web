import { Metadata } from 'next';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RouterLink from '@/components/navigation/RouterLink';
import metadataJson from './metadata.json';
import styles from './page.module.css';
import { getPublishedPosts } from '@/lib/actions/post';
import { formatDate } from '@/lib/utilities/format-date';
import { excerpt } from '@/lib/utilities/excerpt';

export const metadata: Metadata = metadataJson;

export default async function Posts() {
  const posts = await getPublishedPosts();

  return (
    <main>
      <Typography variant="h1">Články</Typography>
      {posts.length === 0 ? (
        <p>Zatím tu nejsou žádné články.</p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <Card key={post.id} variant="outlined">
              <CardActionArea
                component={RouterLink}
                href={`/clanky/${post.id}`}
                className={styles.root}
              >
                {post.image && (
                  <CardMedia>
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      width={post.image.width}
                      height={post.image.height}
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
                      className={styles.image}
                    />
                  </CardMedia>
                )}
                <CardContent>
                  <Typography component="h2" variant="h4">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="primary.dark" gutterBottom>
                    {formatDate(post.createdAt)}
                  </Typography>
                  <Typography align="justify">{excerpt(post.content)}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
