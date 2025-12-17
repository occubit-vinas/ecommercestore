export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}


export interface ToggleProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export interface CustomCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface paginationType {
  page:number,
  limit:number,
  pages:number,
  total:number,
}

export type DateRangeValue = {
  from: Date | null | string;
  to: Date | null | string;
};

export type DateRangeFilterProps = {
  value: DateRangeValue | string | Date;
  onChange: (value: DateRangeValue) => void;
  placeholder?: string;
  className?: string;
};


export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}


export type SearchBarProps_ = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | string;
  placeholder?: string;
  className?: string;
};
