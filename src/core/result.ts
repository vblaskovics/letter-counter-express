export type Result<T, E = Error, C = never> =
  | { type: "ok"; value: T; error?: never; cause?: never }
  | { type: "err"; value?: never; error: E; cause?: never }
  | { type: "fail"; value?: never; error?: never; cause: C };

export const ok = <T>(value: T): Result<T, never, never> => ({ type: "ok", value });

export const fail = <C>(cause: C): Result<never, never, C> => {
  return { type: "fail", cause };
};

export const err = <E>(error: E): Result<never, E, never> => ({
  type: "err",
  error,
});

export const tryit = <T, E>(fn: () => T): Result<T> => {
  try {
    return ok(fn());
  } catch (error) {
    return err(error);
  }
};
