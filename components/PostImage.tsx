import Image from 'next/image';

type Props = {
  title: string;
  src: string;
  preloadImage?: boolean;
  width?: number;
  height?: number;
  className?: string;
};

const PostImage = ({
  title,
  src,
  width,
  height,
  className,
  preloadImage,
}: Props) => {
  return (
    <Image
      objectFit={'cover'}
      layout={'fill'}
      className={`rounded-t-lg shadow-xl ${className}`}
      src={src}
      priority={preloadImage}
      alt={`Cover Image for ${title}`}
      width={width}
      height={height}
    />
  );
};

export default PostImage;
