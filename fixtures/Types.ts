import { JSX } from 'react';

export type TStringOrComponent = string | React.JSXElementConstructor<any>;

export type PolymorphicProps<
  T extends TStringOrComponent,
  Props = {}
> = Props &
  (T extends React.JSXElementConstructor<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : {}) & {
      as?: T;
    };

export type TextInputProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
