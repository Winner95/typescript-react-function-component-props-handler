import React from 'react';

type TooltipTargetOwnProps = {
  isDisabled?: boolean;
  children: React.ReactNode;
};

type TooltipTargetProps<T extends TStringOrComponent> = PolymorphicProps<
  T,
  TooltipTargetOwnProps
>;

type TooltipTargetComponent = <T extends TStringOrComponent = 'span'>(
  props: TooltipTargetProps<T> & { ref?: React.Ref<Element> }
) => React.ReactElement | null;

export const TooltipTarget = React.forwardRef(function TooltipTarget<
  T extends TStringOrComponent = 'span'
>(props: TooltipTargetProps<T>, ref: React.Ref<Element>) {
  // ...
}) as TooltipTargetComponent;
