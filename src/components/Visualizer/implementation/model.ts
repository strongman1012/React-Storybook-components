import { GroundStation } from './groundStation';
import { Satellite } from './satellite';
import { Spacecraft } from './spacecraft';
import { Link } from './link';
import WorldWind from '@nasaworldwind/worldwind';

export type VisualizerModel = {
    /**
     * Epoch representing the start of the simulation that the visualizer is rendering, expressed as milliseconds.
     * It is the value returned by Date function getTime(). e.g., (new Date(Date.parse('11 May 2025 00:00:00 GMT'))).getTime()
     */
    epoch?: number;
    /**
     * The total length of the simulation in seconds
     */
    duration?: number;
    /**
     * The parameter to enable LayerManager component and toggle LayerManager Button
     */
    showLayerManager?: boolean;
    /**
     * The parameter switching old version and new version of the visualizer component
     * If this is true, new version, if this is false, old version
     */
    showEnhancedTimeline?: boolean;
    /**
     * The reference body that the visualizer focuses on (if left blank, defaults to 'EARTH')
     */
    referenceBody?: string;
    /**
     * Whether when veiwing the Earth in the 'showOtherBodies' mode, should the camera remain fixed
     * to a point on the Earth, or should it remain fixed to a point in space. If true, the camera will
     * remain fixed at a point in space, if false, the camera will focus on a point on the Earth. In general,
     * this will be left as true, and if left unfilled will default to true
     */
    useEarthInertialFrame?: boolean;
    /**
     * Whether or not to show other bodies while focusing on one body in particular
     * ex. Should the moon be shown while looking at the Earth?
     * Default is set to false
     */
    showOtherBodies?: boolean;
    /**
     * Whether or not to hide the display of ground station cones on the moon.
     * Default is set to false (show lunar ground station cones)
     */
    hideLunarGroundStationCones?: boolean;
    /**
     * The API url of the given enviornment. This is needed to make sure that the API calls are being routed correctly,
     * and should be static
     */
    apiURL?: string;
    /**
     * The name of the simulation that is supposed to be 'played back' for the lunar loading component
     * This comes back with the analysis, and helps the Visualizer make the API call that it needs to get
     * the data from the simulation. If left blank, the Visualizer will not attempt to make the API call.
     */
    simulationName?: string;
    /**
     * A list of all of the user satelites (see object detailed below)
     */
    userSatellites?: (SatelliteInfo | SpacecraftInfo)[];
    /**
    * A list of all of the user ground stations (see object detailed below)
    */
    userGroundStations?: GroundStationInfo[];
    constellations?: Constellation[];
    /**
     * A list of all of the asset satellites selected (see object detailed below)
     */
    satellites?: (SatelliteInfo | SpacecraftInfo)[];
    geoSatellites?: GeoSatelliteInfo[];
    /**
     * A list of all of the asset ground stations (see object detailed below)
     */
    groundStations?: GroundStationInfo[];
};

export type Constellation = {
    id: number;
    referenceBody?: string;
    parentId: number;
    name: string;
    fov: number;
    activated: boolean;
    coverageColor?: string;
    shells: Shell[];
};

export type Shell = {
    nPlanes: number;
    nSatellitesPerPlane: number;
    inclination: number;
    altitude: number;
    eccentricity: number;
    phaseOffset: number;
    planeDistribution: number;
}

export type GroundStationInfo = {
    /**
     * the id of the given satellite (must be unique from other satellites in the array)
     */
    id: number;
    parentId?: number;
    /**
     * The name that will be displayed in the visualizer of the satellite
     */
    name: string;
    /**
     * The body that this satellite orbits, or should be taken in reference to (defaults to 'EARTH').
     * Valid values are 'EARTH', 'MOON'.
     */
    referenceBody?: string;
    /**
     * The latitude upon which the ground station will be displayed (Note that these are realtive to the body being displayed)
     */
    latitude: number;
    /**
     * The longitude upon which the ground station will be displayed (Note that these are realtive to the body being displayed)
     */
    longitude: number;
    /**
     * Required, but should always be set to 0
     */
    altitude: number;
    /**
     * (90-minElevationAngle) = fov
     */
    fov: number;
    /**
     * For Earth Ground Stations, set to 10, for Moon Ground Stations, set to 5
     */
    minElevationAngle: number;
    /**
     * Whether the user is activated or not (In terms of whether it is selected or just being 'hovered' in the network lib)
     */
    activated: boolean;
    /**
     * The color that the coverage cone should show up as (currently set to "#00ff0026" as default)
     * Must be a color string (eg. #FFFFFF, rgb(123, 45,8), etc)
     */
    coverageColor?: string;
    /**
     * The start of when a user satellite becomes a part of the simulation (useful for describing phases)
     */
    epochOffsetStart?: number;
    /**
     * The end of when a user satellite is a part of the simulation (useful for describing phases)
     */
    epochOffsetStop?: number;
    /**
     * Specifies the units that the above 2 properties are communicating the timeframe in (usually 'DAYS')
     */
    epochOffsetUnits?: string;
};

