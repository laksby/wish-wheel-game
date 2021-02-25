import React, { FC } from 'react';

export const Layout: FC = props => {
  const { children } = props;

  return <main>{children}</main>;
};
