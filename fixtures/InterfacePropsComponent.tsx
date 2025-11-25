import React from 'react';

interface InterfaceProps {
  label: string;
  disabled?: boolean;
}

const InterfacePropsComponent: React.FC<InterfaceProps> = (props) => {
  return <button disabled={props.disabled}>{props.label}</button>;
};

export default InterfacePropsComponent;
