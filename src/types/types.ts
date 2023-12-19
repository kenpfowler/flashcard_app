export type WithParams = {
  params: { [key: string]: string };
};

export type WithSearchParams = {
  searchParams: { [key: string]: string };
};

export type ComponentWithChildren = {
  children: React.ReactNode;
};

export type ComponentWithClassnames = {
  classNames?: string;
};
