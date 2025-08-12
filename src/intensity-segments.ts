import { TBreakpoint, TIntensity, TSegment } from "./types";

export class IntensitySegments {
  segments: Map<TBreakpoint, TIntensity>;

  constructor() {
    this.segments = new Map<TBreakpoint, TIntensity>();
  }
  add(from: number, to: number, amount: number) {}

  set(from: number, to: number, amount: number) {}

  toString() {}
}
