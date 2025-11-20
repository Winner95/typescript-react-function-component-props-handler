import React from 'react';

type DataAttributes = {
  [key: `data-${string}`]: string | number | undefined;
};

type TextInputProps = {
  id?: string;
  name?: string;
  value: string;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
} & DataAttributes &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export const TextInput: React.FC<TextInputProps> = ({ id, label, 'data-testid': dataTestid }) => {
  return <span id={id} data-testid={dataTestid}>{label}</span>;
};
