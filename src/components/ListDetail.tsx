import { User } from '@interfaces/index';
import * as React from 'react';

type ListDetailProps = {
  item: User;
};

const ListDetail: React.SFC<ListDetailProps> = ({ item: user }) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail;
