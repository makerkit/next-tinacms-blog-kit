import BlogPost from '~/lib/blog/blog-post';
import PostTitle from '~/components/PostTitle';
import PostImage from '~/components/PostImage';
import PostMetadata from '~/components/PostMetadata';
import CategoryLink from '~/components/CategoryLink';

const PostHeader: React.FCC<{
  post: BlogPost;
}> = ({ post }) => {
  return (
    <>
      <div className={'mt-2 text-sm'}>
        <CategoryLink category={post.category} />
      </div>

      <PostTitle>{post.title}</PostTitle>

      <h2 className={'my-2 text-xl text-gray-400 md:my-4 lg:text-2xl'}>
        {post.description}
      </h2>

      <div className="mx-auto mb-4 flex flex-col space-y-2 md:mb-6">
        <PostMetadata post={post} />
      </div>

      <div className="mx-auto justify-center relative">
        <PostImage
          className={'rounded-lg h-[26rem]'}
          preloadImage={true}
          title={post.title}
          src={post.image}
        />
      </div>
    </>
  );
};

export default PostHeader;
