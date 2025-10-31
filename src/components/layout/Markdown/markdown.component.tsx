import ReactMarkdown from 'react-markdown';
import { MarkdownProps } from './markdown.types';
import Typography from '@mui/material/Typography';

export default function Markdown({ children, ...rest }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <Typography variant="h2">{children}</Typography>,
      }}
      {...rest}
    >
      {children}
    </ReactMarkdown>
  );
}
