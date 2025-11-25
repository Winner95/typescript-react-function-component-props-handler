import React from 'react';

type DisplaySettings = {
  density?: 'compact' | 'cozy' | 'comfortable';
  primaryButton?: React.ReactElement;
  secondaryButton?: React.ReactElement;
};

type ColumnManagerSettings = {
  searchHiddenColumns?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchHiddenColumnsPlaceholder?: string;
  primaryButton?: React.ReactElement;
  secondaryButton?: React.ReactElement;
};

type LayoutSettingsProps = {
  displaySettings?: DisplaySettings;
  columnManager?: ColumnManagerSettings;
  onSettingsChange?: (action: string, nextValue: object) => void;
};

export const LayoutSettings: React.FC<LayoutSettingsProps> = ({
  onSettingsChange,
}) => {
  return <button onClick={() => onSettingsChange}>action</button>;
};
