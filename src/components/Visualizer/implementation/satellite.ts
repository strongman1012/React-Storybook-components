import WorldWind from '@nasaworldwind/worldwind';
import * as tlejs from 'tle.js';
import orb from 'orbjs/src/orb';
import { MOON_ω, MOON_MASS } from '.';
import { Spacecraft } from './spacecraft';

export class Satellite extends Spacecraft {
    tle: [string, string] | undefined = undefined;
    fov: number = 0;
    launchYear: number = 0;
    launchNum: number = 0;
    launchPiece: string = 'A';
    epoch: Date = new Date();
    meanMotionFirstDerivative: number = 0.0;
    meanMotionSecondDerivative: number = 0.0;
    dragTerm: number = 0.0;
    elementSetNum: number = 0;
    inclination: number = 0.0;
    rightAscensionOfAscendingNode: number = 0.0;
    eccentricity: number = 0.0;
    argumentOfPerigee: number = 0.0;
    meanAnomaly: number = 0.0;
    meanMotion: number = 0.0;
    revolutionNum: number = 0;
    altitude: number | undefined = undefined;
    sma: number = 0;
    fovConeRadiusArc: number = 0.0;
    fovConeBaseAltitude: number = 0.0;
    fovConeMesh: WorldWind.TriangleMesh = null;
    type: string | undefined = undefined;

    constructor(id?: number) {
        if (!id) {
            id = Math.round(Math.random() * 99999);
        }
        super(id);
        this.launchYear = Math.round(Math.random() * 99);
        this.launchNum = Math.round(Math.random() * 999);
        this.launchPiece = 'A';
        this.elementSetNum = Math.round(Math.random() * 9999);
    }

    init = (observerBody: string): void => {
        this.position = new WorldWind.Position();
        if (this.referenceBody === 'EARTH') {
            this.tle = this.toTLE();
        } else {
            return undefined;
        }
    }

    getPosition = (t: number, observerBody: string, fetchData: boolean): (WorldWind.Position | undefined) => {
        if ((this.referenceBody === 'EARTH') && (this.tle)) {
            var satInfo = tlejs.getSatelliteInfo(this.tle, t);
            return new WorldWind.Position(satInfo.lat, satInfo.lng, satInfo.height * 1000);
        }
        if (this.referenceBody === 'MOON') {
            var delta_t = (t - this.epoch.getTime()) / 1000; // seconds since epoch

            var a = this.sma * 1000;
            var e = this.eccentricity;
            var i = orb.common.deg2rad(this.inclination);
            var Ω = orb.common.deg2rad(this.rightAscensionOfAscendingNode);
            var ω = orb.common.deg2rad(this.argumentOfPerigee);
            var ma = this.meanAnomaly;
            var T0 = 0;

            var [inertial] = orb.position.keplerian(a, e, i, Ω, ω, delta_t, T0, ma, MOON_MASS);
            var fixed = orb.transformations.inertialToFixed(inertial, delta_t, MOON_ω);
            var position = new WorldWind.Position();
            this.globe.computePositionFromPoint(fixed[1], fixed[2], fixed[0], position);
            return position;
        }
        return undefined;
    }

    updatePosition = (t: number, observerBody: string, fetchData: boolean): boolean => {
        if ((this.referenceBody === 'EARTH') && this.tle) {
            var satInfo = tlejs.getSatelliteInfo(this.tle, t);
            this.position.latitude = satInfo.lat
            this.position.longitude = satInfo.lng
            this.position.altitude = satInfo.height * 1000;
            return true;
        }
        if (this.referenceBody === 'MOON') {
            var position = this.getPosition(t, observerBody, false);
            this.position.latitude = position.latitude;
            this.position.longitude = position.longitude;
            this.position.altitude = position.altitude;
        }
        return false;
    }

