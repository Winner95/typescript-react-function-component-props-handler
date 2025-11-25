import React from 'react';
import { TextInputProps } from './Types';

type FieldLabelProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  badge?: React.ReactNode;
  isRequired?: boolean;
};

type FieldErrorProps = {
  errors?: React.ReactNode;
  touched?: boolean;
};

type TextFieldProps = FieldLabelProps &
  FieldErrorProps & {
    // Field-level events
    onInfoButtonClick?: () => void;
  } & TextInputProps;

export const TextField: React.FC<TextFieldProps> = ({ title }) => {
  return <span>{title}</span>;
};
