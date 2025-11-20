import React from 'react';

import { TStringOrComponent, PolymorphicProps } from './Types';

type SecondaryIconButtonOwnProps = {
  icon: React.ReactElement;
  type?: 'button' | 'submit' | 'reset';
  color?: 'solid' | 'neutral' | 'warning';
};

type SecondaryIconButtonProps<T extends TStringOrComponent = 'button'> =
  PolymorphicProps<T, SecondaryIconButtonOwnProps>;

export const SecondaryIconButton: React.FC<SecondaryIconButtonProps> = ({
  color,
}) => {
  return <button>{color}</button>;
};
