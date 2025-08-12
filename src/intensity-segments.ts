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
    segments.set(to, -amount);
    console.log("set after segments", segments);
    return this;
  }

  toString(): string {
    let currentIntensity = 0;
    let result: string = "";

    // generate new map sorted by breakpoints
    const mapArray = Array.from(this.segments);
    mapArray.sort(([breakpointA], [breakpointB]) => breakpointA - breakpointB);

    // accumulate intensity
    const accumuteIntensityArray: TSegment[] = [];

    for (let i = 0; i < mapArray.length; i++) {
      const [breakpoint, intensity] = mapArray[i];
      console.log("breakpoint", breakpoint);
      console.log("intensity", intensity);
      console.log("currentIntensity", currentIntensity);
      currentIntensity += intensity;
      console.log("currentIntensity", currentIntensity);
      console.log("");
      accumuteIntensityArray.push([breakpoint, currentIntensity]);
    }
    console.log("accumuteIntensityArray", accumuteIntensityArray);

    // purge segments whose intensities are 0 except for the tail
    const nonZeroIntensityArray: TSegment[] = [];

    for (let i = accumuteIntensityArray.length - 1; i > -1; i--) {
      const [breakpoint, intensity] = accumuteIntensityArray[i];
      if (i === 0) {
        if (intensity !== 0) {
          nonZeroIntensityArray.push([breakpoint, intensity]);
        }
      } else {
        const [nextBreakpoint, previousIntensity] = accumuteIntensityArray[i - 1];
        if (!(intensity === 0 && previousIntensity === 0)) {
          nonZeroIntensityArray.push([breakpoint, intensity]);
        }
      }
    }

    nonZeroIntensityArray.reverse();

    // structure string on-demand
    for (let segment of nonZeroIntensityArray) {
      const [breakpoint, intensity] = segment;
      result += `[${breakpoint},${intensity}],`;
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
