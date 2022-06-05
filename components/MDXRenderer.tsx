import MDXComponents from '~/components/MDXComponents';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';

function MDXRenderer({ content }: { content: TinaMarkdownContent }) {
  // @ts-ignore
  return <TinaMarkdown components={MDXComponents} content={content} />;
}

export default MDXRenderer;
