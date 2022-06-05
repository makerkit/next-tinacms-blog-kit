import type { NextPage } from 'next';

import BlogPost from '~/lib/blog/blog-post';
import configuration from '~/configuration';

import LayoutContainer from '~/components/LayoutContainer';
import PostsList from '~/components/PostsList';
import Header from '~/components/Header';
import Meta from '~/components/Meta';
import { getPosts } from '~/lib/blog/queries';

const Home: NextPage<{
  posts: BlogPost[];
}> = ({ posts }) => {
  return (
    <>
      <Meta />
      <Header />

      <LayoutContainer>
        <div
          className={'align-center flex h-full flex-col justify-center pb-32'}
        >
          <div className={'my-8'}>
            <h1 className={'text-6xl font-extrabold'}>
              {configuration.site.siteName}
            </h1>
          </div>

          <PostsList posts={posts} />
        </div>
      </LayoutContainer>
    </>
  );
};

export async function getStaticProps() {
  const posts = await getPosts({
    last: 6,
    shouldDisplayAllPosts: !configuration.production,
  });

  return {
    props: {
      posts,
    },
  };
}

export default Home;
