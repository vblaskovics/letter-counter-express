import { expect, test } from "vitest";
import { ok, err, Result, tryit, fail } from "./result";


// test("should check if a result type is ok", () => {
//   const result: Result<number, never> = { type: "ok", value: 0 };
//   expect(result.type === "ok").toBe(true);
// });

// test("should check if an expected error happen", () => {
//   const result: Result<never, "test-expected-error"> = {
//     type: "err",
//     error: "test-expected-error",
//   };
//   expect(result.type).toBe(true);
// });

// test("should check if a result type is err", () => {
//   const result: Result<number, never> = { type: TYPE_ERR, error: new Error() };
//   expect(isErr(result)).toBe(true);
// });

test("should return value when everything is successful", () => {
  const testFn: () => Result<number> = () => {
    return ok(1);
  };
  const result = testFn();
  expect(result.type === "ok").toBe(true);
  expect(result.value).toBe(1);
  expect(result.error).toBeUndefined();
  expect(result.cause).toBeUndefined();
});

test("should return error on unexpeted error", () => {
  class TestError extends Error {} 
  const testFn = (): Result<number, TestError> => {
    return err(new TestError());
  };
  const result = testFn();

  expect(result.value).toBeUndefined();
  expect(result.type === "err").toBe(true);
  expect(result.error).toBeInstanceOf(TestError);
  expect(result.cause).toBeUndefined();
});

test("should return cause on expected error", () => {
  const testFn: () => Result<number, Error, "expected-error"> = () => {
    return fail("expected-error");
  };
  const result = testFn();

  expect(result.type === "fail").toBe(true);
  expect(result.value).toBeUndefined;
  expect(result.error).toBeUndefined();
  expect(result.cause === "expected-error").toBe(true);
});

test("should catch errors thrown by the wrapped function", () => {
  const testFn = () => {
    throw new Error();
  };
  const result = tryit(testFn);
  expect(result.type === "err").toBe(true);
  expect(result.error).toBeInstanceOf(Error);
});

test("should return value if no errors thrown by the wrapped function", () => {
  const testFn = ():string => {
    return "success";
  };
  const result = tryit(() => testFn());
  expect(result.type === "ok").toBe(true);
  expect(result.value).toBe("success");
});
