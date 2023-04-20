// prettier-ignore
export const curry =
  (f, d) =>
    (
      ...args
    ) =>
      f(
        d,
        ...args,
      );
