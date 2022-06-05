import styles from './PostBody.module.css';
import { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import MDXRenderer from '~/components/MDXRenderer';

const PostBody: React.FCC<{ content: TinaMarkdownContent }> = ({ content }) => {
  return (
    <div className={styles['PostBody']}>
      <MDXRenderer content={content} />
    </div>
  );
};

export default PostBody;
