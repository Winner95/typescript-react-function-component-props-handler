import React from 'react';

const PrimaryButtonPrimitive = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (<div {...props} />);
};

type PrimaryButtonPropsFromPackage = React.ComponentPropsWithoutRef<
  typeof PrimaryButtonPrimitive
>;

export const PrimaryButton: React.FC<PrimaryButtonPropsFromPackage> = (
  props
) => <PrimaryButtonPrimitive {...props} />;
