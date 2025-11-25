import React from 'react';

interface StackProps {
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  gap?: 'xs' | 's' | 'm' | 'l';
  children?: React.ReactNode;
}

export const Stack: React.FC<StackProps> = (props) => {
  return <>{props.children}</>;
};
