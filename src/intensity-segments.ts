import { TBreakpoint, TIntensity, TSegment } from "./types";

export class IntensitySegments {
  segments: Map<TBreakpoint, TIntensity>;

  constructor() {
    this.segments = new Map();
  }
  add(
    from: TBreakpoint,
    to: TBreakpoint,
    amount: TIntensity
  ): InstanceType<typeof IntensitySegments> {
    const segments = this.segments;
    console.log("add before segments", segments);
    // insert
    segments.set(from, (segments.get(from) || 0) + amount);
    segments.set(to, (segments.get(to) || 0) - amount);
    console.log("add after segments", segments);

    return this;
  }

  set(
    from: TBreakpoint,
    to: TBreakpoint,
    amount: TIntensity
  ): InstanceType<typeof IntensitySegments> {
    const segments = this.segments;
    console.log("set before segments", segments);
    const iterator = segments.entries();
    console.log("iterator", iterator);
    let currentSegment = iterator.next();
    console.log("currentSegment", currentSegment);

    // remove those segments between from and to
    while (!currentSegment.done) {
      const [currentBreakpoint] = currentSegment.value;
      if (currentBreakpoint >= from && currentBreakpoint <= to) {
        segments.delete(currentBreakpoint);
      }
      currentSegment = iterator.next();
    }
    segments.set(from, amount);
    segments.set(to, 0);
    console.log("set after segments", segments);
    return this;
  }

  toString(): string {
    let currentIntensity = 0;
    let result: string = "";

    // generate new map sorted by breakpoints
    const mapArray = Array.from(this.segments);
    mapArray.sort(([breakpointA], [breakpointB]) => breakpointA - breakpointB);

    // remove segments whose intensities are 0
    const non0IntensityArray: TSegment[] = [];
    mapArray.forEach(([breakpoint, intensity], index) => {
      if (intensity !== 0) {
        non0IntensityArray.push([breakpoint, intensity]);
      }
    });

    const SegmentsSortedByBreakpoints = new Map(non0IntensityArray);

    for (let segment of SegmentsSortedByBreakpoints) {
      const [breakpoint, intensity] = segment;
      console.log("breakpoint", breakpoint);
      console.log("intensity", intensity);
      console.log("currentIntensity", currentIntensity);
      currentIntensity += intensity;
      console.log("currentIntensity", currentIntensity);
      console.log("");
      result += `[${breakpoint},${currentIntensity}],`;
    }

    if (result === "") {
      return '"[]"';
    } else {
      result = `"[${result.substring(0, result.length - 1)}]"`;
    }
    console.log("result", result);
    return result;
  }
}
