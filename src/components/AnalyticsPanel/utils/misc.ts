import { SPAOrbitalPoint, SPATerrestrialPoint } from "../types/types";

export function toOrbitalPoint(point: SPAOrbitalPoint | SPATerrestrialPoint): SPAOrbitalPoint {
    if (Object.hasOwn(point, 'eccentricity')) {
        return point as SPAOrbitalPoint;
    } else {
        const tPoint = point as SPATerrestrialPoint;
        return { altitude: tPoint.latitude, inclination: tPoint.longitude, eccentricity: tPoint.altitude };
    }
}

export function stateToOrbitalPoint(isOrbital: boolean, altitude?: number, inclination?: number, eccentricity?: number, latitude?: number, longitude?: number) {
    if (isOrbital) {
        return { altitude: altitude, inclination: inclination, eccentricity: eccentricity };
    } else {
        return { altitude: latitude, inclination: longitude, eccentricity: altitude };
    }
}

export function toRunningAverage(acc: null | number[], cv: number): number[] {
    if (acc == null) acc = [];
    let lastAvg = acc.length > 0 ? acc[acc.length - 1] : 0;
    acc.push((cv + lastAvg * acc.length) / (acc.length + 1));
    return acc;
}

export const SCATTER_COLORS = [
    '#E34747',
    '#C68B5E',
    '#0D698B',
    '#E66912',
    '#016367',
    '#6D8343',
    '#B22A80',
    '#5bc0de'
  ];