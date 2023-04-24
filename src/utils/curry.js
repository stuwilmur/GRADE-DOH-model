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

// prettier-ignore
export const curry2 =
  (f, d, e) =>
    (...args) =>
      f(d, e, ...args);
