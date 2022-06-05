import BlogPost from '~/lib/blog/blog-post';
import PostHeader from '~/components/PostHeader';
import PostBody from '~/components/PostBody';
import { TinaMarkdownContent } from 'tinacms/dist/rich-text';

const Post: React.FCC<{
  post: BlogPost;
}> = ({ post }) => {
  const content = post.content as unknown as TinaMarkdownContent;

  return (
    <div className={'mx-auto flex max-w-5xl space-x-6'}>
      <div className={'w-full lg:w-8/12'}>
        <article className="mb-16">
          <PostHeader post={post} />

          <div className={'flex'}>
            <PostBody content={content} />
          </div>
        </article>
      </div>

      <div className={'hidden lg:block w-4/12 border-l border-l-gray-100'}></div>
    </div>
  );
};

export default Post;
