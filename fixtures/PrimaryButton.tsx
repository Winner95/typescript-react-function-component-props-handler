import React, { ElementType } from 'react';

type DataAttributes = {
  [key: `data-${string}`]: string | number | undefined;
};

type CommonButtonProps = {
  label: string;
  isDisabled?: boolean;
  isToggleButton?: boolean;
} & DataAttributes;

type PrimaryButtonOwnProps<T extends React.ElementType> = CommonButtonProps & {
  as?: T;
};

type PrimaryButtonProps<T extends React.ElementType> =
  PrimaryButtonOwnProps<T> &
    Omit<React.ComponentPropsWithRef<T>, keyof PrimaryButtonOwnProps<T>>;

export const PrimaryButton: React.FC<PrimaryButtonProps<ElementType>> = ({ label }) => {
  return <div>{label}</div>;
};
