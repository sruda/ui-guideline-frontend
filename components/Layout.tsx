import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

import Button, { Use as ButtonUse } from '../components/atoms/Button/Button';

type Props = {
  title?: string;
};

const Layout: React.SFC<Props> = ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a>Users List</a>
        </Link>{' '}
        | <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <Button className="mx-10" use={ButtonUse.primary}>
        TEST
      </Button>
      <span>I am here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
