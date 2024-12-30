export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export interface FilterOption<T> {
  key: keyof T;
  label: string;
}