    getEpochString = () => {
        var utcms = Date.UTC(this.epoch.getUTCFullYear(), this.epoch.getUTCMonth(), this.epoch.getUTCDate(), this.epoch.getUTCHours(), this.epoch.getUTCMinutes(), this.epoch.getUTCSeconds(), this.epoch.getUTCMilliseconds());
        var julianDay = (utcms - Date.UTC(this.epoch.getUTCFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
        var year = this.epoch.getFullYear().toString();
        return year.substring(2) + julianDay.toFixed(8).padStart(12, ' ');
    }

    getChecksum = (s: string) => {
        var c, sum = 0;
        for (var i = 0; i < s.length; i++) {
            c = s.charAt(i);
            if ((c >= '0') && (c <= '9')) {
                sum += parseInt(c);
            } else {
                if (c === '-') {
                    sum++;
                }
            }
        }
        return (sum % 10);
    }

    toTLE = (): [string, string] => {
        var s, i, exp;
        var line1 = '1 ';
        line1 += this.id.toString().padStart(5, ' ');
        line1 += 'U '; // assume unclassified
        line1 += this.launchYear.toString().padStart(2, '0');
        line1 += this.launchNum.toString().padStart(3, '0');
        line1 += this.launchPiece.toString().padEnd(3, ' ');
        line1 += ' ';
        line1 += this.getEpochString();
        line1 += ' ';
        s = this.meanMotionFirstDerivative.toFixed(8).toString();
        s = s.substring(1); // remove leading zero
        if (this.meanMotionFirstDerivative < 0.0) {
            s = '-' + s;
        }
        line1 += s.padStart(10, ' ');
        line1 += ' ';
        s = this.meanMotionSecondDerivative.toExponential(4);
        s = s.split('.').join(''); // remove decimal
        s = s.split('e').join(''); // remove 'e'
        if (s.endsWith("+0")) {
            // if exponent is 0, use negative form
            s = s.substring(0, s.length - 2) + "-0";
        }
        i = s.length - 1;
        exp = parseInt(s.charAt(i));
        if (exp > 0) {
            // reduce exponent by 1 because we removed decimal and leading decimal point is implied.        
            exp--;
            s = s.substring(0, i) + exp.toString();
        }
        if (this.meanMotionSecondDerivative < 0.0) {
            s = '-' + s;
        }
        line1 += s.padStart(8, ' ');
        line1 += ' ';

        s = this.dragTerm.toExponential(4);
        s = s.split('.').join(''); // remove decimal
        s = s.split('e').join(''); // remove 'e'
        if (s.endsWith("+0")) {
            // if exponent is 0, use negative form
            s = s.substring(0, s.length - 2) + "-0";
        }
        i = s.length - 1;
        exp = parseInt(s.charAt(i));
        if (exp > 0) {
            // reduce exponent by 1 because we removed decimal and leading decimal point is implied.        
            exp--;
            s = s.substring(0, i) + exp.toString();
        }
        if (this.meanMotionSecondDerivative < 0.0) {
            s = '-' + s;
        }
        line1 += s.padStart(8, ' ');
        line1 += ' 0 ';

        line1 += this.elementSetNum.toString().padStart(4, ' ');
        line1 += this.getChecksum(line1);

        var line2 = '2 ';
        line2 += this.id.toString().padStart(5, ' ');
        line2 += ' ';
        line2 += this.inclination.toFixed(4).padStart(8, ' ');
        line2 += ' ';
        line2 += this.rightAscensionOfAscendingNode.toFixed(4).padStart(8, ' ');
        line2 += ' ';
        line2 += this.eccentricity.toFixed(7).substring(2);
        line2 += ' ';
        line2 += this.argumentOfPerigee.toFixed(4).padStart(8, ' ');
        line2 += ' ';
        line2 += this.meanAnomaly.toFixed(4).padStart(8, ' ');
        line2 += ' ';
        line2 += this.meanMotion.toFixed(8).padStart(11, ' ');
        line2 += this.revolutionNum.toString().padStart(5, ' ');
        line2 += this.getChecksum(line2);
        return [line1, line2];
    }
}

