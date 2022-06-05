import Head from 'next/head';
import configuration from '~/configuration';

import BlogPost from '~/lib/blog/blog-post';
import Post from '~/components/Post';
import Header from '~/components/Header';
import PostsList from '~/components/PostsList';
import LayoutContainer from '~/components/LayoutContainer';
import Meta from '~/components/Meta';

import {
  getCategory,
  getPost,
  getPosts,
  useContextualGetPost,
} from '~/lib/blog/queries';

type Props = {
  post: BlogPost;
  morePosts: BlogPost[];
  slug: string;
};

type Params = {
  params: {
    slug: string;
    category: string;
  };
};

const PostPage = (props: Props) => {
  const { slug, morePosts } = props;
  const getPostParams = { slug: `${slug}.mdx` };
  const post = useContextualGetPost(getPostParams, props.post);

  if (!post) {
    return;
  }

  return (
    <>
      <Meta />
      <Header />

      <LayoutContainer>
        <PostHead post={post} />
        <Post post={post} />

        <div className={'mx-auto mt-8 flex max-w-5xl flex-col space-y-8 pb-32'}>
          <div>
            <h4 className={'flex justify-center text-xl font-medium'}>
              Learn more about {post.category.name}
            </h4>
          </div>

          <div>
            <PostsList posts={morePosts} />
          </div>
        </div>
      </LayoutContainer>
    </>
  );
};

export default PostPage;

function PostHead({ post }: React.PropsWithChildren<{ post: BlogPost }>) {
  const title = post.title;
  const structuredDataJson = getStructuredData(post);
  const fullImagePath = getFullImagePath(post.image);

  return (
    <Head>
      <title>{title}</title>

      <meta property="og:type" content="article" />
      <meta key="og:title" property="og:title" content={title} />
      <meta property="article:published_time" content={post.date} />

      <meta key="twitter:title" property="twitter:title" content={title} />

      <meta
        key="twitter:image"
        property="twitter:image"
        content={fullImagePath}
      />

      {post.description && (
        <>
          <meta
            key="twitter:description"
            property="twitter:description"
            content={post.description}
          />

          <meta
            key="og:description"
            property="og:description"
            content={post.description}
          />

          <meta
            key="meta:description"
            name="description"
            content={post.description}
          />
        </>
      )}

      {post.canonical && (
        <link rel="canonical" href={post.canonical} key="canonical" />
      )}

      {fullImagePath && (
        <meta key={'og:image'} property="og:image" content={fullImagePath} />
      )}

      <script
        key="ld:json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataJson),
        }}
      />
    </Head>
  );
}

export async function getStaticProps({ params }: Params) {
  const { slug } = params;
  const getPostParams = { slug: `${slug}.mdx` };
  const post = await getPost(getPostParams);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const category = await getCategory({
    slug: `${params.category}.json`,
  });

  const morePosts = await getPosts({
    category: category.name,
    last: configuration.blog.maxReadMorePosts,
    shouldDisplayAllPosts: !configuration.production,
  });

  return {
    props: {
      post,
      morePosts,
      slug,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts({
    shouldDisplayAllPosts: !configuration.production,
  });

  const paths = posts.map((post) => {
    const slug = post.slug;
    const category = post.category.slug;

    return {
      params: {
        category,
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

function getStructuredData(post: BlogPost) {
  const fullImagePath = getFullImagePath(post.image);

  return {
    '@context': 'https://schema.org/',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/article',
    },
    image: [fullImagePath],
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url,
    },
    datePublished: post.date,
  };
}

function getFullImagePath(path: string) {
  return `${configuration.site.siteUrl}${path}`;
}
