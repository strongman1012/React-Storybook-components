import WorldWind from '@nasaworldwind/worldwind';

const deltaSeconds = 5 * 3600 * 24; // fetch 1 day prior and 1 day ahead of any requested position that we don't have yet.

export type Position = {
    t: number;
    x: number;
    y: number;
    z: number;
};

export class Spacecraft {
    id: number;
    parentId?: number;
    name: string;
    referenceBody: string = 'EARTH';
    apiURL: string = '';
    simulation?: string = undefined;
    epoch: Date = new Date();
    analysisInterval: number[] = [];
    position: WorldWind.Position;
    placemarkPosition: WorldWind.Position;
    orbitPositions: WorldWind.Position[] = [];
    orbitPaths: WorldWind.Path[] = [];
    orbitPath: WorldWind.Path[] = [];
    renderable: WorldWind.Renderable = null;
    dataStart: number;
    dataStop: number;
    fetchingData: boolean = false;
    fetchingDataRange: number[] = [];
    positionData: number[][] = [];
    color?: string;
    globe: WorldWind.Globe;
    period?: number;
    type: string | undefined = undefined;

    constructor(id?: number) {
        if (!id) {
            id = Math.round(Math.random() * 99999);
        }
        this.id = id;
        this.name = id.toString();
        this.dataStart = 0;
        this.dataStop = 0;
    }

    init = (observerBody: string) => {
        this.position = new WorldWind.Position();
        this.placemarkPosition = new WorldWind.Position();
        if (!this.apiURL.endsWith('/')) {
            this.apiURL = this.apiURL + '/'
        }
        this.fetchPositionData(observerBody);
    }

    fetchPositionData(observerBody: string, start: number | undefined = undefined, stop: number | undefined = undefined) {
        if (!this.simulation) {
            return;
        }
        if (!start) {
            start = this.analysisInterval[0];
        }
        if (!stop) {
            stop = this.analysisInterval[1];
        }
        var url = `${this.apiURL}get-position-data?`;
        url += `simulationName=${this.simulation}`;
        url += `&objectName=${this.name}`;
        url += `&body=${observerBody}`;
        url += `&start=${start}`;
        url += `&stop=${stop}`;
        this.fetchingData = true;
        this.fetchingDataRange = [start, stop];
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then(data => {
                this.fetchingData = false;
                this.fetchingDataRange = [];
                if (data && data.length > 0) {
                    this.positionData = data;
                    this.dataStart = data[0][0];
                    if (this.dataStart !== start) {
                        //console.log(`${this.dataStart} != ${start}`)
                    }
                    this.dataStop = data[data.length - 1][0];
                    if (this.dataStop !== stop) {
                        //console.log(`${this.dataStop} != ${stop}`)
                    }
                } else {
                    console.log("no data!");
                }
            });
    }

    binarySearch(interval: number[], tIndex: number): number[] {
        var low = interval[0];
        var high = interval[1];
        var mid = low + (Math.floor((high - low) / 2));
        if ((tIndex >= this.positionData[mid][0]) && (tIndex <= this.positionData[mid + 1][0])) {
            // tIndex is between positionData[mid] and positionData[mid+1]. Interpolate.
            var p0 = this.positionData[mid];
            var p1 = this.positionData[mid + 1];
            var dt = p1[0] - p0[0];
            var dx = p1[1] - p0[1];
            var dy = p1[2] - p0[2];
            var dz = p1[3] - p0[3];
            var x = p0[1] + (dx / dt) * (tIndex - p0[0]);
            var y = p0[2] + (dy / dt) * (tIndex - p0[0]);
            var z = p0[3] + (dz / dt) * (tIndex - p0[0]);
            return [tIndex, x, y, z];
        } else {
            if (tIndex < this.positionData[mid][0]) {
                return this.binarySearch([low, mid], tIndex);
            } else {
                return this.binarySearch([mid, high], tIndex);
            }
        }
    }

    findPosition(tIndex: number): number[] {
        return this.binarySearch([0, this.positionData.length], tIndex);
    }

    updatePosition(t: number, observerBody: string, fetchData: boolean): boolean {
        var position = this.getPosition(t, observerBody, fetchData);
        if (position) {
            this.position.latitude = position.latitude;
            this.position.longitude = position.longitude;
            this.position.altitude = position.altitude;
            this.placemarkPosition.latitude = position.latitude;
            this.placemarkPosition.longitude = position.longitude;
            this.placemarkPosition.altitude = position.altitude;
            return true;
        } else {
            this.position.latitude = undefined;
            this.position.longitude = undefined;
            this.position.altitude = undefined;
            this.placemarkPosition.latitude = undefined;
            this.placemarkPosition.longitude = undefined;
            this.placemarkPosition.altitude = undefined;
            return false;
        }
    }

    getPosition(t: number, observerBody: string, fetchData: boolean): (WorldWind.Position | undefined) {
        if (this.analysisInterval) {
            if ((t < this.analysisInterval[0]) || (t >= this.analysisInterval[1])) {
                return undefined;
            }
        }
        var tSeconds = Math.round(t / 1000);
        var tIndex = tSeconds - (this.epoch.getTime() / 1000);
        if ((this.positionData.length > 0) && (tIndex >= this.dataStart) && (tIndex <= this.dataStop)) {
            var bodyFixedPosition: number[] = this.findPosition(tIndex);
            var position = new WorldWind.Position();
            this.globe.computePositionFromPoint(bodyFixedPosition[2] * 1000, bodyFixedPosition[3] * 1000, bodyFixedPosition[1] * 1000, position);
            return position;
        } else {
            if (fetchData) {
                if ((t >= this.fetchingDataRange[0]) && (t < this.fetchingDataRange[1])) {
                    // already fetching the range needed
                    return false;
                }
                var start = Math.max(0, t - (deltaSeconds * 1000));
                var stop = Math.max(0, t + (deltaSeconds * 1000));
                this.fetchPositionData(observerBody, start, stop);
            }
            return undefined;
        }
    }
}