import { test, describe, expect } from "@jest/globals";
import { IntensitySegments } from "../src/intensity-segments";

describe("major scenarios", () => {
  test("should add segments and print serialized output properly", () => {
    const segments = new IntensitySegments();

    expect(segments.toString()).toEqual('"[]"');

    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual('"[[10,1],[30,0]]"');

    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual('"[[10,1],[20,2],[30,1],[40,0]]"');

    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual('"[[10,-1],[20,0],[30,-1],[40,0]]"');
  });

  test("should correctly remove the segments breakpoints whose intensity is 0 and print serialized output properly", () => {
    const segments = new IntensitySegments();

    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual('"[[10,1],[30,0]]"');

    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual('"[[10,1],[20,2],[30,1],[40,0]]"');

    segments.add(10, 40, -1);
    expect(segments.toString()).toEqual('"[[20,1],[30,0]]"');

    segments.add(10, 40, -1);
    expect(segments.toString()).toEqual('"[[10,-1],[20,0],[30,-1],[40,0]]"');
  });

  test("should set segments and print serialized output properly", () => {
    const segments = new IntensitySegments();

    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual('"[[10,1],[30,0]]"');

    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual('"[[10,1],[20,2],[30,1],[40,0]]"');

    segments.set(10, 40, 1);
    expect(segments.toString()).toEqual('"[[10,1],[40,0]]"');
  });
});
