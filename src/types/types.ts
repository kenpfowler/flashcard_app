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

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; message?: string };

export function createResultObject(ok: boolean, value?: any, message?: string) {
  if (ok) {
    return { ok, value: value };
  }

  return { ok, message: message };
}
