import Link from 'next/link';

import Layout from '../components/Layout';

const IndexPage: React.SFC = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="text-default-secondary">Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
