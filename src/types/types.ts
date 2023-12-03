export type BaseDynamicRouteProps = {
  params: { [key: string]: string };
};

export type ComponentWithChildren = {
  children: React.ReactNode;
};

export type ComponentWithClassnames = {
  classNames?: string;
};
