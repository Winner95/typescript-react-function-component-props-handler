import React from 'react';
import { TextInputProps } from './Types';

type LocalizedString = Record<string, string>;

type LocalizedInputBaseProps<Value extends LocalizedString = LocalizedString> =
  {
    value: any;
    onChange: (value: Value) => void;
    /** Optional selectedLanguage */
    selectedLanguage?: string;
    defaultExpandLanguages?: boolean;
  };

type LocalizedTextInputProps<Value extends LocalizedString = LocalizedString> =
  LocalizedInputBaseProps<Value> & Omit<TextInputProps, 'value' | 'onChange'>;

export const LocalizedTextInput: React.FC<LocalizedTextInputProps> = ({
  value,
}) => {
  return <input value={value} />;
};
