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
    // insert
    segments.set(from, (segments.get(from) || 0) + amount);
    segments.set(to, (segments.get(to) || 0) - amount);

    return this;
  }

  set(
    from: TBreakpoint,
    to: TBreakpoint,
    amount: TIntensity
  ): InstanceType<typeof IntensitySegments> {
    const segments = this.segments;
    const iterator = segments.entries();
    let currentSegment = iterator.next();

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

    return this;
  }

  toString(): string {
    let currentIntensity = 0;
    let result: string = "";

    // generate new map sorted by breakpoints, in case that the Map order is just the `INSERT` order
    const mapArray = Array.from(this.segments);
    mapArray.sort(([breakpointA], [breakpointB]) => breakpointA - breakpointB);

    // accumulate intensity
    const accumuteIntensityArray: TSegment[] = [];

    for (let i = 0; i < mapArray.length; i++) {
      const [breakpoint, intensity] = mapArray[i];
      currentIntensity += intensity;
      accumuteIntensityArray.push([breakpoint, currentIntensity]);
    }

    for (let i = 0; i < accumuteIntensityArray.length; i++) {
      // purge leading zero intensity segment
      if (i === 0) {
        const [breakpoint, intensity] = accumuteIntensityArray[i];
        if (intensity !== 0) {
          result += `[${breakpoint},${intensity}],`;
        }
        // merge segment into previous one if their intensity are equal
      } else {
        const [breakpoint, intensity] = accumuteIntensityArray[i];
        const [previousBreakpoint, previousIntensity] = accumuteIntensityArray[i - 1];
        if (intensity !== previousIntensity) {
          result += `[${breakpoint},${intensity}],`;
        }
      }
    }

    if (result === "") {
      return '"[]"';
    } else {
      result = `"[${result.substring(0, result.length - 1)}]"`;
    }

    return result;
  }
}
