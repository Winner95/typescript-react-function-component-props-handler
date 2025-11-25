import React from 'react';

type IconProps = Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height' | 'focusable'
> & {
  size?: 'small' | 'medium' | 'big';
  color?: 'solid' | 'neutral' | 'warning';
};

export const Icon: React.FC<IconProps> = ({ size }) => {
  return <span>{size}</span>;
};
