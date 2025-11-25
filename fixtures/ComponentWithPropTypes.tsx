import React from 'react';

type PropsType = {
  label: string;
  disabled?: boolean;
};

// @ts-ignore: Ignore prop-types validation errors
PropsType.propTypes = {
  label: { required: true },
  disabled: { required: false },
};

const ComponentWithPropTypes: React.FC<PropsType> = (props) => {
  return <button disabled={props.disabled}>{props.label}</button>;
};

ComponentWithPropTypes.propTypes = {
  label: { required: true },
  disabled: { required: false },
};

export default ComponentWithPropTypes;