import { describe, expect, test, vi } from "vitest";
import {inject, provide} from './di'

describe("provide", () => {
  
  test("should be able to save and inject providers", async () => {

    const fn = () => {}
    const fnValue = () => {}

    provide(fn, fnValue)
    const fnProvided = inject(fn);
    
    expect(fnProvided).toBe(fnValue);
  });
  
});