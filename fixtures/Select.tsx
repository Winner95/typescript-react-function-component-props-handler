import React from 'react';

type SelectOption<Value = string> = {
  value: Value;
  label: string;
  isDisabled?: boolean;
};

type BaseSelectProps<Value> = {
  options: Array<SelectOption<Value>>;
  value: Value | null;
  onChange: (value: Value | null) => void;
  isClearable?: boolean;
  isMulti?: false;
};

type MultiSelectProps<Value> = {
  options: Array<SelectOption<Value>>;
  value: Value[];
  onChange: (value: Value[]) => void;
  isMulti: true;
};

type SelectProps<Value = string> =
  | BaseSelectProps<Value>
  | MultiSelectProps<Value>;

export const Select: React.FC<SelectProps> = ({ value }) => {
  return <span>{value}</span>;
};
