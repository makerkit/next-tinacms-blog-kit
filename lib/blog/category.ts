interface WithEmoji {
  emoji?: string;
}

interface WithLogo {
  logo?: string;
}

interface Category extends WithEmoji, WithLogo {
  name: string;
  slug: string;
  emoji: string;

  _sys: {
    filename: string;
  };
}

export default Category;
