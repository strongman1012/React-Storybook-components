import WorldWind from '@nasaworldwind/worldwind';

export class GroundStation {
    id: number;
    name: string;
    referenceBody: string = 'EARTH';
    position: WorldWind.Position;
    _position: WorldWind.Position;
    latitude: number = 0;
    longitude: number = 0;
    altitude: number = 0;
    minElevationAngle: number = 0;
    analysisInterval: number[] = [];
    coneMesh: WorldWind.TriangleMesh = null;
    renderable: WorldWind.Renderable = null;

    constructor(id?: number) {
        if (!id) {
            id = Math.round(Math.random() * 99999);
        }
        this.id = id;
        this.name = id.toString();
    }

    init = (observerBody: string) => {
        this.position = new WorldWind.Position();
        this._position = new WorldWind.Position();
        this._position.latitude = this.latitude;
        this._position.longitude = this.longitude;
        this._position.altitude = this.altitude;
    }

    updatePosition(t: number, observerBody: string): boolean {
        var position = this.getPosition(t, observerBody);
        if (position) {
            this.position.latitude = position.latitude;
            this.position.longitude = position.longitude;
            this.position.altitude = position.altitude;
            return true;
        } else {
            this.position.latitude = undefined;
            this.position.longitude = undefined;
            this.position.altitude = undefined;
            return false;
        }
    }


    getPosition = (t: number, observerBody: string) : (WorldWind.Position | undefined) => {
        if (this.referenceBody !== observerBody) {
            return undefined;
        }
        if (this.analysisInterval) {
            if ((t < this.analysisInterval[0]) || (t >= this.analysisInterval[1])) {
                return undefined;
            }
        }
        return this._position;
    }

}