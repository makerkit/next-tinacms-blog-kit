import Image from 'next/image';
import AuthorType from '~/lib/blog/author';

const Author: React.FCC<{ author: AuthorType }> = ({ author }) => {
  const alt = `${author.name}'s picture`;
  const imageSize = `36px`;

  return (
    <a
      className={'flex items-center space-x-2 hover:underline'}
      target="_blank"
      rel="noreferrer noopened"
      href={author.url}
    >
      {author.picture ? (
        <Image
          objectFit={'cover'}
          className={'rounded-full'}
          width={imageSize}
          height={imageSize}
          src={author.picture}
          alt={alt}
        />
      ) : null}

      <span>Written by {author.name}</span>
    </a>
  );
};

export default Author;
