import React from 'react';

type NoParamProps = {
  label: string;
};

export const NoParamComponent: React.FC<NoParamProps> = () => {
  return <div>Hi</div>;
};

export default NoParamComponent;
