import WorldWind from '@nasaworldwind/worldwind';
import { Spacecraft } from './spacecraft';
import { GroundStation } from './groundStation';

export class Link {
    name: string;
    frequencyBand: string;
    source: string;
    destination: string;
    sourceObject: (Spacecraft | GroundStation | undefined);
    destinationObject: (Spacecraft | GroundStation | undefined);
    direction: string;
    freq_MHz: number;
    dataRate_kbps: number;
    eirp: number;
    gOverT: number;
    ebNo: number;
    margin: number;
    activeInterval: number[] = [];
    path: WorldWind.Path;
    renderable: WorldWind.Renderable = null;

    constructor(name: string) {
        this.name = name;
        this.frequencyBand = '';
        this.source = '';
        this.destination = '';
        this.direction = '';
        this.freq_MHz = NaN;
        this.dataRate_kbps = NaN;
        this.eirp = NaN;
        this.gOverT = NaN;
        this.ebNo = NaN;
        this.margin = NaN;
    }

}