import React from 'react';

import { TStringOrComponent, PolymorphicProps } from './Types';

type AriaProps = {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  role?: string;
};

type AccessibleButtonProps<T extends TStringOrComponent = 'button'> =
  PolymorphicProps<
    T,
    {
      /** required for accessibility */
      label: string;
      isToggleButton?: boolean;
    } & AriaProps
  >;

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  label,
}) => {
  return <button>{label}</button>;
};
