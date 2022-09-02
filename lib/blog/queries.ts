import { useEffect, useState } from 'react';

import { gql, staticRequest } from 'tinacms';
import shouldUseTinaEditor from '~/lib/should-use-tina-editor';

import Post from '~/lib/blog/blog-post';
import Category from '~/lib/blog/category';

const POST_FRAGMENT = gql`
    fragment PostFragment on Posts {
        id
        title
        content
        live
        date
        description
        image
        tags
        _sys {
            filename
        }
        author {
            ... on Authors {
                name
                url
                picture
                _sys {
                    filename
                }
            }
        }
        category {
            ... on Categories {
                name
                _sys {
                    filename
                }
            }
        }
    }
`;

export async function getPost(params: { slug: string }) {
    const postsListData = (await staticRequest({
      variables: {
        relativePath: params.slug,
      },
        query: gql`
            ${POST_FRAGMENT}
            query PostQuery($relativePath: String!) {
                posts(relativePath: $relativePath) {
                    ...PostFragment
                }
            }
        `,
    })) as {
      posts: Post & { id: string };
    };

  return postMapper({
    node: postsListData.posts,
  });
}

export function useContextualGetPost(
  params: {
    slug: string;
  },
  data: Post
) {
  const useTina = useLoadTina();

    const result = useTina<{
      posts: Post;
    }>({
      variables: {
        relativePath: params.slug,
      },
        query: gql`
            ${POST_FRAGMENT}
            query PostQuery($relativePath: String!) {
                posts(relativePath: $relativePath) {
                    ...PostFragment
                }
            }
        `,
      data: {
        posts: data,
      },
    });

  if (result.isLoading || !result.data) {
    return;
  }

  return postMapper({
    node: result.data.posts,
  });
}

export async function getCategory(params: { slug: string }) {
    const categoriesListData = (await staticRequest({
      variables: {
        relativePath: params.slug,
      },
        query: gql`
            query CategoryQuery($relativePath: String!) {
                categories(relativePath: $relativePath) {
                    id
                    name
                }
            }
        `,
    })) as {
      categories: Category & { id: string };
    };

  return categoriesListData.categories;
}

export async function getPosts(params: {
  sort?: string;
  last?: number;
  category?: string;
  shouldDisplayAllPosts?: boolean;
}): Promise<Post[]> {
  const sort = params.sort ?? 'date';
  const last = params.last ?? Infinity;
  const category = params.category;

  const categoryFilter = category
    ? {
      category: { categories: { name: { eq: category } } },
    }
    : {};

  const publishedFilter = params.shouldDisplayAllPosts
    ? {}
    : {
      live: { eq: true },
    };

  const filter = {
    ...categoryFilter,
    ...publishedFilter,
  };

    const postsListData = (await staticRequest({
      variables: {
        sort,
        last,
        filter,
      },
        query: gql`
            ${POST_FRAGMENT}
            query PostsQuery($sort: String!, $last: Float, $filter: PostsFilter) {
                postsConnection(sort: $sort, last: $last, filter: $filter) {
                    pageInfo {
                        hasPreviousPage
                        endCursor
                    }
                    edges {
                        node {
                            ...PostFragment
                        }
                    }
                }
            }
        `,
    })) as {
      postsConnection: {
        edges: Array<{
          node: Post;
        }>;
      };
    };

  return postsListData.postsConnection.edges.map(postMapper);
}

function getSlugFromFilename(filename: string) {
  return filename.split('.')[0];
}

function postMapper(item: { node: Post }): Post {
  const post = item.node;
  const slug = getSlugFromFilename(post._sys.filename);

  const category = {
    ...post.category,
    slug: getSlugFromFilename(post.category._sys.filename),
  };

  return {
    ...post,
    slug,
    category,
  };
}

function useLoadTina() {
  const noop = <T>(props: any) => {
    return {
      data: props.data,
      isLoading: false,
    };
  };

  const [hook, setHook] = useState(() => noop);

  useEffect(() => {
    void (async () => {
      if (shouldUseTinaEditor()) {
        const { useTina } = await import('tinacms/dist/edit-state');

        setHook(() => useTina);
      }
    });
  }, []);

  return hook;
}
