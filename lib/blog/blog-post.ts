import Author from './author';
import Category from './category';

type BlogPost = {
  author: Author;
  category: Category;
  image: string;
  description: string;
  slug: string;
  title: string;
  date: string;
  live: boolean;
  tags: string[];
  content: string;
  canonical?: string;

  _sys: {
    filename: string;
  };
};

export default BlogPost;
