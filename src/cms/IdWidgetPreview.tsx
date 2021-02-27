import React, { FC, ReactNode } from 'react';

interface Props {
  value: ReactNode;
}

export const IdWidgetPreview: FC<Props> = props => {
  const { value } = props;

  return <div>{value}</div>;
};