export type SatelliteInfo = {
    /**
     * the id of the given satellite (must be unique from other satellites in the array)
     */
    id: number;
    /**
     * The id of the parent constellation that the satellite is associated with
     */
    parentId?: number;
    /**
     * The parent constellation that the satellite is associated with
     */
    parent?: Constellation;
    /**
     * The name that will be displayed in the visualizer of the satellite
     */
    name: string;
    /**
     * The body that this satellite orbits, or should be taken in reference too (defaults to Earth)
     */
    referenceBody?: string;
    /**
     * Inclination of the spacecraft (degrees)
     */
    inclination: number;
    /**
     * Altitude of the spacecraft (km)
     */
    altitude?: number;
    /**
     * Altitude as measured from the center of the reference body (semi-major axis, in km)
     */
    sma?: number;
    /**
     * Eccentricity of the craft
     */
    eccentricity?: number;
    /**
     * RAAN of the craft (degrees)
     */
    raan?: number;
    /**
     * Field of View for the craft (degrees)
     */
    fov?: number;
    /**
     * Mean anomaly of the spacecraft orbit, expressed as degrees.
     */
    meanAnomaly?: number;
    /**
     * Argument of perigee of the spacecraft orbit, expressed as degrees.
     */
    argumentOfPerigee?: number;
    /**
     * Whether the user is activated or not (In terms of whether it is selected or just being 'hovered' in the network lib)
     */
    activated: boolean;
    /**
     * The color that the user satellite's coverage cone should be in the visualizer. Must be a color string (eg. #FFFFFF, rgb(123, 45,8), etc)
     */
    coverageColor?: string;
    /**
     * The color that the user satellite's orbit should be in the visualizer. Must be a color string (eg. #FFFFFF, rgb(123, 45,8), etc)
     */
    color?: string;
};

export type SpacecraftInfo = {
    /**
     * the id of the given satellite (must be unique from other satellites in the array)
     */
    id: number;
    /**
     * The id of the parent constellation that the satellite is associated with
     */
    parentId?: number;
    /**
     * The body that this satellite orbits, or should be taken in reference too (defaults to Earth)
     */
    referenceBody?: string;
    /**
     * The name that will be displayed in the visualizer of the satellite
     */
    name: string;
    /**
     * Spacecraft epoch (overrides use of model epoch)
     */
    epoch?: number;
    /**
     * The start of when a user satellite becomes a part of the simulation (useful for describing phases)
     */
    epochOffsetStart?: number;
    /**
     * The end of when a user satellite is a part of the simulation (useful for describing phases)
     */
    epochOffsetStop?: number;
    /**
     * Specifies the units that the above 2 properties are communicating the timeframe in (usually 'DAYS')
     */
    epochOffsetUnits?: string;
    /**
     * Whether or not the visualizer should retrieve the user's position data by calling the server API.
     * Default is false.
     */
    usePositionAPI: boolean;
    /**
     * Whether the user is activated or not (In terms of whether it is selected or just being 'hovered' in the network lib)
     */
    activated: boolean;
    /**
     * The color that the user satellite's orbit should be in the visualizer. Must be a color string (eg. #FFFFFF, rgb(123, 45,8), etc)
     */
    color?: string;
    period?: number;
}

export type GeoSatelliteInfo = {
    id: number;
    parentId?: number;
    name: string;
    inclination: number;
    altitude: number;
    eccentricity?: number;
    longitude: number;
    fov?: number;
    meanAnomaly?: number;
    argumentOfPerigee?: number;
    activated: boolean;
    coverageColor?: string;
}

export type SpacecraftSelectionData = {
    info: SpacecraftInfo,
    object: Spacecraft
}
export type SatelliteSelectionData = {
    info: SatelliteInfo,
    object: Satellite
}
export type GroundStationSelectionData = {
    info: GroundStationInfo,
    object: GroundStation
}
export type ContactLinkSelectionData = {
    path: WorldWind.Path;
    links: Link[];
}
export type LayerRow = {
    displayName: string;
    status: boolean;
    i_n?: number;
}
export type LayerManagerData = Array<{
    parent: LayerRow;
    children: LayerRow[];
}>;

export type Window = [number, number];