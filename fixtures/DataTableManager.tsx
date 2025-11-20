import React from 'react';

type DataTableColumn<Row> = {
  key: string;
  label: string;
  isSortable?: boolean;
  renderItem: (row: Row) => React.ReactNode;
};

type DataTableProps<Row> = {
  rows: Row[];
  columns: Array<DataTableColumn<Row>>;
  itemRenderer?: (row: Row) => React.ReactNode;
};

type LayoutSettings = {
  density: 'compact' | 'cozy' | 'comfortable';
  isCondensed?: boolean;
};

type ColumnManager = {
  hiddenColumns: string[];
  primaryButton?: React.ReactElement;
  secondaryButton?: React.ReactElement;
};

type DataTableManagerProps<Row> = {
  dataTableProps: DataTableProps<Row>;
  displaySettings?: LayoutSettings;
  columnManager?: ColumnManager;
  onSettingsChange?: (action: string, nextValue: object) => void;
};

export const DataTableManager: React.FC<DataTableManagerProps<any>> = (props) => {
  return <>{props.displaySettings?.density}</>;
};
