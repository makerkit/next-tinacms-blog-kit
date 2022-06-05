import Link from 'next/link';

const Logo: React.FCC = () => {
  return (
    <div>
      <Link href={'/'} passHref>
        <b>Your Blog</b>
      </Link>
    </div>
  );
};

export default Logo;
