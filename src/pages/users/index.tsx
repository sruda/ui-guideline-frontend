import Layout from '@components/Layout';
import List from '@components/List';
import { User } from '@interfaces/user';
import { sampleUserData } from '@utils/sample-data';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Tag, { Use as TagUse } from '@atoms/Tag/Tag';

type Props = {
  items: User[];
};

const WithStaticProps: React.SFC<Props> = ({ items }) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p className="mb-5">
      <Link href="/">
        <a>Go home</a>
      </Link>
      <Tag use={TagUse.negative}>LABEL</Tag>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;
  return { props: { items } };
};

export default WithStaticProps;
