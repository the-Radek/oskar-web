import ReactMarkdown from 'react-markdown';
import { MarkdownProps } from './markdown.types';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Email from '@/components/data/Email';
import Phone from '@/components/data/Phone';
import Link from '@mui/material/Link';
import RouterLink from '@/components/navigation/RouterLink';
import List from '../List';

function heading(level: number, shift: number, children: React.ReactNode) {
  const newLevel = level + shift - 1;
  let variant: TypographyProps['variant'];
  if (newLevel < 1) variant = 'h1';
  else if (newLevel > 6) variant = 'h6';
  else variant = `h${newLevel}` as TypographyProps['variant'];
  return <Typography variant={variant}>{children}</Typography>;
}

export default function Markdown({ children, headingLevel = 1, ...rest }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => heading(1, headingLevel, children),
        h2: ({ children }) => heading(2, headingLevel, children),
        h3: ({ children }) => heading(3, headingLevel, children),
        h4: ({ children }) => heading(4, headingLevel, children),
        h5: ({ children }) => heading(5, headingLevel, children),
        h6: ({ children }) => heading(6, headingLevel, children),
        p: ({ children }) => (
          <Typography align="justify" sx={{ marginBottom: '0.5em' }}>
            {children}
          </Typography>
        ),
        a: ({ children, href }) => {
          if (href === undefined) {
            return <Typography component="span">{children}</Typography>;
          } else if (href.startsWith('mailto:')) {
            return <Email>{href.slice(7)}</Email>;
          } else if (href.startsWith('tel:')) {
            return <Phone>{href.slice(4)}</Phone>;
          } else if (href.startsWith('http')) {
            return <Link href={href}>{children}</Link>;
          } else {
            return <RouterLink href={href}>{children}</RouterLink>;
          }
        },
        ul: ({ children }) => <List>{children}</List>,
      }}
      {...rest}
    >
      {children}
    </ReactMarkdown>
  );
}
