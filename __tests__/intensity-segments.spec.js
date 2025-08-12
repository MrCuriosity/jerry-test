import { test, describe, expect } from "@jest/globals";

describe("initial test scenario", () => {
  test("should pass", () => {
    const spy = true;
    expect(spy).toBeTruthy();
  });
});
