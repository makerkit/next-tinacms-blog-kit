import Link from 'next/link';
import Category from '~/lib/blog/category';

const CategoryLink: React.FCC<{
  category: Category;
}> = ({ category }) => {
  const href = `/${category.slug}`;

  return (
    <div>
      <Link href={href} passHref>
        <a>{category.name}</a>
      </Link>
    </div>
  );
};

export default CategoryLink;
