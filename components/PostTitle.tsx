const PostTitle: React.FCC = ({ children }) => {
  return (
    <h1
      className="my-2 text-3xl font-extrabold
            tracking-tight dark:text-white
            md:my-4 md:leading-none md:text-4xl lg:text-5xl xl:text-6xl"
    >
      {children}
    </h1>
  );
};

export default PostTitle;
