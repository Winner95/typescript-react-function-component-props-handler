import React from 'react';

type TagProps = {
  type?: 'normal' | 'warning' | 'error' | 'info';
  onRemove?: () => void;
  isDisabled?: boolean;
  children?: React.ReactNode;
};

export const Tag: React.FC<TagProps> = (props) => {
  return <>{props.children}</>;
};
