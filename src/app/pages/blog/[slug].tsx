// pages/blog/[slug].tsx
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const BlogPost: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <h1>Blog Post: {slug}</h1>;
};

export default BlogPost;