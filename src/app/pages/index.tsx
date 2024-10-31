// pages/index.tsx
// import Link from 'next/link';
// import { NextPage } from 'next';


// const Home: NextPage = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//       <Link href="/about">Go to About</Link>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import Layout from '../layout';


const Home: React.FC = () => {
  return (
    <Layout>
      <h1>Welcome to My App</h1>
      <p>This is the homepage.</p>
    </Layout>
  );
};

export default Home;