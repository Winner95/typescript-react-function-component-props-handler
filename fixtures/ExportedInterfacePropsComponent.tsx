import React from 'react';

export interface ExportedProps {
  label: string;
  disabled?: boolean;
}

const ExportedInterfacePropsComponent: React.FC<ExportedProps> = (props) => {
  return <button disabled={props.disabled}>{props.label}</button>;
};

export default ExportedInterfacePropsComponent;