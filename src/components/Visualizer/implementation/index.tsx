/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState, useMemo, useCallback } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import { Typography } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import IntervalTree from '@flatten-js/interval-tree';
import * as tlejs from 'tle.js';
import WorldWind from '@nasaworldwind/worldwind';
import './worldwind/WorldWind'; // overrides for WorldWind behavior
import ViewControlsLayer from './worldwind/ViewControlsLayer';
import MoonLROLayer from './worldwind/MoonLROLayer';
import MoonLROOneImageLayer from './worldwind/MoonLROOneImageLayer';
import MarsMDIM21Layer from './worldwind/MarsMDIM21Layer';
import MarsMDIM21OneImageLayer from './worldwind/MarsMDIM21OneImageLayer';

import TimelineSlider from './TimelineSlider';
import RangeSlider from './RangeSlider';
import { Window, VisualizerModel, GroundStationInfo, SatelliteInfo, SpacecraftInfo, GeoSatelliteInfo, Constellation, SpacecraftSelectionData, SatelliteSelectionData, GroundStationSelectionData, ContactLinkSelectionData } from './model';
import { Spacecraft } from './spacecraft';
import { Body } from './body';
import { Satellite } from './satellite';
import { GroundStation } from './groundStation';
import { Link } from './link';
import { Configuration, initialConfiguration } from './config';
import TimelineControls from './TimelineControls';
import GroundStationInfoDisplay from './GroundStationInfoDisplay';
import SatelliteInfoDisplay from './SatelliteInfoDisplay';
import SpacecraftInfoDisplay from './SpacecraftInfoDisplay';
import ContactLinkInfoDisplay from './ContactLinkInfoDisplay';
import AddNewGroundStationMenu from './AddNewGroundStationMenu';
import GroundStationContextMenu from './GroundStationContextMenu';
import SatelliteContextMenu from './SatelliteContextMenu';
import RefreshMenu from './RefreshMenu';
import ReferenceBodyMenu from './ReferenceBodyMenu';
import "../../../../public/images/worldwind_logo.png";
import LayerManager from './LayerManager';
import { LayerManagerData, LayerRow } from './model';
import RfSlider from './RfSlider';
import { Stack, Button, Divider, Collapse } from '@mui/material';
import { Close, FilterAlt } from '@mui/icons-material';
import { Rnd } from 'react-rnd';
import ToggleLayerButton from './ToggleLayerButton';

function defined(x: any) {
  return typeof x !== 'undefined';
}

interface VisualizerProps {
  model: VisualizerModel;
  height: string | number;
  width?: number;
  hideOrbitPaths?: boolean;
  handleActivateGroundStation: (node: GroundStationInfo) => void;
  handleDeactivateGroundStation: (node: GroundStationInfo) => void;
  handleRemoveGroundStation: (node: GroundStationInfo) => void;
  handleActivateSatellite: (node: SatelliteInfo) => void;
  handleDeactivateSatellite: (node: SatelliteInfo) => void;
  handleRemoveSatellite: (node: SatelliteInfo) => void;
  handleViewGroundStationPlatformDetails: (node: GroundStationInfo) => void;
  handleViewSatellitePlatformDetails: (node: SatelliteInfo | Constellation) => void;
  handleAddNewGroundStation: (latitude: number, longitude: number, altitude: number) => void;
  handleViewCoverageStatistics: () => void;
  handleRefresh: () => void;
}


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: '#000000',
    color: '#FFFFFF',
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
    fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace',
  },
  worldwindCanvas: {
    width: '100%',
    height: '100%',
  },
  threeCanvas: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  worldwindLogo: {
    position: 'absolute',
    width: '8vw',
    top: '10px',
    left: '10px',
    webkitUserSelect: 'none', /* Safari */
    msUserSelect: 'none', /* IE 10 and IE 11 */
    userSelect: 'none', /* Standard syntax */
  },
  bodyButton: {
    position: 'absolute',
    top: '0px',
    right: '185px',
    padding: '5px',
    paddingTop: '0px !important',
    webkitUserSelect: 'none', /* Safari */
    msUserSelect: 'none', /* IE 10 and IE 11 */
    userSelect: 'none', /* Standard syntax */
    cursor: 'default',
    opacity: 0.5,
    '&:hover': {
      opacity: '1 !important'
    }
  },
  bodyButtonImage: {
    width: '70px',
    height: '35px',
  },
  timelineContainer: {
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    height: '100px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    color: '#eee',
    fontSize: '0.8em',
    fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace',
    webkitUserSelect: 'none', /* Safari */
    msUserSelect: 'none', /* IE 10 and IE 11 */
    userSelect: 'none', /* Standard syntax */
  },
  layerContainer: {
    minWidth: '18%',
    height: 'auto',
    left: '0px',
    position: 'absolute',
    border: '1px solid #444',
    borderRadius: '5px',
    bottom: '100px'
  },
  layerTitle: {
    width: '100%',
    background: 'rgba(42, 42, 42, 0.75)',
    color: '#eee',
    '& .MuiDivider-root': {
      background: '#444 !important',
    },
    '& .MuiStack-root': {
      paddingLeft: '0.5rem',
      paddingBottom: '0.2rem'
    },
    '& .MuiButtonBase-root': {
      background: 'rgba(0, 0, 0, 0.35)',
      padding: '0.2rem 0.4rem',
      borderRadius: '5px',
      textTransform: 'inherit'
    }
  },
  layerManager: {
    width: '100%',
    height: '300px',
    background: 'rgba(17, 18, 20, 0.95)',
    color: '#eee !important',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  RFSliderContainer: {
    background: 'rgba(42, 42, 42, 0.75)',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  RFSlider: {
    width: '87%',
    color: '#eee',
    display: 'flex',
    justifyContent: 'center',
    background: 'rgba(17, 18, 20, 0.95)',
    padding: '1rem',
    margin: '0.5rem !important'
  },
  timelineControls: {
    width: '18%',
    height: '100%',
    background: 'rgba(42, 42, 42, 0.75)',
    borderRadius: '5px',
    border: '1px solid #444',
    webkitUserSelect: 'none', /* Safari */
    msUserSelect: 'none', /* IE 10 and IE 11 */
    userSelect: 'none', /* Standard syntax */
    '& button': {
      background: 'rgba(42, 42, 42, 0.75)',
      border: '1px solid #444',
      color: '#eee',
    },
    '& .activated': {
      color: '#12b3f0'
    },
    '& #realtime': {
      float: 'left'
    },
    '& #timelineClock': {
      width: '100%',
      textAlign: 'center',
      fontSize: '1rem'
    },
    '& #playbackControls': {
      width: '100%',
      marginTop: '5px',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'center',
      '& button': {
        margin: '2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '8px',
        paddingRight: '8px',
      }

    },
    '& #pause': {
      fontSize: '.5rem'
    },
    '& #reverse': {
      fontSize: '1rem'
    },
    '& #forward': {
      fontSize: '1rem'
    },
    '& #speedControls': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      '& button': {
        margin: '2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '3px',
        paddingRight: '3px',
      }
    }
  },
  timelineSlider: {
    width: '82%',
    height: '50%',
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    background: '#2a2a2abf',
    fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace'
  },
  timelineSliderWithRangeNew: {
    width: '82%',
    height: '50%',
    position: 'absolute',
    bottom: '35px',
    right: '0px',
    background: '#2a2a2abf',
    fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace',
    zIndex: 5,
  },
  timelineSliderWithRangeOld: {
    width: '82%',
    height: '50%',
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    background: '#2a2a2abf',
    fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace'
  },
  rangeSliderNew: {
    width: '82%',
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    height: '35px',
    background: '#2a2a2abf',
    fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace',
    zIndex: 4
  },
  rangeSliderOld: {
    width: '82%',
    position: 'absolute',
    bottom: '50px',
    right: '0px',
    background: '#2a2a2abf',
    fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace'
  },
  warningMessage: {
    width: '100%',
    height: '25%',
    position: 'absolute',
    right: '20px',
    top: '-25px',
  }
}));


let wwd: WorldWind.WorldWindow;
let starfield: WorldWind.StarfieldLayer;
let atmosphere: WorldWind.Layer;
let esriMapLayer: WorldWind.WmsLayer;
let esriLabelLayer: WorldWind.WmsLayer;
const imageryServiceAddress = "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/1.0.0/WMTSCapabilities.xml";
const labelsServiceAddress = "https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/WMTS/1.0.0/WMTSCapabilities.xml";
const imageryLayerIdentifier = "World_Imagery";
const labelsLayerIdentifier = "Reference_World_Boundaries_and_Places";
let globe2D: WorldWind.Globe2D;
let globe3D: WorldWind.Globe;
let newLookAtLongitude: number;
let lastLookAtLongitude: number;
const updateLookAtLocation: boolean = false;
let referenceBody: string;
let otherBody: Body | undefined = undefined;
let currentGlobe: WorldWind.Globe | WorldWind.Globe2D;
let defaultNavigatorRange: number;
let defaultNavigatorLookAtLocation: WorldWind.Location;
const SURFACE_ALTITUDE = 1000;
export const EARTH_MEAN_RADIUS = 6378000; // meters
export const MOON_RADIUS = 1737400; // meters
export const MARS_MEAN_RADIUS = 3389500; // meters
export const bodyRadius = new Map<string, number>([
  ['EARTH', EARTH_MEAN_RADIUS],
  ['MOON', MOON_RADIUS],
  ['MARS', MARS_MEAN_RADIUS]
]);
export const bodyGM = new Map<string, number>([
  ['EARTH', 3.986004418e14],
  ['MOON', 4.9048695e12],
  ['MARS', 4.282837e13]
]);
export const GEOSTATIONARY_ALTITUDE_KM = 35786;
export const SECONDS_PER_DAY = 24 * 60 * 60; // 86400
export const DEGREES_PER_SECOND = 360 / 24 / 60 / 60;
export const DAYS_PER_MOON_ROTATION = 27.321661;
export const SECONDS_PER_MOON_SIDEREAL_DAY = DAYS_PER_MOON_ROTATION * SECONDS_PER_DAY;
export const MOON_ω = (2 * Math.PI) / SECONDS_PER_MOON_SIDEREAL_DAY; // moon's rate of angular rotation rad/s
export const MOON_MASS = 7.34767309e22; // kg

const HOVER_TRIGGER_TIME = 1000; // time required to trigger hover
const MODE_3D = 0;
const MODE_2D = 1;
const DEFAULT_VIEW_MODE = MODE_3D;
let viewMode = DEFAULT_VIEW_MODE;
let modelEpoch: Date;
let modelReferenceBody: string;

enum SelectionMode {
  NONE = 0,
  LEFT,
  RIGHT,
  DOUBLE_LEFT,
  DOUBLE_RIGHT,
  HOVER
}

export const handleSnapshot = () => {
  wwd.redraw();
  wwd.redrawIfNeeded();
  //let w = window.open("", "snapshot", "width=" + wwd.canvas.width + ", height=" + wwd.canvas.height + ", scrollbars=yes");
  const image = new Image();
  image.src = wwd.canvas.toDataURL('image/jpeg');
  return (image.src)
}

let startTime = Date.now()
let simulationDuration: number = 24 * 3600 * 1000 * 30; //30 days in milliseconds
let stopTime = startTime + simulationDuration;
let simulationTime: number;
let fetchDataIfNeeded = true;
const canvasId = "visualizerFrame";//'canvas_' + Date.now();
const threeCanvasId = "radiationPatternFrame";

let earthSingleImageLayer: WorldWind.Layer;
let earthLayer: WorldWind.Layer;
let moonSingleImageLayer: WorldWind.Layer;
let moonLayer: WorldWind.Layer;
let marsSingleImageLayer: WorldWind.Layer;
let marsLayer: WorldWind.Layer;
let bodySingleImageLayer: WorldWind.Layer;
let bodyLayer: WorldWind.Layer;

let baseLayer: WorldWind.Layer;
let orbitsLayer: WorldWind.Layer;
let providerLayer: WorldWind.Layer;
let userLayer: WorldWind.Layer;
let groundUserLayer: WorldWind.Layer;
let userOrbitsLayer: WorldWind.Layer;
let userTrajectoriesLayer: WorldWind.Layer;
let providerTrajectoriesLayer: WorldWind.Layer;
let conesLayer: WorldWind.Layer;
let groundStationsLayer: WorldWind.Layer;
let groundStationConesLayer: WorldWind.Layer;
let linkContactsLayer: WorldWind.Layer;
let viewControlsLayer: ViewControlsLayer;
let providerSpacecraft: (Satellite | Spacecraft)[] = [];
let userSpacecraft: (Satellite | Spacecraft)[] = [];
let groundStations: GroundStation[] = [];
let contactIntervals: IntervalTree;
let interferenceContactIntervals: IntervalTree;
const frameRate = 12;
let useInertialFrame = false;
let mouseDown = false;
let timelineMouseDown = false;
let highlightedItems: any = [];
let selectedGroundStation: GroundStationSelectionData | undefined;
let selectedSatellite: SatelliteSelectionData | undefined;
let selectedSpacecraft: SpacecraftSelectionData | undefined;
let selectedContactLink: ContactLinkSelectionData | undefined;
let selectedLocation: WorldWind.Position;

const baseTime = 0;
const simulationTickAmount = 1000 / frameRate;
let timeScale = 1.0;
let timeDirection = 1;

let animateInterval: ReturnType<typeof setInterval>;
let updateClockInterval: ReturnType<typeof setInterval>;
let updateSliderInterval: ReturnType<typeof setInterval>;
let debugOutputInterval: ReturnType<typeof setInterval>;
let wheelTimeout: ReturnType<typeof setTimeout>;
const wheelDoneTimeout: number = 1000;
let hoverTimeout: ReturnType<typeof setTimeout>;
let hoverObject: GroundStationSelectionData |
  SatelliteSelectionData |
  SpacecraftSelectionData |
  undefined;
let hoverObjectType: string;
let hoverX: number;
let hoverY: number;
let viewModeUpdated = false;
let forceUpdate = false;

let lastSatellitePositionUpdate = 0;
const updateSatellitePositionDelta = 1000; // update satellite positions every 1000ms

let lastConePositionUpdate = 0;
const updateConePositionDelta = 1000; // update cone positions every 1000ms

let lastGroundStationConeUpdate = 0;
const updateGroundStationConeDelta = 10000; // update cone positions every 10s
const maxGroundStationConeHeight = 5000000; // max ground station cone height is 5000 km

let lastOrbitUpdate = 0;
const updateOrbitDelta = 10000; // update orbit positions every 10 seconds

let lastBodyUpdate = 0;
const DEFAULT_UPDATE_BODY_DELTA = 1000; // update other body position every second
const FAST_UPDATE_BODY_DELTA = 50; // update other body position faster if the user is zooming
let updateBodyDelta = DEFAULT_UPDATE_BODY_DELTA;

let lastLinkContactsUpdate = 0;
const updateLinkContactsDelta = 1000; // update links every 1000ms
let rfData: LayerRow[] = [];

const parentData = [
  {
    displayName: "User Satellites",
    status: true
  },
  {
    displayName: "Satellites",
    status: true
  },
  {
    displayName: "Constellations",
    status: true
  },
  {
    displayName: "Ground Stations",
    status: true
  },
  {
    displayName: "User Ground Stations",
    status: true
  },
  {
    displayName: "GeoSatellites",
    status: true
  },
  {
    displayName: "RF Links",
    status: true
  },
  {
    displayName: "ESRI Map",
    status: true
  }
]

interface LayerManagerState {
  [key: string]: boolean;
}

const Visualizer: FC<VisualizerProps> = ({
  model,
  height,
  width,
  hideOrbitPaths,
  handleActivateGroundStation,
  handleDeactivateGroundStation,
  handleRemoveGroundStation,
  handleActivateSatellite,
  handleDeactivateSatellite,
  handleRemoveSatellite,
  handleViewGroundStationPlatformDetails,
  handleViewSatellitePlatformDetails,
  handleAddNewGroundStation,
  handleViewCoverageStatistics,
  handleRefresh,
}) => {
  const initialLayerManagerData: LayerManagerData = parentData.map((item) => ({
    parent: item,
    children: []
  }));
  const classes = useStyles();
  const [configuration, setConfiguration] = useState<Configuration>(initialConfiguration);
  const [timelineTime, setTimelineTime] = useState(startTime);
  const [timelineRange, setTimelineRange] = useState([startTime, stopTime]);
  const [rangeBounds, setRangeBounds] = useState({ start: new Date(startTime), stop: new Date(stopTime) });
  const [timelineDragged, setTimelineDragged] = useState(0);
  const [groundStationSelection, setGroundStationSelection] = useState<{ groundStationInfo: GroundStationInfo, groundStation: GroundStation, x: number, y: number } | undefined>(undefined);
  const [satelliteSelection, setSatelliteSelection] = useState<{ satelliteInfo: SatelliteInfo, satellite: Satellite, constellation?: Constellation, x: number, y: number } | undefined>(undefined);
  const [spacecraftSelection, setSpacecraftSelection] = useState<{ spacecraftInfo: SpacecraftInfo, spacecraft: Spacecraft, x: number, y: number } | undefined>(undefined);
  const [contactLinkSelection, setContactLinkSelection] = useState<{ simulationTime: number, links: Link[], x: number, y: number } | undefined>(undefined);
  const [locationSelection, setLocationSelection] = useState<{ latitude: number, longitude: number, altitude: number, x: number, y: number } | undefined>(undefined);
  const [clickLocation, setClickLocation] = useState<{ x: number, y: number } | undefined>(undefined);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(SelectionMode.NONE);
  const [modelIsDecayed, setModelIsDecayed] = useState<boolean>(false);
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [doAnimate, setDoAnimate] = useState<boolean>(false);
  const [timeAnimate, setTimeAnimate] = useState<boolean>(false);
  const [resetSliderFlag, setResetSliderFlag] = useState<boolean>(false);
  const [showRefBodyMenu, setShowRefBodyMenu] = useState<boolean>(false);
  const [layerManagerData, setLayerManagerData] = useState<LayerManagerData>(initialLayerManagerData);
  const [open, setOpen] = useState<LayerManagerState>({});
  const [interferenceTimeline, setInterferenceTimeline] = useState<Window[]>([]);
  const [contactTimeline, setContactTimeline] = useState<Window[]>([]);
  const [rfSlider, setRfSlider] = useState<number[]>([]);
  const [minIn, setMinIn] = useState<number>();
  const [maxIn, setMaxIn] = useState<number>();
  const [interferenceContactList, setInterferenceContactList] = useState<any[]>([]);
  const [contactList, setContactList] = useState<any[]>([]);
  const [contactLines, setContactLines] = useState<any[]>([]);
  const [interferenceContactLines, setInterferenceContactLines] = useState<any[]>([]);
  const [rfUpdateStatus, setRfUpdateStatus] = useState<boolean>(false);
  const [tabButton, setTabButton] = useState<string>("platforms");
  const [toggleLayerManager, setToggleLayerManager] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 100, y: 50 });
  const [initialState, setInitialState] = useState<boolean>(false);
  const [initState, setInitState] = useState<boolean>(false);
  // const [showZoomSlider, setShowZoomSlider] = useState<boolean>(false);
  const showLayerManager = model?.showLayerManager;
  const showEnhancedTimeline = model?.showEnhancedTimeline;
  const fullRefresh = () => {
    handleRefresh();
    setResetSliderFlag(true);
    setSimulationTime(startTime);
  }

  const setSimulationTime = (t: number) => {
    if (t < startTime) {
      t = startTime;
    }
    if (t > stopTime) {
      t = stopTime;
    }
    if ((viewMode === MODE_3D) && useInertialFrame && ((!mouseDown && !timelineMouseDown) || timelineMouseDown)) {
      const diffSeconds = (t - simulationTime) / 1000;
      const degreesDiff: number = diffSeconds * DEGREES_PER_SECOND;
      lastLookAtLongitude = lastLookAtLongitude - degreesDiff;
    }
    simulationTime = t;
  };

  function calculateOrbitPeriod(sma: number, referenceBody: string) {
    return Math.sqrt((4 * Math.PI * Math.PI * Math.pow(sma * 1000, 3)) / (bodyGM.get(referenceBody)!));
  }

  function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }





  function dateToLocalTimeString(t: number, includeSeconds = true) {
    const m = moment(new Date(t));
    let s;
    if (includeSeconds) {
      s = m.format("HH:mm:ss");
    } else {
      s = m.format("HH:mm");
    }
    return s;
  }


  // Compute a cone mesh where position is the point of the cone, baseRadius is the base radius in radians, and the
  // base is at the specified altitude in meters.
  function calculateConeMesh(position: WorldWind.Position, baseRadius: number, baseAltitude: number, calculateIndices: boolean) {
    const numRadialPositions = 36;
    const meshPositions = [];
    const meshIndices = [];
    const outlineIndices = []

    meshPositions.push(position); // the mesh center
    const surfaceCenter = new WorldWind.Location(position.latitude, position.longitude);
    for (let angle = 0; angle < 360; angle += 360 / numRadialPositions) {
      const location = WorldWind.Location.greatCircleLocation(surfaceCenter, angle, baseRadius, new WorldWind.Location(0, 0));
      meshPositions.push(new WorldWind.Position(location.latitude, location.longitude, baseAltitude));
    }

    if (calculateIndices) {
      // Create the mesh indices.
      for (let i = 1; i < numRadialPositions; i++) {
        meshIndices.push(0);
        meshIndices.push(i);
        meshIndices.push(i + 1);
      }
      // Close the circle.
      meshIndices.push(0);
      meshIndices.push(numRadialPositions);
      meshIndices.push(1);


      // Create the circle outline indices.
      for (let j = 1; j <= numRadialPositions; j++) {
        outlineIndices.push(j);
      }
      // Close the circle.
      outlineIndices.push(1);

      const drawSpokes = false;
      if (drawSpokes) {
        for (let j = 1; j <= numRadialPositions; j++) {
          outlineIndices.push(0);
          outlineIndices.push(j);
        }
      }
    }
    return {
      positions: meshPositions,
      indices: meshIndices,
      outlineIndices: outlineIndices
    }
  }


  // Calculate cone projecting from above onto a sphere with radius 'RE'
  // from altitude 'A' and cone half angle 'c'.
  // When projecting onto the Earth, RE is radius of Earth, or can
  // also be a sphere formed by the orbit of a satellite below another satellite.
  // RE and A expressed in meters, c expressed in degrees.
  // Return the computed footprint radius in radians which is the arc length over the surface of the sphere
  // from the cone center and the edge of the projected cone base, and the radius of the sphere onto which it
  // is projected. In the case that the cone projection is larger than the sphere it is projected upon, we will
  // return a radius larger than RE.
  function calculateDownwardConeProjectionRadius(R: number, A: number, c: number) {
    if (A < 0) return null;
    c = toRadians(c);
    const RS = R + A; // radius of sphere of satellite from which cone is projecting
    if (isNaN(c)) return null;
    const b = Math.PI - Math.asin((RS * Math.sin(c)) / R);
    if (!isNaN(b)) {
      // angle a is angle from center of earth to the circle of intersection on the sphere
      const a = Math.PI - c - b;
      return {
        arc: a,
        sphereRadius: R
      }
    } else {
      // cone projection is larger than the sphere, so clamp to arc = PI/2
      return {
        arc: Math.PI / 2,
        sphereRadius: Math.tan(c) * (R + A)
      }

    }
  }

  // Calculate cone projecting from below onto a sphere formed by the orbit of a satellite
  // at altitude 'A' above the body, with elevation angle 'e' above the horizon.
  // Return the computed footprint radius in radians which is the arc length over the surface of the sphere
  // from the cone center and the edge of the projected cone base.
  function calculateUpwardConeProjectionRadius(A: number, e: number) {
    e = toRadians(e);
    const R = bodyRadius.get(referenceBody)!;
    const RS = R + A;
    if (isNaN(e)) return null;
    const b = Math.asin((R / RS) * Math.sin((Math.PI / 2) + e));
    if (isNaN(b)) return null;
    // angle a is angle from center of body to the circle of intersection on the sphere
    const a = (Math.PI / 2) - (b + e);
    if (isNaN(a)) return null;
    return a;
  }

  function getColor(colorString: string) {
    const r = parseInt(colorString.substring(1, 3), 16);
    const g = parseInt(colorString.substring(3, 5), 16);
    const b = parseInt(colorString.substring(5, 7), 16);
    let a = 255;
    if (colorString.length === 9) {
      a = parseInt(colorString.substring(7, 9), 16);
    }

    return WorldWind.Color.colorFromBytes(r, g, b, a);
  }

  function createOrbit(s: Satellite, layer: WorldWind.Layer) {
    if ((s.referenceBody === 'EARTH') && (!s.tle)) {
      // geosynchronous satellite
      return;
    }
    if (s.referenceBody !== referenceBody) {
      return;
    }
    const period = s.period || 0;
    const start = simulationTime - ((period * 1000) / 4); // extrapolate backward 1/4 orbit
    const stop = simulationTime + ((period * 1000) / 4);  // extrapolate forward 1/4 orbit
    const stepMS = 60000; // plot point every 60 seconds

    // compute backward and forward orbit positions
    let p;
    const orbitPositions = [];
    for (let t = start; t <= stop; t += stepMS) {
      p = s.getPosition(t, referenceBody, false);
      if (p) {
        orbitPositions.push(p);
      }
    }

    // Remove previous orbit paths for this satellite.
    for (let i = 0; i < s.orbitPaths.length; i++) {
      layer.removeRenderable(s.orbitPaths[i]);
    }
    s.orbitPaths = [];

    // Create orbit paths from positions.
    // Multiple paths needed if 2D projection of path crosses international date line.
    const orbitPathAttributes = new WorldWind.ShapeAttributes(null);
    if (layer === userOrbitsLayer) {
      orbitPathAttributes.outlineColor = getColor(configuration.viewOptions.usatColor);
    } else {
      orbitPathAttributes.outlineColor = getColor(configuration.viewOptions.relayColor);
    }
    orbitPathAttributes.interiorColor = orbitPathAttributes.outlineColor;
    if (layer === userOrbitsLayer) {
      orbitPathAttributes.outlineColor.alpha = 0.75;
    } else {
      if (referenceBody === 'MOON') {
        orbitPathAttributes.outlineColor.alpha = 0.50;
      } else {
        orbitPathAttributes.outlineColor.alpha = 0.25;
      }
    }

    let pathPositions, orbitPath;
    if (viewMode === MODE_3D && !hideOrbitPaths) {
      pathPositions = orbitPositions;
      orbitPath = new WorldWind.Path(pathPositions);
      orbitPath.displayName = "orbitPath";
      orbitPath.pathType = WorldWind.LINEAR;
      orbitPath.numSubSegments = 1;
      orbitPath.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
      orbitPath.attributes = orbitPathAttributes;
      orbitPath.userProperties = {
        type: 'orbit',
        object: s
      };
      s.orbitPath = orbitPath;
      layer.addRenderable(orbitPath);
      s.orbitPaths.push(orbitPath);
    } else if (viewMode === MODE_2D && !hideOrbitPaths) {
      // for 2D projection, use multiple paths to avoid discontinuity at international date line.
      let p0 = 0;
      for (let i = 0; i < orbitPositions.length; i++) {
        if ((i === (orbitPositions.length - 1)) || (Math.sign(orbitPositions[i].longitude) !== Math.sign(orbitPositions[i + 1].longitude))) {
          pathPositions = orbitPositions.slice(p0, i + 1);
          orbitPath = new WorldWind.Path(pathPositions);
          orbitPath.displayName = "orbitPath";
          p0 = i + 1;
          orbitPath.pathType = WorldWind.LINEAR;
          orbitPath.numSubSegments = 1;
          orbitPath.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
          orbitPath.attributes = orbitPathAttributes;
          orbitPath.userProperties = {
            type: 'orbit',
            object: s
          };
          s.orbitPath = orbitPath;
          layer.addRenderable(orbitPath);
          s.orbitPaths.push(orbitPath);
        }
      }
    }
  }

  function createTrajectory(s: Spacecraft, layer: WorldWind.Layer) {
    if ((referenceBody === 'EARTH') && (s.referenceBody !== referenceBody)) {
      return;
    }
    const stepSeconds = 60;
    let trailingSeconds = (96 * 3600);
    let forwardSeconds = (48 * 3600);
    if (s.period) {
      const halfOrbit = s.period / 2;
      trailingSeconds = Math.ceil((halfOrbit) / stepSeconds) * stepSeconds;
      forwardSeconds = Math.ceil((halfOrbit) / stepSeconds) * stepSeconds;
    }

    // compute backward and forward orbit positions
    let p;
    const positions = [];
    const simSeconds = Math.floor(simulationTime / 1000 / stepSeconds) * stepSeconds;
    for (let t = simSeconds - trailingSeconds; t <= simSeconds + forwardSeconds; t += stepSeconds) {
      if ((t * 1000) >= (modelEpoch.getTime())) {
        p = s.getPosition(t * 1000, referenceBody, false);
        if (p) {
          if ((viewMode === MODE_2D)) {
            p.altitude = SURFACE_ALTITUDE;
          }
          positions.push(p);
        }
      }
    }

    // Remove previous orbit paths for this satellite.
    for (let i = 0; i < s.orbitPaths.length; i++) {
      layer.removeRenderable(s.orbitPaths[i]);
    }
    s.orbitPaths = [];

    // Create orbit paths from positions.
    // Multiple paths needed if 2D projection of path crosses international date line.
    const orbitPathAttributes = new WorldWind.ShapeAttributes(null);
    if (s.color) {
      orbitPathAttributes.outlineColor = getColor(s.color);
    } else {
      if (layer === userTrajectoriesLayer) {
        orbitPathAttributes.outlineColor = getColor(configuration.viewOptions.usatColor);
      } else {
        orbitPathAttributes.outlineColor = getColor(configuration.viewOptions.relayColor);
      }
    }
    orbitPathAttributes.interiorColor = orbitPathAttributes.outlineColor;
    orbitPathAttributes.outlineColor.alpha = 0.85;

    let pathPositions, path;
    if (viewMode === MODE_3D && !hideOrbitPaths) {
      pathPositions = positions;
      path = new WorldWind.Path(pathPositions);
      path.displayName = "trajectoryPath";
      path.pathType = WorldWind.LINEAR;
      path.numSubSegments = 1;
      path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
      path.attributes = orbitPathAttributes;
      path.userProperties = {
        type: 'trajectory',
        object: s
      };
      s.orbitPath = path;
      layer.addRenderable(path);
      s.orbitPaths.push(path);
    } else if (viewMode === MODE_2D && !hideOrbitPaths) {
      // for 2D projection, use multiple paths to avoid discontinuity at international date line.
      let p0 = 0;
      for (let i = 0; i < positions.length; i++) {
        if ((i === (positions.length - 1)) || (Math.sign(positions[i].longitude) !== Math.sign(positions[i + 1].longitude))) {
          pathPositions = positions.slice(p0, i + 1);
          path = new WorldWind.Path(pathPositions);
          path.displayName = "trajectoryPath";
          p0 = i + 1;
          path.pathType = WorldWind.LINEAR;
          path.numSubSegments = 1;
          path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
          path.attributes = orbitPathAttributes;
          path.userProperties = {
            type: 'trajectory',
            object: s
          };
          s.orbitPath = path;
          layer.addRenderable(path);
          s.orbitPaths.push(path);
        }
      }
    }
  }

  function findChildByDisplayName(data: LayerManagerData, displayName: string): boolean | undefined {
    let foundStatus: boolean | undefined;

    data.forEach(item => {
      item.children.forEach(child => {
        if (child.displayName === displayName) {
          foundStatus = child.status;
          return false; // Stop searching once found
        }
      });
    });

    return foundStatus;
  }

  function createSatelliteRenderable(s: Satellite, satelliteInfo: SatelliteInfo | GeoSatelliteInfo, createFovCone: boolean, layer: WorldWind.Layer) {

    if (((satelliteInfo as GeoSatelliteInfo).longitude !== undefined) && (s.altitude !== undefined)) {
      // satellite is geostationary
      s.position = new WorldWind.Position(0, (satelliteInfo as GeoSatelliteInfo).longitude, satelliteInfo.altitude as number * 1000);
    } else {
      const updated = s.updatePosition(simulationTime, referenceBody, false);
      s.orbitPaths = [];
      let orbitLayer;
      if (layer === userLayer) {
        orbitLayer = userOrbitsLayer;
      }
      if (layer === providerLayer) {
        orbitLayer = orbitsLayer;
      }
      createOrbit(s, orbitLayer);
    }

    let satelliteImage = 'images/satellite.png';
    if (layer === userLayer) {
      satelliteImage = 'images/usat_satellite.png';
    }

    const placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    const highlightPlacemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    highlightPlacemarkAttributes.imageScale = 0.4;

    placemarkAttributes.imageSource = satelliteImage;
    placemarkAttributes.imageScale = 0.3;
    placemarkAttributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 0.5);
    if (satelliteInfo.activated) {
      placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    } else {
      placemarkAttributes.imageColor = WorldWind.Color.LIGHT_GRAY;
    }
    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 1.0);
    placemarkAttributes.labelAttributes.color = WorldWind.Color.WHITE;

    const placemark = new WorldWind.Placemark(s.position);
    placemark.displayName = s.name;
    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    placemark.attributes = placemarkAttributes;
    placemark.highlightAttributes = highlightPlacemarkAttributes;
    placemark.userProperties = {
      type: 'satellite',
      info: satelliteInfo,
      object: s
    }
    s.renderable = placemark;

    const newLayerManagerData = [...layerManagerData];
    if (s.type === "user_satellite") {
      // Iterate over the existing children to check for duplicates
      const duplicateExists = newLayerManagerData[0].children.some(child => child.displayName === s.name);

      // Only push the new object if no duplicate exists
      if (!duplicateExists) {
        newLayerManagerData[0].children.push({ displayName: s.name, status: true });
      }
    }
    else if (s.type === "constellation") {
      const duplicateExists = newLayerManagerData[2].children.some(child => child.displayName === s.name);
      if (!duplicateExists) {
        newLayerManagerData[2].children.push({ displayName: s.name, status: true });
      }
    }
    else if (s.type === "geo_satellite") {
      const duplicateExists = newLayerManagerData[5].children.some(child => child.displayName === s.name);
      if (!duplicateExists) {
        newLayerManagerData[5].children.push({ displayName: s.name, status: true });
      }
    }
    else {
      const duplicateExists = newLayerManagerData[1].children.some(child => child.displayName === s.name);
      if (!duplicateExists) {
        newLayerManagerData[1].children.push({ displayName: s.name, status: true });
      }
    }
    setLayerManagerData(newLayerManagerData);
    layer.addRenderable(placemark);

    if (createFovCone && satelliteInfo.fov) {
      s.fov = satelliteInfo.fov;
      let sphereRadius, altitudeAboveSphere;
      if (configuration.viewOptions.projectOntoUSAT && configuration.usat.show !== false && userSpacecraft.length > 0) {
        let maxUserAltitude = 0;
        for (let u = 0; u < userSpacecraft.length; u++) {
          if (userSpacecraft[u].position && userSpacecraft[u].position.altitude > maxUserAltitude) {
            maxUserAltitude = userSpacecraft[u].position.altitude;
          }
        }
        sphereRadius = bodyRadius.get(referenceBody)! + maxUserAltitude;
        altitudeAboveSphere = s.position.altitude - maxUserAltitude;
      } else {
        sphereRadius = bodyRadius.get(referenceBody)!;
        altitudeAboveSphere = s.position.altitude;
      }
      if (altitudeAboveSphere < 0) {
        altitudeAboveSphere = 0;
      }
      const coneParameters = calculateDownwardConeProjectionRadius(sphereRadius, altitudeAboveSphere, s.fov);
      if (coneParameters) {
        s.fovConeRadiusArc = coneParameters.arc;
        s.fovConeBaseAltitude = coneParameters.sphereRadius - bodyRadius.get(referenceBody)!;
        // Create the mesh's attributes.
        const meshAttributes = new WorldWind.ShapeAttributes(null);
        if (satelliteInfo.activated) {
          meshAttributes.outlineColor = getColor(configuration.viewOptions.fovConeColor);
        } else {
          meshAttributes.outlineColor = getColor(configuration.viewOptions.fovInactiveConeColor);
        }

        meshAttributes.interiorColor = meshAttributes.outlineColor;
        meshAttributes.depthTest = true;

        const meshData = calculateConeMesh(s.position, s.fovConeRadiusArc, s.fovConeBaseAltitude, true);
        // Create the mesh.
        const mesh = new WorldWind.TriangleMesh(meshData.positions, meshData.indices, meshAttributes);
        mesh.displayName = "coneMesh";
        mesh.useSurfaceShapeFor2D = true; // avoid problem at international dateline
        mesh.outlineIndices = meshData.outlineIndices;
        mesh.expirationInterval = 60000;
        s.fovConeMesh = mesh;
        const result = findChildByDisplayName(layerManagerData, s.name);
        if (result)
          conesLayer.addRenderable(mesh);
      }
    }

    return satelliteInfo;
  }

  function createSpacecraftRenderable(s: Spacecraft, spacecraftInfo: SpacecraftInfo, layer: WorldWind.Layer) {
    const updated = s.updatePosition(simulationTime, referenceBody, false);
    s.orbitPaths = [];
    createTrajectory(s, userTrajectoriesLayer);

    const spacecraftImage = 'images/usat_satellite.png';

    const placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    const highlightPlacemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    highlightPlacemarkAttributes.imageScale = 0.4;

    placemarkAttributes.imageSource = spacecraftImage;
    placemarkAttributes.imageScale = 0.3;
    placemarkAttributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 0.5);
    if (spacecraftInfo.activated) {
      placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    } else {
      placemarkAttributes.imageColor = WorldWind.Color.LIGHT_GRAY;
    }
    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 1.0);
    placemarkAttributes.labelAttributes.color = WorldWind.Color.WHITE;

    const placemark = new WorldWind.Placemark(s.placemarkPosition);
    placemark.displayName = s.name;
    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    placemark.attributes = placemarkAttributes;
    placemark.highlightAttributes = highlightPlacemarkAttributes;
    placemark.userProperties = {
      type: 'spacecraft',
      info: spacecraftInfo,
      object: s
    }
    s.renderable = placemark;

    const newLayerManagerData = [...layerManagerData];
    if (s.type === "user_satellite") {
      const duplicateExists = newLayerManagerData[0].children.some(child => child.displayName === s.name);
      // Only push the new object if no duplicate exists
      if (!duplicateExists) {
        newLayerManagerData[0].children.push({ displayName: s.name, status: true });
      }
    }
    else {
      const duplicateExists = newLayerManagerData[1].children.some(child => child.displayName === s.name);
      if (!duplicateExists) {
        newLayerManagerData[1].children.push({ displayName: s.name, status: true });
      }
    }
    setLayerManagerData(newLayerManagerData);
    layer.addRenderable(placemark);

    return spacecraftInfo;
  }

  function createGroundStationRenderable(gs: GroundStation, groundStationInfo: GroundStationInfo, isUser: boolean) {
    const updated = gs.updatePosition(simulationTime, referenceBody);
    let groundStationImage;
    if (isUser) {
      groundStationImage = 'images/terrestrial.png';
    } else {
      groundStationImage = 'images/groundStation.png';
    }

    const placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    const highlightPlacemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    highlightPlacemarkAttributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 0.0
    );
    if (viewMode === MODE_3D) {
      highlightPlacemarkAttributes.imageScale = 0.5;
    } else {
      highlightPlacemarkAttributes.imageScale = 0.5;
    }

    placemarkAttributes.imageSource = groundStationImage;
    if (viewMode === MODE_3D) {
      placemarkAttributes.imageScale = 0.3;
    } else {
      placemarkAttributes.imageScale = 0.3;
    }
    placemarkAttributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 0.0);

    if (groundStationInfo.activated) {
      placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    } else {
      placemarkAttributes.imageColor = WorldWind.Color.LIGHT_GRAY;
    }
    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 1.0);
    placemarkAttributes.labelAttributes.color = WorldWind.Color.WHITE;

    const placemark = new WorldWind.Placemark(gs.position);
    placemark.displayName = groundStationInfo.name;
    placemark.eyeDistanceScaling = true;
    placemark.eyeDistanceScalingThreshold = 10000000;
    placemark.altitudeMode = WorldWind.ABSOLUTE;
    placemark.attributes = placemarkAttributes;
    placemark.highlightAttributes = highlightPlacemarkAttributes;
    placemark.userProperties = {
      type: 'groundstation',
      info: groundStationInfo,
      object: gs
    };
    gs.renderable = placemark;
    const newLayerManagerData = [...layerManagerData];
    if (isUser) {
      const duplicateExists = newLayerManagerData[4].children.some(child => child.displayName === groundStationInfo.name);
      if (!duplicateExists) {
        newLayerManagerData[4].children.push({ displayName: groundStationInfo.name, status: true });
      }
    }
    else {
      const duplicateExists = newLayerManagerData[3].children.some(child => child.displayName === groundStationInfo.name);
      if (!duplicateExists) {
        newLayerManagerData[3].children.push({ displayName: groundStationInfo.name, status: true });
      }
    }
    setLayerManagerData(newLayerManagerData);
    groundStationsLayer.addRenderable(placemark);

    if ((referenceBody === 'MOON') && (model.hideLunarGroundStationCones)) {
      return;
    }
    if (isUser) {
      // Only show ground station cones for providers.
      return;
    }
    let altitude = 0;
    if (model.userSatellites) {
      let maxUserAltitude = 0;
      for (let u = 0; u < userSpacecraft.length; u++) {
        if (userSpacecraft[u].position && userSpacecraft[u].position.altitude > maxUserAltitude) {
          const a = userSpacecraft[u].position.altitude;
          if (((userSpacecraft[u].referenceBody === referenceBody) && (a <= maxGroundStationConeHeight)) || (viewMode === MODE_2D)) {
            // Only extend ground station cones to another body if in 2D mode.
            // Limit height of cones to a maximum height.
            maxUserAltitude = a;
          }
        }
      }
      altitude = maxUserAltitude;
    } else {
      if (model.constellations) {
        altitude = model.constellations[0].shells[0].altitude * 1000;
      }
    }

    const coneRadius = calculateUpwardConeProjectionRadius(altitude, gs.minElevationAngle);

    // Create the mesh's attributes.
    const meshAttributes = new WorldWind.ShapeAttributes(null);
    if (groundStationInfo.activated) {
      if (groundStationInfo.coverageColor) {
        meshAttributes.outlineColor = getColor(groundStationInfo.coverageColor);
      } else {
        meshAttributes.outlineColor = getColor(configuration.viewOptions.groundStationConeColor);
      }
    } else {
      meshAttributes.outlineColor = getColor(configuration.viewOptions.groundStationInactiveConeColor);
    }
    meshAttributes.interiorColor = meshAttributes.outlineColor;
    meshAttributes.depthTest = true;

    const highlightAttributes = new WorldWind.ShapeAttributes(meshAttributes);
    highlightAttributes.outlineColor = meshAttributes.outlineColor;
    highlightAttributes.interiorColor = meshAttributes.interiorColor.clone();
    highlightAttributes.interiorColor.alpha *= 2;

    const meshData = calculateConeMesh(gs.position, coneRadius as number, altitude, true);
    // Create the mesh.
    const mesh = new WorldWind.TriangleMesh(meshData.positions, meshData.indices, meshAttributes);
    mesh.highlightAttributes = highlightAttributes;
    mesh.displayName = gs.name + ' cone';
    mesh.useSurfaceShapeFor2D = true;
    mesh.outlineIndices = meshData.outlineIndices;
    mesh.expirationInterval = 60000;
    mesh.userProperties = {
      type: 'groundstation',
      info: groundStationInfo,
      object: gs,
      highlightRef: placemark
    };
    placemark.userProperties.highlightRef = mesh;
    gs.coneMesh = mesh;

    const result = findChildByDisplayName(layerManagerData, groundStationInfo.name);
    if (result)
      groundStationConesLayer.addRenderable(mesh);
  }

  function createBodyRenderable(body: Body) {
    body.updatePosition(simulationTime, false);

    let bodyImage;
    if (body.name === 'EARTH') {
      bodyImage = 'images/earth.png';
    }
    if (body.name === 'MOON') {
      bodyImage = 'images/moon.png';
    }

    const placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    placemarkAttributes.imageSource = bodyImage;
    if (viewMode === MODE_3D) {
      placemarkAttributes.imageScale = 0.1;
    } else {
      placemarkAttributes.imageScale = 0.3;
    }
    placemarkAttributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 0.5);

    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 1.0);
    placemarkAttributes.labelAttributes.color = WorldWind.Color.WHITE;

    const placemark = new WorldWind.Placemark(body.position);
    placemark.displayName = body.name;
    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    placemark.attributes = placemarkAttributes;
    body.renderable = placemark;
    baseLayer.addRenderable(placemark);
  }

  function createLinkContactRenderable(link: Link): WorldWind.Path {
    const linkPathAttributes = new WorldWind.ShapeAttributes(null);
    linkPathAttributes.outlineColor = getColor('#00ff00');
    linkPathAttributes.interiorColor = linkPathAttributes.outlineColor;
    linkPathAttributes.outlineWidth = 2;
    linkPathAttributes.outlineColor.alpha = 0.5;
    const highlightLinkPathAttributes = new WorldWind.ShapeAttributes(null);
    highlightLinkPathAttributes.outlineColor = linkPathAttributes.outlineColor;
    highlightLinkPathAttributes.interiorColor = highlightLinkPathAttributes.outlineColor;
    highlightLinkPathAttributes.outlineColor.alpha = 0.75;

    const linkPath = new WorldWind.Path([link.sourceObject?.position, link.destinationObject?.position]);
    linkPath.displayName = "linkPath " + linkContactsLayer.renderables.length;
    linkPath.pathType = WorldWind.LINEAR;
    linkPath.numSubSegments = 1;
    linkPath.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    linkPath.attributes = linkPathAttributes;
    linkPath.highlightAttributes = highlightLinkPathAttributes;
    linkPath.userProperties = {
      type: 'contactLink',
      links: []
    };
    link.renderable = linkPath;
    linkContactsLayer.addRenderable(linkPath);
    contactLines.push(link);
    return linkPath;
  }

  function createInterferenceLinkContactRenderable(link: Link): WorldWind.Path {
    const linkPathAttributes = new WorldWind.ShapeAttributes(null);
    const displayName = link.source + " - " + link.destination;
    linkPathAttributes.outlineColor = getColor('#ff0000');
    linkPathAttributes.interiorColor = linkPathAttributes.outlineColor;
    linkPathAttributes.outlineWidth = 2;
    linkPathAttributes.outlineColor.alpha = 0.5;
    const highlightLinkPathAttributes = new WorldWind.ShapeAttributes(null);
    highlightLinkPathAttributes.outlineColor = linkPathAttributes.outlineColor;
    highlightLinkPathAttributes.interiorColor = highlightLinkPathAttributes.outlineColor;
    highlightLinkPathAttributes.outlineColor.alpha = 0.75;


    const linkPath = new WorldWind.Path([link.sourceObject?.position, link.destinationObject?.position]);
    linkPath.displayName = "linkPath " + linkContactsLayer.renderables.length;
    linkPath.pathType = WorldWind.LINEAR;
    linkPath.numSubSegments = 1;
    linkPath.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    linkPath.attributes = linkPathAttributes;
    linkPath.highlightAttributes = highlightLinkPathAttributes;
    linkPath.userProperties = {
      type: 'contactLink',
      links: []
    };
    link.renderable = linkPath;
    linkContactsLayer.addRenderable(linkPath);
    interferenceContactLines.push(link);
    return linkPath;
  }

  function createGroundStation(groundStationInfo: GroundStationInfo, isUser: boolean) {
    const gs = new GroundStation(groundStationInfo.id);
    gs.name = groundStationInfo.name;
    gs.latitude = groundStationInfo.latitude;
    gs.longitude = groundStationInfo.longitude
    gs.altitude = groundStationInfo.altitude || 0;
    gs.referenceBody = groundStationInfo.referenceBody || 'EARTH';
    gs.minElevationAngle = groundStationInfo.minElevationAngle;
    gs.analysisInterval = [
      modelEpoch.getTime(),
      modelEpoch.getTime() + (model.duration as number * 1000),
    ];
    if (defined(groundStationInfo.epochOffsetStart) && defined(groundStationInfo.epochOffsetStop)) {
      let scale = 1;
      if (groundStationInfo.epochOffsetUnits) {
        if (groundStationInfo.epochOffsetUnits === 'MINUTES') {
          scale = 60;
        }
        if (groundStationInfo.epochOffsetUnits === 'HOURS') {
          scale = 60 * 60;
        }
        if (groundStationInfo.epochOffsetUnits === 'DAYS') {
          scale = 60 * 60 * 24;
        }
        gs.analysisInterval = [
          modelEpoch.getTime() + (groundStationInfo.epochOffsetStart as number * scale * 1000),
          modelEpoch.getTime() + (groundStationInfo.epochOffsetStop as number * scale * 1000),
        ];
      }
    }
    gs.init(referenceBody);
    if (gs.referenceBody === referenceBody) {
      createGroundStationRenderable(gs, groundStationInfo, isUser);
    }
    groundStations.push(gs);
  }

  function createConstellations() {
    if (!model.constellations) {
      return;
    }
    for (let n = 0; n < model.constellations.length; n++) {
      if ((model.constellations[n].referenceBody || 'EARTH') === referenceBody) {
        for (let s = 0; s < model.constellations[n].shells.length; s++) {
          const shell = model.constellations[n].shells[s];
          // degrees separation between planes to compute right ascension of the ascending node
          const planeSeparation = shell.planeDistribution / shell.nPlanes;
          // degrees separation between satellites within a plane to compute mean anomaly
          const satelliteSeparation = 360 / shell.nSatellitesPerPlane;

          for (let p = 0; p < shell.nPlanes; p++) {
            for (let i = 0; i < shell.nSatellitesPerPlane; i++) {
              const satId = (p * shell.nSatellitesPerPlane) + (i + 1);
              const sat = new Satellite();
              sat.epoch = modelEpoch;
              sat.name = model.constellations[n].name + satId;
              sat.parentId = model.constellations[n].id;
              sat.meanMotionFirstDerivative = 0.0;
              sat.meanMotionSecondDerivative = 0.0;
              sat.dragTerm = 0.0;
              sat.inclination = shell.inclination;
              sat.rightAscensionOfAscendingNode = p * planeSeparation;
              sat.eccentricity = shell.eccentricity;
              sat.argumentOfPerigee = 0.0;
              sat.meanAnomaly = ((p * shell.phaseOffset) + (i * satelliteSeparation)) % 360;
              sat.referenceBody = model.constellations[n].referenceBody || 'EARTH';
              sat.sma = shell.altitude + (bodyRadius.get(sat.referenceBody)! / 1000);
              sat.period = calculateOrbitPeriod(sat.sma, sat.referenceBody);
              sat.meanMotion = SECONDS_PER_DAY / sat.period;
              sat.revolutionNum = 1;
              sat.init(referenceBody);
              sat.type = "constellation";
              providerSpacecraft.push(sat);
              const satelliteInfo: SatelliteInfo = {
                id: sat.id,
                parentId: model.constellations[n].id,
                parent: model.constellations[n],
                name: sat.name,
                fov: model.constellations[n].fov,
                inclination: sat.inclination,
                altitude: sat.altitude as number ?? shell?.altitude ?? 0,
                activated: model.constellations[n].activated
              };
              createSatelliteRenderable(sat, satelliteInfo, true, providerLayer);
            }
          }
        }
      }
    }
  }

  function createSatellite(satelliteInfo: SatelliteInfo, isUser: boolean = false) {
    const sat = new Satellite();
    sat.epoch = modelEpoch;
    sat.name = satelliteInfo.name;
    sat.parentId = satelliteInfo.parentId;
    sat.meanMotionFirstDerivative = 0.0;
    sat.meanMotionSecondDerivative = 0.0;
    sat.dragTerm = 0.0;
    sat.inclination = satelliteInfo.inclination;
    if (satelliteInfo.raan) {
      if (satelliteInfo.raan < 0) {
        satelliteInfo.raan += 360;
      }
      sat.rightAscensionOfAscendingNode = satelliteInfo.raan;
    } else {
      sat.rightAscensionOfAscendingNode = 0;
    }
    sat.altitude = satelliteInfo.altitude ? satelliteInfo.altitude as number : 0;
    sat.eccentricity = satelliteInfo.eccentricity ? satelliteInfo.eccentricity as number : 0;
    sat.argumentOfPerigee = 0.0;
    sat.meanAnomaly = satelliteInfo.meanAnomaly ? satelliteInfo.meanAnomaly as number : 0;
    if (satelliteInfo.altitude) {
      sat.sma = satelliteInfo.altitude + (bodyRadius.get((satelliteInfo.referenceBody || 'EARTH'))! / 1000);
    }
    if (satelliteInfo.sma) {
      sat.sma = satelliteInfo.sma;
    }
    sat.referenceBody = satelliteInfo.referenceBody || 'EARTH';
    sat.period = calculateOrbitPeriod(sat.sma, sat.referenceBody);
    sat.meanMotion = SECONDS_PER_DAY / sat.period;
    sat.globe = globe3D;
    sat.revolutionNum = 1;
    sat.init(referenceBody);
    if (isUser) {
      sat.type = "user_satellite";
      userSpacecraft.push(sat);
      createSatelliteRenderable(sat, satelliteInfo, false, userLayer);
    } else {
      sat.type = "satellite";
      providerSpacecraft.push(sat);
      createSatelliteRenderable(sat, satelliteInfo, true, providerLayer);
    }
  }

  function createSpacecraft(spacecraftInfo: SpacecraftInfo & SatelliteInfo, isUser: boolean = false) {
    const spacecraftId = spacecraftInfo.id;
    const spacecraft = new Spacecraft(spacecraftId);
    spacecraft.name = spacecraftInfo.name;
    spacecraft.parentId = spacecraftInfo.parentId;
    spacecraft.analysisInterval = [
      modelEpoch.getTime(),
      modelEpoch.getTime() + (model.duration as number * 1000),
    ];
    spacecraft.apiURL = model.apiURL || '';
    if (defined(spacecraftInfo.epochOffsetStart) && defined(spacecraftInfo.epochOffsetStop)) {
      let scale = 1;
      if (spacecraftInfo.epochOffsetUnits) {
        if (spacecraftInfo.epochOffsetUnits === 'MINUTES') {
          scale = 60;
        }
        if (spacecraftInfo.epochOffsetUnits === 'HOURS') {
          scale = 60 * 60;
        }
        if (spacecraftInfo.epochOffsetUnits === 'DAYS') {
          scale = 60 * 60 * 24;
        }
        spacecraft.analysisInterval = [
          modelEpoch.getTime() + (spacecraftInfo.epochOffsetStart as number * scale * 1000),
          modelEpoch.getTime() + (spacecraftInfo.epochOffsetStop as number * scale * 1000),
        ];
        spacecraft.epoch = new Date(spacecraft.analysisInterval[0]);
      }
    } else {
      if (spacecraftInfo.epoch) {
        spacecraft.epoch = new Date(spacecraftInfo.epoch);
      } else {
        spacecraft.epoch = modelEpoch;
      }
    }

    spacecraft.referenceBody = spacecraftInfo.referenceBody || 'EARTH';
    spacecraft.color = spacecraftInfo.color;
    spacecraft.globe = globe3D;
    spacecraft.simulation = model.simulationName as string;
    let sma = 0;
    if (spacecraftInfo.sma) {
      sma = spacecraftInfo.sma;
    } else {
      if (spacecraftInfo.altitude) {
        sma = spacecraftInfo.altitude + (bodyRadius.get(spacecraft.referenceBody)!) / 1000;
      }
    }

    spacecraft.period = calculateOrbitPeriod(sma, spacecraft.referenceBody as string);
    spacecraft.init(referenceBody);
    if (isUser) {
      spacecraft.type = "user_satellite";
      userSpacecraft.push(spacecraft);
      createSpacecraftRenderable(spacecraft, spacecraftInfo, userLayer);
    } else {
      spacecraft.type = "satellite";
      providerSpacecraft.push(spacecraft);
      createSpacecraftRenderable(spacecraft, spacecraftInfo, providerLayer);
    }
  }

  function createAllSpacecraft() {
    let allSatellites: any[] = [];
    const nonUserIndex = model.userSatellites ? model.userSatellites.length : 0
    allSatellites = allSatellites.concat(model.userSatellites || []).concat(model.satellites || []);
    if (allSatellites.length === 0) {
      return;
    }
    for (let s = 0; s < allSatellites.length; s++) {
      const info = { ...allSatellites[s] };
      const usePositionAPI = (("usePositionAPI" in info) && (info.usePositionAPI));
      if (((info.referenceBody || 'EARTH') !== referenceBody) && (!usePositionAPI)) {
        continue;
      }
      const isUser = (s < nonUserIndex);
      if (usePositionAPI) {
        createSpacecraft(info, isUser);
      } else {
        createSatellite(info, isUser);
      }
    }
  }


  function createGeoSatellites() {
    if (!model.geoSatellites) {
      return;
    }
    if (referenceBody !== 'EARTH') {
      return;
    }
    for (let g = 0; g < model.geoSatellites.length; g++) {
      const geoSatelliteInfo = model.geoSatellites[g];
      const satId = geoSatelliteInfo.id;
      const sat = new Satellite(satId);
      sat.epoch = modelEpoch;
      sat.name = geoSatelliteInfo.name;
      sat.altitude = geoSatelliteInfo.altitude;
      sat.sma = geoSatelliteInfo.altitude + (bodyRadius.get(referenceBody)! / 1000);
      sat.period = calculateOrbitPeriod(sat.sma, referenceBody);
      sat.meanMotion = SECONDS_PER_DAY / sat.period;
      sat.type = "geo_satellite"
      providerSpacecraft.push(sat);
      createSatelliteRenderable(sat, geoSatelliteInfo, true, providerLayer);
    }
  }


  function createUserGroundStations() {
    if (!model.userGroundStations) {
      return;
    }
    model.userGroundStations.forEach(groundStationInfo => {
      createGroundStation(groundStationInfo, true);
    });
  }

  function createGroundStations() {
    if (!model.groundStations) {
      return;
    }
    model.groundStations.forEach(groundStationInfo => {
      createGroundStation(groundStationInfo, false);
    });
  }

  function mergeIntervals(intervals: Window[]): Window[] {
    if (!intervals.length) return intervals;

    // Sort intervals by their start points
    intervals.sort((a, b) => a[0] - b[0]);
    const merged: Window[] = [];
    let currentInterval = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
      const [currentStart, currentEnd] = currentInterval;
      const [nextStart, nextEnd] = intervals[i];

      // Check if intervals overlap or are contiguous
      if (currentEnd >= nextStart - 1) {
        // Merge the intervals
        currentInterval = [currentStart, Math.max(currentEnd, nextEnd)];
      } else {
        // Push the current interval if it has different start and end
        if (currentStart !== currentEnd) {
          merged.push(currentInterval);
        }
        currentInterval = intervals[i];
      }
    }

    // Add the last interval if it has different start and end
    if (currentInterval[0] !== currentInterval[1]) {
      merged.push(currentInterval);
    }

    return merged;
  }

  // Function to validate if an array is a valid Window
  function isValidWindow(window: any): window is Window {
    return Array.isArray(window) && window.length === 2 && typeof window[0] === 'number' && typeof window[1] === 'number';
  }

  function createLinkContacts(linkList: any[], linkContactList: any[]) {

    let allWindows: Window[] = [];
    linkContactList.forEach(list => {
      if (Array.isArray(list.windows)) {
        if (list.windows.every(isValidWindow)) {
          // windows is already in the format [[number, number]]
          allWindows = allWindows.concat(list.windows);
        } else if (isValidWindow(list.windows)) {
          // windows is in the format [number, number]
          allWindows.push(list.windows);
        } else {
          console.error('Invalid window format:', list.windows);
        }
      }
    });
    setContactList(linkContactList);
    const reducedContactPoints = mergeIntervals(allWindows);
    setContactTimeline(reducedContactPoints);

    // For each link, create a reference to the actual Spacecraft and GroundStation objects.
    let allEndpoints: (Spacecraft | GroundStation)[] = [];
    allEndpoints = allEndpoints.concat(groundStations).concat(userSpacecraft).concat(providerSpacecraft);
    const links: Link[] = [];

    // Loop through the links defined in the configuration and create Link objects for them.
    for (let i = 0; i < linkList.length; i++) {
      const linkInfo = linkList[i];
      const link: Link = new Link(linkInfo['name']);
      link.source = linkInfo['source'];
      link.destination = linkInfo['destination'];
      link.direction = linkInfo['direction'];
      link.frequencyBand = linkInfo['frequency'];
      link.freq_MHz = linkInfo['freq_MHz'];
      link.ebNo = linkInfo['ebNo'];
      link.gOverT = linkInfo['g/t'];
      link.eirp = linkInfo['eirp'];
      link.margin = linkInfo['margin'];
      // The actual data rate used in he analysis is found in the analysis output.
      for (let j = 0; j < linkContactList.length; j++) {
        const linkContactInfo = linkContactList[j];
        if ((linkContactInfo['source'] === link.source) && (linkContactInfo['destination'] === link.destination)) {
          link.dataRate_kbps = linkContactInfo['rate'] * 1000;
        }
      }
      links.push(link);
    }

    // Connect the actual endpoint objects with the link.
    for (let i = 0; i < links.length; i++) {
      const link: Link = links[i];
      for (let e = 0; e < allEndpoints.length; e++) {
        const endpoint = allEndpoints[e];
        if (endpoint.name === link.source) {
          link.sourceObject = endpoint;
          continue;
        }
        if (endpoint.name === link.destination) {
          link.destinationObject = endpoint;
          continue;
        }
      }
    }

    // Create an interval tree of contact intervals, each one associated with the link.
    contactIntervals = new IntervalTree();
    for (let j = 0; j < linkContactList.length; j++) {
      const linkContactInfo = linkContactList[j];
      const sourceName = linkContactInfo['source'];
      const destName = linkContactInfo['destination'];
      const frequencyBand = linkContactInfo['frequency'];
      const windows = linkContactInfo['windows'];
      // Find the link object for this link contact information.
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if ((sourceName === link.source) && (destName === link.destination) && (frequencyBand === link.frequencyBand)) {
          if ((link.sourceObject !== undefined) && (link.destinationObject !== undefined)) {
            for (let w = 0; w < windows.length; w++) {
              const contactStart = startTime + (windows[w][0] * 1000); // store as milliseconds
              const contactStop = startTime + (windows[w][1] * 1000);
              if (!isNaN(contactStart)) {
                contactIntervals.insert([contactStart, contactStop], link);
              }
            }
          }
          break;
        }
      }
    }
  }

  function createInterferenceLinkContacts(linkList: any[], linkContactList: any[]) {

    const newLayerManagerData = [...layerManagerData];
    const newRfData: LayerRow[] = [];
    newLayerManagerData[6].children = [];
    linkList.map(item => {
      const displayName = item.source + " - " + item.destination;
      const duplicateExists = newLayerManagerData[6].children.some(child => child.displayName === displayName);
      if (!duplicateExists) {
        newLayerManagerData[6].children.push({ displayName: displayName, status: true, i_n: item.i_n });
        newRfData.push({ displayName: displayName, status: true, i_n: item.i_n });
      }
    });

    // Calculate min and max i_n values
    const minMax = newRfData.reduce((acc, item) => {
      if (item.i_n !== undefined) {
        acc.min = item.i_n < acc.min ? item.i_n : acc.min;
        acc.max = item.i_n > acc.max ? item.i_n : acc.max;
      }
      return acc;
    }, { min: Infinity, max: -Infinity });
    rfData = newRfData;
    setMinIn(minMax.min);
    setMaxIn(minMax.max);
    setLayerManagerData(newLayerManagerData);
    setRfSlider([minMax.min, minMax.max]);

    let allWindows: Window[] = [];
    linkContactList.forEach(list => {
      if (Array.isArray(list.windows)) {
        if (list.windows.every(isValidWindow)) {
          // windows is already in the format [[number, number]]
          allWindows = allWindows.concat(list.windows);
        } else if (isValidWindow(list.windows)) {
          // windows is in the format [number, number]
          allWindows.push(list.windows);
        } else {
          console.error('Invalid window format:', list.windows);
        }
      }
    });
    setInterferenceContactList(linkContactList);
    const reducedInterferenceContactPoints = mergeIntervals(allWindows);
    setInterferenceTimeline(reducedInterferenceContactPoints);

    // For each link, create a reference to the actual Spacecraft and GroundStation objects.
    let allEndpoints: (Spacecraft | GroundStation)[] = [];
    allEndpoints = allEndpoints.concat(groundStations).concat(userSpacecraft).concat(providerSpacecraft);
    const links: Link[] = [];

    // Loop through the links defined in the configuration and create Link objects for them.
    for (let i = 0; i < linkList.length; i++) {
      const linkInfo = linkList[i];
      const link: Link = new Link(linkInfo['name']);
      const displayName = linkInfo['source'] + " - " + linkInfo['destination'];
      const i_n = linkInfo['i_n'];
      link.source = linkInfo['source'];
      link.destination = linkInfo['destination'];
      link.direction = linkInfo['direction'];
      link.frequencyBand = linkInfo['frequency'];
      link.freq_MHz = linkInfo['freq_MHz'];
      link.ebNo = linkInfo['ebNo'];
      link.gOverT = linkInfo['g/t'];
      link.eirp = linkInfo['eirp'];
      link.margin = linkInfo['margin'];
      // The actual data rate used in he analysis is found in the analysis output.
      for (let j = 0; j < linkContactList.length; j++) {
        const linkContactInfo = linkContactList[j];
        if ((linkContactInfo['source'] === link.source) && (linkContactInfo['destination'] === link.destination)) {
          link.dataRate_kbps = linkContactInfo['rate'] * 1000;
        }
      }
      links.push(link);

    }

    // Connect the actual endpoint objects with the link.
    for (let i = 0; i < links.length; i++) {
      const link: Link = links[i];
      for (let e = 0; e < allEndpoints.length; e++) {
        const endpoint = allEndpoints[e];
        if (endpoint.name === link.source) {
          link.sourceObject = endpoint;
          continue;
        }
        if (endpoint.name === link.destination) {
          link.destinationObject = endpoint;
          continue;
        }
      }
    }

    // Create an interval tree of contact intervals, each one associated with the link.
    interferenceContactIntervals = new IntervalTree();
    for (let j = 0; j < linkContactList.length; j++) {
      const linkContactInfo = linkContactList[j];
      const sourceName = linkContactInfo['source'];
      const destName = linkContactInfo['destination'];
      const frequencyBand = linkContactInfo['frequency'];
      const windows = linkContactInfo['windows'];
      // Find the link object for this link contact information.
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if ((sourceName === link.source) && (destName === link.destination) && (frequencyBand === link.frequencyBand)) {
          if ((link.sourceObject !== undefined) && (link.destinationObject !== undefined)) {
            for (let w = 0; w < windows.length; w++) {
              const contactStart = startTime + (windows[w][0] * 1000); // store as milliseconds
              const contactStop = startTime + (windows[w][1] * 1000);
              if (!isNaN(contactStart)) {
                interferenceContactIntervals.insert([contactStart, contactStop], link);
              }
            }
          }
          break;
        }
      }
    }
  }

  const resetUpdateTimes = () => {
    lastSatellitePositionUpdate = 0;
    lastConePositionUpdate = 0;
    lastGroundStationConeUpdate = 0;
    lastOrbitUpdate = 0;
    lastBodyUpdate = 0;
    lastLinkContactsUpdate = 0;
  }

  const init = () => {
    if (modelReferenceBody !== referenceBody) {
      referenceBody = modelReferenceBody;
      setReferenceBody(modelReferenceBody);
      if (viewMode === MODE_2D) {
        wwd.globe = globe2D;
      } else {
        if (viewMode === MODE_3D) {
          wwd.globe = globe3D;
        }
      }
      if ((viewMode === MODE_3D) && (referenceBody === 'EARTH')) {
        useInertialFrame = model.useEarthInertialFrame || false;
      } else {
        if (wwd.layers.indexOf(userTrajectoriesLayer) === -1) {
          wwd.addLayer(userTrajectoriesLayer);
        }
        if (wwd.layers.indexOf(providerTrajectoriesLayer) === -1) {
          wwd.addLayer(providerTrajectoriesLayer);
        }
        useInertialFrame = false;
      }
      viewControlsLayer.globe3D = globe3D;
      viewControlsLayer.globe2D = globe2D;
      currentGlobe = wwd.globe;
      updateViewMode();
      wwd.redraw();
    }

    setModelIsDecayed(false);
    clearModel();
    if (model.simulationName) {
      fetchSimulationData(model.simulationName)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return null;
          }
        })
        .then(data => {
          resetUpdateTimes();
          createModel(data);
          setInitState(true);
          setTimeout(() => {
            setDoAnimate(true);
          }, 500);
        });
    } else {
      createModel();
      setInitState(true);
      setTimeout(() => {
        setDoAnimate(true);
      }, 500);
    }
  }



  const clearModel = () => {
    providerSpacecraft = [];
    userSpacecraft = [];
    groundStations = [];
    if (contactIntervals) {
      contactIntervals.clear();
    }
    if (interferenceContactIntervals) {
      interferenceContactIntervals.clear();
    }
    tlejs.clearCache();
    tlejs.clearTLEParseCache();
    baseLayer.removeAllRenderables();
    providerLayer.removeAllRenderables();
    userLayer.removeAllRenderables();
    groundUserLayer.removeAllRenderables();
    orbitsLayer.removeAllRenderables();
    userOrbitsLayer.removeAllRenderables();
    userTrajectoriesLayer.removeAllRenderables();
    providerTrajectoriesLayer.removeAllRenderables();
    conesLayer.removeAllRenderables();
    linkContactsLayer.removeAllRenderables();
    groundStationsLayer.removeAllRenderables();
    groundStationConesLayer.removeAllRenderables();
  }



  const createModel = (simulationData?: any) => {
    if (model.epoch) {
      modelEpoch = new Date(model.epoch);
    } else {
      modelEpoch = new Date();
    }
    startTime = modelEpoch.getTime();
    stopTime = startTime + simulationDuration;
    starfield.time = modelEpoch;
    atmosphere.time = modelEpoch;
    if (model.duration) {
      simulationDuration = model.duration * 1000;
      stopTime = startTime + simulationDuration;
      setTimelineRange([startTime, startTime + simulationDuration]);
      setRangeBounds({ start: new Date(startTime), stop: new Date(startTime + simulationDuration) });
    }
    simulationTime = startTime;
    try {
      if (model.showOtherBodies) {
        if (referenceBody === 'EARTH') {
          otherBody = new Body('MOON');
        }
        if (referenceBody === 'MOON') {
          otherBody = new Body('EARTH');
        }
        if (otherBody) {
          otherBody.epoch = modelEpoch;
          otherBody.referenceBody = referenceBody;
          otherBody.apiURL = model.apiURL || '';
          otherBody.globe = globe3D;
          otherBody.simulation = model.simulationName as string;
          otherBody.analysisInterval = [
            modelEpoch.getTime(),
            modelEpoch.getTime() + (model.duration as number * 1000),
          ];
          otherBody.init();
          createBodyRenderable(otherBody);
        }
      }


      createAllSpacecraft();
      createUserGroundStations();
      createConstellations();
      createGeoSatellites();
      createGroundStations();
      if (simulationData && simulationData['simulationConfig'] && simulationData['contactList']) {
        createLinkContacts(simulationData['simulationConfig']['links'], simulationData['contactList']);
      }

      if (simulationData && simulationData['simulationConfig'] && simulationData['interferenceContactList']) {
        createInterferenceLinkContacts(simulationData['simulationConfig']['links'], simulationData['interferenceContactList']);
      }
      wwd.redraw();
    } catch (e) {
      console.log(e);
      setModelIsDecayed(true);
    }
  };

  const hoverTrigger = () => {
    if (selectedGroundStation || selectedSatellite || selectedSpacecraft) {
      return;
    }
    if ((hoverObject !== selectedGroundStation) && (hoverObject !== selectedSatellite) && (hoverObject !== selectedSpacecraft)) {
      if (hoverObjectType === 'groundstation') {
        handleHoverGroundStation(hoverObject as GroundStationSelectionData, hoverX, hoverY)
      }
      if (hoverObjectType === 'satellite') {
        handleHoverSatellite(hoverObject as SatelliteSelectionData, hoverX, hoverY)
      }
      if (hoverObjectType === 'spacecraft') {
        handleHoverSpacecraft(hoverObject as SpacecraftSelectionData, hoverX, hoverY)
      }
    }
  };

  const handleHover = function (e: MouseEvent) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (selectedGroundStation || selectedSatellite || selectedSpacecraft || selectedContactLink) {
      // hovering should not override explicit selections
      return;
    }

    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    const pickList = wwd.pick(wwd.canvasCoordinates(e.clientX, e.clientY));
    if (!pickList.hasNonTerrainObjects()) {
      if (hoverObject) {
        cancelHoverObject(hoverX, hoverY);
        clearTimeout(hoverTimeout);
        hoverObject = undefined;
      }
      return;
    }
    let hovering: boolean = false;
    if (pickList.objects.length > 0) {
      for (let p = 0; p < pickList.objects.length; p++) {
        if (!pickList.objects[p].isTerrain) {
          const o = pickList.objects[p].userObject;
          if ((o.userProperties.type === 'groundstation') || (o.userProperties.type === 'satellite') || (o.userProperties.type === 'spacecraft')) {
            hovering = true;
            if (o.userProperties.type === 'satellite') {
              hoverObject = hoverObject as SatelliteSelectionData;
            }
            if (o.userProperties.type === 'spacecraft') {
              hoverObject = hoverObject as SpacecraftSelectionData;
            }
            if (o.userProperties.type === 'groundstation') {
              hoverObject = hoverObject as GroundStationSelectionData;
            }

            if (!hoverObject || (hoverObject.info !== o.userProperties.info)) {
              clearTimeout(hoverTimeout);
              hoverObject = {
                info: o.userProperties.info,
                object: o.userProperties.object
              };
              hoverObjectType = o.userProperties.type;
              hoverX = x;
              hoverY = y;
              hoverTimeout = setTimeout(hoverTrigger, HOVER_TRIGGER_TIME);
              return;
            }
          }
        }
      }
    }
    if (hoverObject && !hovering) {
      cancelHoverObject(hoverX, hoverY);
      clearTimeout(hoverTimeout);
      hoverObject = undefined;
    }

  }

  const handleDoubleclick = function (e: MouseEvent) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (selectedSatellite) {
      if (e.button === 0) {
        handleLeftDoubleClickObject('satellite', selectedSatellite, x, y);
      }
    }
    if (selectedSpacecraft) {
      if (e.button === 0) {
        handleLeftDoubleClickObject('spacecraft', selectedSpacecraft, x, y);
      }
    }
    if (selectedGroundStation) {
      if (e.button === 0) {
        handleLeftDoubleClickObject('groundstation', selectedGroundStation, x, y);
      }
    }
  }

  const handlePick = function (e: MouseEvent) {
    // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
    // the mouse or tap location.
    if (e.ctrlKey) {
      return;
    }
    const x = e.offsetX;
    const y = e.offsetY;

    // De-highlight any previously highlighted placemarks.
    for (let h = 0; h < highlightedItems.length; h++) {
      highlightedItems[h].highlighted = false;
    }
    highlightedItems = [];
    selectedSatellite = undefined;
    selectedSpacecraft = undefined;
    selectedContactLink = undefined;
    selectedGroundStation = undefined;
    selectedLocation = undefined;


    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    const rectRadius = 2;
    const pickPoint = wwd.canvasCoordinates(e.clientX, e.clientY);
    const pickRectangle = new WorldWind.Rectangle(pickPoint[0] - rectRadius,
      pickPoint[1] + rectRadius,
      2 * rectRadius,
      2 * rectRadius);
    let pickList = wwd.pickShapesInRegion(pickRectangle);

    // Highlight the items picked by simply setting their highlight flag to true.
    if (pickList.objects.length > 0) {
      for (let p = 0; p < pickList.objects.length; p++) {
        if (!pickList.objects[p].isTerrain && pickList.objects[p].isOnTop) {
          const o = pickList.objects[p].userObject;
          if ((o.userProperties) && (o.userProperties.type)) {
            if (o.userProperties.type === 'groundstation') {
              if (!selectedGroundStation) {
                // only highlight one ground station at a time.
                if (o.userProperties.info.id !== -1) {
                  o.highlighted = true;
                }
                highlightedItems.push(o);
                selectedGroundStation = {
                  info: o.userProperties.info,
                  object: o.userProperties.object
                };
                if (o.userProperties.highlightRef) {
                  // there is another referenced object to highlight
                  o.userProperties.highlightRef.highlighted = true;
                  highlightedItems.push(o.userProperties.highlightRef);
                }
              }
            }
            if (o.userProperties.type === 'satellite') {
              o.highlighted = true;
              highlightedItems.push(o);
              selectedSatellite = {
                info: o.userProperties.info,
                object: o.userProperties.object
              };
              if (o.userProperties.highlightRef) {
                // there is another referenced object to highlight
                o.userProperties.highlightRef.highlighted = true;
                highlightedItems.push(o.userProperties.highlightRef);
              }

            }
            if (o.userProperties.type === 'spacecraft') {
              o.highlighted = true;
              highlightedItems.push(o);
              selectedSpacecraft = {
                info: o.userProperties.info,
                object: o.userProperties.object
              };
              if (o.userProperties.highlightRef) {
                // there is another referenced object to highlight
                o.userProperties.highlightRef.highlighted = true;
                highlightedItems.push(o.userProperties.highlightRef);
              }
            }
            if (o.userProperties.type === 'contactLink') {
              o.highlighted = true;
              highlightedItems.push(o);
              selectedContactLink = {
                path: o,
                links: o.userProperties.links
              };
              if (o.userProperties.highlightRef) {
                // there is another referenced object to highlight
                o.userProperties.highlightRef.highlighted = true;
                highlightedItems.push(o.userProperties.highlightRef);
              }
            }
          } else {
            o.highlighted = true;
            highlightedItems.push(o);
          }
        }
      }
    }

    if (e.button === 2) {
      pickList = wwd.pickTerrain(wwd.canvasCoordinates(e.clientX, e.clientY));
      if (pickList.objects.length > 0) {
        selectedLocation = pickList.objects[0].position;
      }
    }

    if (selectedSatellite) {
      if (e.button === 0) {
        handleLeftSelectSatellite(selectedSatellite, x, y);
      }
      if (e.button === 2) {
        handleRightSelectSatellite(selectedSatellite, x, y);
      }
    }
    if (selectedSpacecraft) {
      if (e.button === 0) {
        handleLeftSelectSpacecraft(selectedSpacecraft, x, y);
      }
      if (e.button === 2) {
        handleRightSelectSpacecraft(selectedSpacecraft, x, y);
      }
    }
    if (selectedContactLink) {
      if (e.button === 0) {
        handleLeftSelectContactLink(selectedContactLink, x, y);
      }
      if (e.button === 2) {
        handleRightSelectContactLink(selectedContactLink, x, y);
      }
    }
    if (selectedGroundStation) {
      if (e.button === 0) {
        handleLeftSelectGroundStation(selectedGroundStation, x, y);
      }
      else if (e.button === 2) {
        handleRightSelectGroundStation(selectedGroundStation, x, y);
      }
    }
    if (selectedLocation && !selectedSatellite && !selectedGroundStation && !selectedSpacecraft && !selectedContactLink) {
      handleRightSelectLocation(selectedLocation.latitude, selectedLocation.longitude, selectedLocation.altitude, x, y);
    }
    if (!selectedLocation && !selectedSatellite && !selectedGroundStation && !selectedSpacecraft && !selectedContactLink) {
      if (e.button === 2) {
        handleRefreshLocation(x, y);
      } else {
        handleDeselect();
      }
    }

    wwd.redraw();
  };

  const handleWheel = useCallback(() => {
    if (modelReferenceBody === 'EARTH') {
      if (wwd?.navigator?.range < 2280000) {
        esriMapLayer.enabled = true;
      }
      else if (wwd?.navigator?.range >= 2280000) {
        esriMapLayer.enabled = false;
      }
    }

    updateBodyDelta = FAST_UPDATE_BODY_DELTA;
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      updateBodyDelta = DEFAULT_UPDATE_BODY_DELTA;
    }, wheelDoneTimeout);
  }, []);

  // const removeBodyLayers = () => {
  //   bodySingleImageLayer.enabled = false;
  //   bodyLayer.enabled = false;
  // }

  // const addBodyLayers = () => {
  //   bodySingleImageLayer.enabled = true;
  //   bodyLayer.enabled = true;
  // }

  const setReferenceBody = (referenceBody?: string) => {
    if ((referenceBody || 'EARTH') === 'EARTH') {
      globe3D = new WorldWind.Globe(new WorldWind.EarthElevationModel());
      globe2D = new WorldWind.Globe2D();
      earthSingleImageLayer.enabled = true;
      earthLayer.enabled = true;
      moonSingleImageLayer.enabled = false;
      moonLayer.enabled = false;
      marsSingleImageLayer.enabled = false;
      marsLayer.enabled = false;
      defaultNavigatorRange = 20000000;
      defaultNavigatorLookAtLocation = new WorldWind.Location(30, -90);
    }
    if (referenceBody === 'MOON') {
      globe3D = new WorldWind.Globe(new WorldWind.ElevationModel());
      globe2D = new WorldWind.Globe2D();
      globe3D.equatorialRadius = MOON_RADIUS;
      globe3D.polarRadius = MOON_RADIUS;
      globe3D.eccentricitySquared = 0;
      globe2D.equatorialRadius = MOON_RADIUS;
      globe2D.polarRadius = MOON_RADIUS;
      globe2D.eccentricitySquared = 0;
      earthSingleImageLayer.enabled = false;
      earthLayer.enabled = false;
      moonSingleImageLayer.enabled = true;
      moonLayer.enabled = true;
      marsSingleImageLayer.enabled = false;
      marsLayer.enabled = false;
      defaultNavigatorRange = 5000000;
      defaultNavigatorLookAtLocation = new WorldWind.Location(0, 0);
    }
    if (referenceBody === 'MARS') {
      globe3D = new WorldWind.Globe(new WorldWind.ElevationModel());
      globe3D.equatorialRadius = 3396.2 * 1000;
      globe3D.polarRadius = 3376.2 * 1000;
      globe3D.eccentricitySquared = 0;
      earthSingleImageLayer.enabled = false;
      earthLayer.enabled = false;
      moonSingleImageLayer.enabled = false;
      moonLayer.enabled = false;
      marsSingleImageLayer.enabled = true;
      marsLayer.enabled = true;
      defaultNavigatorRange = 10000000;
      defaultNavigatorLookAtLocation = new WorldWind.Location(0, 0);
    }
  }

  const removeDuplicateLayers = (wwd: WorldWind): void => {
    const uniqueLayerNames: string[] = [];
    const filteredLayers: any[] = [];

    for (const layer of wwd.layers) {
      const displayName = layer.displayName; // Use unique property, modify as needed
      if (!uniqueLayerNames.includes(displayName)) {
        uniqueLayerNames.push(displayName);
        filteredLayers.push(layer);
      }
    }
    wwd.layers = filteredLayers;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Create the WorldWindow using the ID of the canvas
      wwd = new WorldWind.WorldWindow(canvasId);
      earthSingleImageLayer = new WorldWind.BMNGOneImageLayer();
      wwd.addLayer(earthSingleImageLayer);
      earthLayer = new WorldWind.BMNGLayer();
      wwd.addLayer(earthLayer);
      moonSingleImageLayer = new MoonLROOneImageLayer();
      moonSingleImageLayer.enabled = false;
      wwd.addLayer(moonSingleImageLayer);
      moonLayer = new MoonLROLayer();
      moonLayer.enabled = false;
      wwd.addLayer(moonLayer);
      marsSingleImageLayer = new MarsMDIM21OneImageLayer();
      marsSingleImageLayer.enabled = false;
      wwd.addLayer(marsSingleImageLayer);
      marsLayer = new MarsMDIM21Layer();
      marsLayer.enabled = false;
      wwd.addLayer(marsLayer);


      modelReferenceBody = model.referenceBody || 'EARTH';
      referenceBody = modelReferenceBody;
      setReferenceBody(modelReferenceBody);
      if (viewMode === MODE_2D) {
        wwd.globe = globe2D;
      } else {
        if (viewMode === MODE_3D) {
          wwd.globe = globe3D;
          if (modelReferenceBody === 'EARTH') {
            useInertialFrame = model.useEarthInertialFrame || false;
          } else {
            useInertialFrame = false;
          }

        }
      }
      currentGlobe = wwd.globe;


      baseLayer = new WorldWind.RenderableLayer("Base");
      providerLayer = new WorldWind.RenderableLayer("Providers");
      userLayer = new WorldWind.RenderableLayer("Users");
      groundUserLayer = new WorldWind.RenderableLayer("Ground Users");

      orbitsLayer = new WorldWind.RenderableLayer("Provider Orbits");
      providerTrajectoriesLayer = new WorldWind.RenderableLayer("Provider Trajectories");
      userOrbitsLayer = new WorldWind.RenderableLayer("User Satellite Orbits");
      userTrajectoriesLayer = new WorldWind.RenderableLayer("User Trajectories");
      conesLayer = new WorldWind.RenderableLayer("Provider Cones");
      groundStationsLayer = new WorldWind.RenderableLayer("Ground Stations");
      groundStationConesLayer = new WorldWind.RenderableLayer("Ground Station Cones");
      linkContactsLayer = new WorldWind.RenderableLayer("Link Contacts");

      conesLayer.pickEnabled = false;
      groundStationConesLayer.pickEnabled = false;

      starfield = new WorldWind.StarFieldLayer();
      atmosphere = new WorldWind.AtmosphereLayer();
      wwd.addLayer(starfield);
      wwd.addLayer(atmosphere);
      wwd.addLayer(baseLayer);
      wwd.addLayer(providerLayer);
      wwd.addLayer(userLayer);
      wwd.addLayer(groundUserLayer);

      wwd.addLayer(orbitsLayer);
      wwd.addLayer(providerTrajectoriesLayer);
      wwd.addLayer(userOrbitsLayer);
      wwd.addLayer(userTrajectoriesLayer);
      wwd.addLayer(conesLayer);
      wwd.addLayer(groundStationConesLayer);
      wwd.addLayer(groundStationsLayer);
      wwd.addLayer(linkContactsLayer);
      await renderEsriMap();
      esriMapLayer.enabled = false;
      await renderEsriLabelMap();

      viewControlsLayer = new ViewControlsLayer(wwd, globe3D, globe2D);
      viewControlsLayer.placement = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 1, WorldWind.OFFSET_FRACTION, 1);
      viewControlsLayer.alignment = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 1, WorldWind.OFFSET_FRACTION, 1);
      viewControlsLayer.mode2DControl.enabled = true;
      viewControlsLayer.mode3DControl.enabled = true;
      wwd.addLayer(viewControlsLayer);
      removeDuplicateLayers(wwd);
      wwd.worldWindowController.addGestureListener({
        onGestureEvent: (event: any) => {
          if (event.type === 'pointerdown') {
            mouseDown = true;
            return false;
          }
          if (event.type === 'pointerup') {
            mouseDown = false;
            return false;
          }
          if (event.type === 'pointermove') {
            if (mouseDown) {
              lastLookAtLongitude = wwd.navigator.lookAtLocation.longitude;
            }
            if (event.ctrlKey && mouseDown) {
              wwd.navigator.tilt += (-(event.movementY / 3));
              wwd.navigator.heading += (event.movementX / 3);
              return true;
            }
          }
        }
      });

      wwd.deepPicking = true;
      wwd.addEventListener("dblclick", handleDoubleclick);
      wwd.addEventListener("mousedown", handlePick);
      wwd.addEventListener("mousemove", handleHover);
      // wwd.addEventListener("wheel", handleWheel);
      simulationTime = startTime;
      // setIntervals();

      setInitialState(true);

    }
    fetchData();
  }, []);

  useEffect(() => {
    if (initialState) {
      modelReferenceBody = model.referenceBody || 'EARTH';
      init();
    }
  }, [model, initialState]);

  useEffect(() => {
    if (initialState && initState) {
      if (modelReferenceBody == 'EARTH' && showEnhancedTimeline) {
        esriLabelLayer.enabled = true;
        atmosphere.enabled = true;
        esriMapLayer.enabled = false;
        wwd.addEventListener("wheel", handleWheel);
      }
      else {
        esriLabelLayer.enabled = false;
        atmosphere.enabled = false;
        esriMapLayer.enabled = false;
        wwd.removeEventListener("wheel", handleWheel);
      }

      const newLayerManagerData = [...layerManagerData];
      const Esri_children = [
        { displayName: "Esri Label", status: esriLabelLayer.enabled },
        { displayName: "Atmosphere", status: atmosphere.enabled }
      ]
      newLayerManagerData[7].children = Esri_children;
      setLayerManagerData(newLayerManagerData);
    }
  }, [showEnhancedTimeline, modelReferenceBody, initialState, initState]);

  useEffect(() => {
    if (doAnimate && initState && initialState) {
      animate();
      setDoAnimate(false);
    }

  }, [doAnimate, initState, initialState]);

  useEffect(() => {
    if (timeAnimate && doAnimate === false)
      setTimeout(() => {
        setDoAnimate(true);
      }, simulationTickAmount);

  }, [doAnimate, timeAnimate]);

  useEffect(() => {
    if (initialState && initState) {
      const Esri_children = layerManagerData[7]?.children;
      const label_status = Esri_children[0]?.status;
      const atmosphere_status = Esri_children[1]?.status;
      esriLabelLayer.enabled = label_status;
      atmosphere.enabled = atmosphere_status;
      updateSatelliteRenderable();
      updateGroundStationRenderable();
      updateTotalLinksRenderable();
    }
  }, [initialState, initState, layerManagerData]);

  useEffect(() => {
    if (groundStationSelection) {
      setSatelliteSelection(undefined);
      setSpacecraftSelection(undefined);
      setContactLinkSelection(undefined);
      setLocationSelection(undefined);
      setClickLocation(undefined);
    }
  }, [groundStationSelection]);

  useEffect(() => {
    if (satelliteSelection) {
      setSpacecraftSelection(undefined);
      setContactLinkSelection(undefined);
      setGroundStationSelection(undefined);
      setLocationSelection(undefined);
      setClickLocation(undefined);
    }
  }, [satelliteSelection]);

  useEffect(() => {
    if (spacecraftSelection) {
      setSatelliteSelection(undefined);
      setGroundStationSelection(undefined);
      setContactLinkSelection(undefined);
      setLocationSelection(undefined);
      setClickLocation(undefined);
    }
  }, [spacecraftSelection]);

  useEffect(() => {
    if (contactLinkSelection) {
      setSatelliteSelection(undefined);
      setGroundStationSelection(undefined);
      setLocationSelection(undefined);
      setClickLocation(undefined);
    }
  }, [contactLinkSelection]);

  useEffect(() => {
    if (locationSelection) {
      setGroundStationSelection(undefined);
      setSatelliteSelection(undefined);
      setSpacecraftSelection(undefined);
      setContactLinkSelection(undefined);
      setClickLocation(undefined);
    }
  }, [locationSelection]);

  useEffect(() => {
    if (clickLocation) {
      setGroundStationSelection(undefined);
      setSatelliteSelection(undefined);
      setSpacecraftSelection(undefined);
      setContactLinkSelection(undefined);
      setLocationSelection(undefined);
    }
  }, [clickLocation]);

  useEffect(() => {
    if (rfUpdateStatus === true)
      updateRfSlider()
  }, [rfUpdateStatus]);


  function fetchSimulationData(simulationName: string) {
    let apiURL = model.apiURL || '';
    if (!apiURL.endsWith('/')) {
      apiURL = apiURL + '/'
    }
    const url = `${apiURL}get-simulation-data?simulationName=${simulationName}`;
    return fetch(url);
  }

  function updateViewMode() {
    if (wwd.globe.is2D()) {
      viewMode = MODE_2D;
    } else {
      viewMode = MODE_3D;
    }

    if (viewMode === MODE_3D) {
      wwd.navigator.range = defaultNavigatorRange;
      wwd.navigator.lookAtLocation = defaultNavigatorLookAtLocation;
      lastLookAtLongitude = wwd.navigator.lookAtLocation.longitude;
      newLookAtLongitude = lastLookAtLongitude;
    }
    if (viewMode === MODE_2D) {
      wwd.navigator.range = 50000000; // zoom out
      wwd.navigator.lookAtLocation = new WorldWind.Location(0, defaultNavigatorLookAtLocation.longitude);
      wwd.navigator.tilt = 0;
      wwd.navigator.heading = 0;
    }
  }

  function updateSatellitePositions() {
    // check to see if the simulation time differs from the last update time by more than the delta
    if ((!forceUpdate) && ((Math.abs(simulationTime - lastSatellitePositionUpdate)) < updateSatellitePositionDelta)) {
      // if not, return
      return;
    }
    lastSatellitePositionUpdate = simulationTime;
    let fetchingDataCount = 0;
    userSpacecraft.forEach(s => {
      s.updatePosition(simulationTime, referenceBody, false);
      if ((viewMode === MODE_2D) && (s.placemarkPosition)) {
        s.placemarkPosition.altitude = SURFACE_ALTITUDE;
      }
      if (s.fetchingData) {
        fetchingDataCount++;
      }
    });
    providerSpacecraft.forEach(s => {
      s.updatePosition(simulationTime, referenceBody, false);
      if ((viewMode === MODE_2D) && (s.placemarkPosition)) {
        s.placemarkPosition.altitude = SURFACE_ALTITUDE;
      }
      if (s.fetchingData) {
        fetchingDataCount++;
      }
    });
    if (fetchingDataCount > 0) {
      setFetchingData(true);
      lastSatellitePositionUpdate = simulationTime - updateSatellitePositionDelta;
    } else {
      if (fetchingData) {
        forceUpdate = true;
        setFetchingData(false);
      }
    }
  }

  function updateFovCones() {
    // check to see if the simulation time differs from the last update time by more than the delta
    if ((!forceUpdate) && ((Math.abs(simulationTime - lastConePositionUpdate)) < updateConePositionDelta)) {
      // if not, return
      return;
    }
    lastConePositionUpdate = simulationTime;

    providerSpacecraft.forEach(s => {
      if ((s instanceof Satellite) && s.fovConeMesh) {
        let sphereRadius, altitudeAboveSphere;
        if (configuration.viewOptions.projectOntoUSAT && configuration.usat.show !== false && userSpacecraft.length > 0) {
          let maxUserAltitude = 0;
          for (let u = 0; u < userSpacecraft.length; u++) {
            if (userSpacecraft[u].position && userSpacecraft[u].position.altitude > maxUserAltitude) {
              const a = userSpacecraft[u].position.altitude;
              if (a < s.position.altitude) {
                maxUserAltitude = a;
              }
            }
          }
          sphereRadius = bodyRadius.get(referenceBody)! + maxUserAltitude;
          altitudeAboveSphere = s.position.altitude - maxUserAltitude;
        } else {
          sphereRadius = bodyRadius.get(referenceBody)!;
          altitudeAboveSphere = s.position.altitude;
        }
        if (altitudeAboveSphere < 0) {
          altitudeAboveSphere = 0;
        }
        const coneParameters = calculateDownwardConeProjectionRadius(sphereRadius, altitudeAboveSphere, s.fov);
        if (coneParameters) {
          s.fovConeRadiusArc = coneParameters.arc;
          s.fovConeBaseAltitude = coneParameters.sphereRadius - bodyRadius.get(referenceBody)!;
          const meshData = calculateConeMesh(s.position, s.fovConeRadiusArc, s.fovConeBaseAltitude, false);
          s.fovConeMesh.positions = meshData.positions;
        }
      }
    });
  }

  function updateGroundStationCones() {
    if ((!forceUpdate) && ((Math.abs(simulationTime - lastGroundStationConeUpdate)) < updateGroundStationConeDelta)) {
      // if not, return
      return;
    }
    lastGroundStationConeUpdate = simulationTime;
    if (!model.groundStations) {
      return;
    }
    let altitude = 0;
    if (otherBody && otherBody.position && (viewMode === MODE_2D)) {
      altitude = otherBody.position.altitude;
    } else {
      if (model.userSatellites) {
        let maxUserAltitude = 0;
        for (let u = 0; u < userSpacecraft.length; u++) {
          if (userSpacecraft[u].position && userSpacecraft[u].position.altitude > maxUserAltitude) {
            const a = userSpacecraft[u].position.altitude;
            if (((userSpacecraft[u].referenceBody === referenceBody) && (a <= maxGroundStationConeHeight)) || (viewMode === MODE_2D)) {
              // Only extend ground station cones to another body if in 2D mode.
              // Limit height of cones to a maximum height.
              maxUserAltitude = a;
            }
          }
        }
        altitude = maxUserAltitude;
      } else {
        if (model.constellations) {
          altitude = model.constellations[0].shells[0].altitude * 1000;
        }
      }
    }

    if (!altitude) {
      // Data is still being fetched. Effectively force update to happen 1s from now
      // by setting last update time to a time that will cause an update in 1s.
      lastGroundStationConeUpdate = simulationTime - updateGroundStationConeDelta - 1000;
    }

    groundStations.forEach(gs => {
      if (!positionUndefined(gs.position) && gs.coneMesh) {
        const coneRadius = calculateUpwardConeProjectionRadius(altitude, gs.minElevationAngle);
        if (coneRadius) {
          const meshData = calculateConeMesh(gs.position, coneRadius as number, altitude, false);
          gs.coneMesh.positions = meshData.positions;
        }
      }
    });
  }

  function updateOrbits() {
    // check to see if the simulation time differs from the last update time by more than the delta
    if ((!forceUpdate) && ((Math.abs(simulationTime - lastOrbitUpdate)) < updateOrbitDelta)) {
      // if not, return
      return;
    }
    lastOrbitUpdate = simulationTime;
    providerSpacecraft.forEach(s => {
      if (s instanceof Satellite) {
        createOrbit(s, orbitsLayer);
      } else {
        if (s instanceof Spacecraft) {
          createTrajectory(s, providerTrajectoriesLayer);
        }
      }
    });
    userSpacecraft.forEach(s => {
      if (s instanceof Satellite) {
        createOrbit(s, userOrbitsLayer);
      } else {
        if (s instanceof Spacecraft) {
          createTrajectory(s, userTrajectoriesLayer);
        }
      }
    });
  }

  function updateGroundStations() {
    if (!model.groundStations) {
      return;
    }
    if (viewModeUpdated) {
      groundStationsLayer.removeAllRenderables();
      groundStationConesLayer.removeAllRenderables();
      groundStations = [];
      createGroundStations();
      createUserGroundStations();
    }
    groundStations.forEach(gs => {
      const updated = gs.updatePosition(simulationTime, referenceBody);
      if (!updated && (gs.referenceBody !== referenceBody)) {
        // The ground station is on the other body.
        if (otherBody) {
          gs.position.latitude = otherBody.position.latitude;
          gs.position.longitude = otherBody.position.longitude;
          gs.position.altitude = otherBody.position.altitude;
        }
      }
    });

  }

  function updateOtherBody() {
    if (!otherBody) {
      return;
    }
    // check to see if the simulation time differs from the last update time by more than the delta
    if ((!forceUpdate) && ((Math.abs(simulationTime - lastBodyUpdate)) < updateBodyDelta)) {
      // if not, return
      return;
    }
    lastBodyUpdate = simulationTime;
    otherBody.updatePosition(simulationTime, false);
    const lookAtLocation: WorldWind.Location = wwd.navigator.lookAtLocation;
    const range: number = wwd.navigator.range;
    const eyeVector: WorldWind.Vec3 = new WorldWind.Vec3();
    globe3D.computePointFromPosition(lookAtLocation.latitude, lookAtLocation.longitude, range, eyeVector);

    if (otherBody.position.latitude) {
      const bodyVector = new WorldWind.Vec3();
      globe3D.computePointFromPosition(otherBody.position.latitude, otherBody.position.longitude, otherBody.position.altitude, bodyVector);

      const vectorToBody = bodyVector.subtract(eyeVector);
      const distanceToBody = vectorToBody.magnitude();
      const pixelSize = wwd.pixelSizeAtDistance(distanceToBody);
      const imageWidth = (bodyRadius.get(otherBody.name)! * 2) / pixelSize;
      const scale = imageWidth / 100;
      otherBody.renderable.attributes.imageScale = scale;
    }
  }

  function positionUndefined(position: WorldWind.Position) {
    return (position.latitude === undefined) && (position.longitude === undefined);
  }

  function updateLinkContacts() {

    if (viewModeUpdated) {
      const allPaths: WorldWind.Path[] = linkContactsLayer.renderables;
      // Disable all renderables on the layer.
      for (let p = 0; p < allPaths.length; p++) {
        const path: WorldWind.Path = allPaths[p];
        path.enabled = false;
        path.userProperties.links = [];
      }
    }
    if (viewMode === MODE_2D) {
      return;
    }
    if ((!forceUpdate) && ((Math.abs(simulationTime - lastLinkContactsUpdate)) < updateLinkContactsDelta)) {
      // if not, return
      return;
    }
    lastLinkContactsUpdate = simulationTime;

    // First, disable all the path renderables.
    const allPaths: WorldWind.Path[] = linkContactsLayer.renderables;

    if (contactIntervals) {
      // Disable all renderables on the layer.
      for (let p = 0; p < allPaths.length; p++) {
        const path: WorldWind.Path = allPaths[p];
        path.enabled = false;
        path.userProperties.links = [];
      }

      const activeLinks = contactIntervals.search([simulationTime, simulationTime], (link: Link, interval) => {
        link.activeInterval = [interval.low, interval.high];
        return link;
      });
      for (let l = 0; l < activeLinks.length; l++) {
        const link = activeLinks[l];
        if ((positionUndefined(link.sourceObject?.position)) || (positionUndefined(link.destinationObject?.position))) {
          continue;
        }
        if (link.path) {
          // Note that this will update the positions in the path multiple times if more than one
          // link are represented by this path renderable. The order of the two positions may be
          // reversed, but that is ok.
          link.path.positions = [link.sourceObject?.position, link.destinationObject?.position];
          link.path.userProperties.links.push(link);
          link.path.enabled = true;
        }
      }
      for (let l = 0; l < activeLinks.length; l++) {
        const link: Link = activeLinks[l];
        if ((positionUndefined(link.sourceObject?.position)) || (positionUndefined(link.destinationObject?.position))) {
          continue;
        }
        if (!link.path) {
          // Determine if there already exists a path renderable with the same position needed
          // to render this link. The direction of the link doesn't matter, so check the path
          // positions in both directions.
          for (let p = 0; p < linkContactsLayer.renderables.length; p++) {
            const path: WorldWind.Path = linkContactsLayer.renderables[p];
            if (((path.positions[0].equals(link.sourceObject?.position)) && (path.positions[1].equals(link.destinationObject?.position))) ||
              ((path.positions[1].equals(link.sourceObject?.position)) && (path.positions[0].equals(link.destinationObject?.position)))) {
              link.path = path;
              // add the link to the path's list of user data objects.
              link.path.userProperties.links.push(link);
              link.path.enabled = true;
            }
          }

          if (!link.path) {
            // No path was found that has the same positions, so create a new one.
            link.path = createLinkContactRenderable(link);
            // add the link to the path's list of user data objects.
            link.path.userProperties.links.push(link);
            link.path.enabled = true;
          }
        }
      }
    }
    if (interferenceContactIntervals) {
      const activeInterferenceLinks = interferenceContactIntervals.search([simulationTime, simulationTime], (link: Link, interval) => {
        link.activeInterval = [interval.low, interval.high];
        return link;
      });
      for (let l = 0; l < activeInterferenceLinks.length; l++) {
        const link = activeInterferenceLinks[l];
        if ((positionUndefined(link.sourceObject?.position)) || (positionUndefined(link.destinationObject?.position))) {
          continue;
        }
        if (link.path) {
          // Note that this will update the positions in the path multiple times if more than one
          // link are represented by this path renderable. The order of the two positions may be
          // reversed, but that is ok.
          link.path.positions = [link.sourceObject?.position, link.destinationObject?.position];
          link.path.userProperties.links.push(link);
          link.path.enabled = true;
        }
      }
      for (let l = 0; l < activeInterferenceLinks.length; l++) {
        const link: Link = activeInterferenceLinks[l];
        if ((positionUndefined(link.sourceObject?.position)) || (positionUndefined(link.destinationObject?.position))) {
          continue;
        }
        if (!link.path) {
          // Determine if there already exists a path renderable with the same position needed
          // to render this link. The direction of the link doesn't matter, so check the path
          // positions in both directions.
          for (let p = 0; p < linkContactsLayer.renderables.length; p++) {
            const path: WorldWind.Path = linkContactsLayer.renderables[p];
            if (((path.positions[0].equals(link.sourceObject?.position)) && (path.positions[1].equals(link.destinationObject?.position))) ||
              ((path.positions[1].equals(link.sourceObject?.position)) && (path.positions[0].equals(link.destinationObject?.position)))) {
              link.path = path;
              // add the link to the path's list of user data objects.
              link.path.userProperties.links.push(link);
              link.path.enabled = true;
            }
          }

          if (!link.path) {
            // No path was found that has the same positions, so create a new one.
            link.path = createInterferenceLinkContactRenderable(link);
            // add the link to the path's list of user data objects.
            link.path.userProperties.links.push(link);
            link.path.enabled = true;
          }
        }
      }
    }

    if (!interferenceContactIntervals && !contactIntervals) {
      return;
    }

    if (selectedContactLink) {
      for (let p = 0; p < allPaths.length; p++) {
        const path: WorldWind.Path = allPaths[p];
        if (selectedContactLink.path === path) {
          selectedContactLink.links = path.userProperties.links;
          setContactLinkSelection({ simulationTime: simulationTime, links: path.userProperties.links, x: contactLinkSelection?.x as number, y: contactLinkSelection?.y as number });
        }
      }
    }



  }

  function debugOutput() {
    //console.log(wwd.navigator.lookAtLocation);
    //console.log(wwd.navigator.range);
  }

  function updateTimeSlider() {
    const t = ((simulationTime - startTime) / 1000);
  }

  function setIntervals() {
    animateInterval = setInterval(() => {
      setDoAnimate(true);
    }, simulationTickAmount);
    updateClockInterval = setInterval(function () {
      const timeString = dateToLocalTimeString(simulationTime);
      //console.log(timeString);
    }, 100);
    updateSliderInterval = setInterval(updateTimeSlider, 100);
    debugOutputInterval = setInterval(debugOutput, 1000);
  }

  function clearIntervals() {
    clearInterval(animateInterval);
    clearInterval(updateClockInterval);
    clearInterval(updateSliderInterval);
    clearInterval(debugOutputInterval);
  }

  function updateSatelliteRenderable() {
    providerLayer.removeAllRenderables();
    userLayer.removeAllRenderables();
    conesLayer.removeAllRenderables();
    orbitsLayer.removeAllRenderables();
    userOrbitsLayer.removeAllRenderables();
    providerTrajectoriesLayer.removeAllRenderables();
    userTrajectoriesLayer.removeAllRenderables();

    let allSatellites: any[] = [];
    allSatellites = allSatellites.concat(userSpacecraft).concat(providerSpacecraft);

    allSatellites.map(s => {
      if (s.renderable.userProperties.type === "satellite") {
        const result = findChildByDisplayName(layerManagerData, s.name);
        if (result && s.type === "user_satellite") {
          userLayer.addRenderable(s.renderable);
          userOrbitsLayer.addRenderable(s.orbitPath);
        }

        else if (result && (s.type === "geo_satellite" || s.type === "constellation" || s.type === "satellite")) {
          providerLayer.addRenderable(s.renderable);
          conesLayer.addRenderable(s?.fovConeMesh);
          orbitsLayer.addRenderable(s.orbitPath);
        }
      }
      else {
        const result = findChildByDisplayName(layerManagerData, s.name);
        if (result && s.type === "user_satellite") {
          userLayer.addRenderable(s.renderable);
          userTrajectoriesLayer.addRenderable(s.orbitPath);
        }

        else if (result && s.type === "satellite") {
          providerLayer.addRenderable(s.renderable);
          providerTrajectoriesLayer.addRenderable(s.orbitPath);
        }

      }
    })
  }

  function updateGroundStationRenderable() {
    // Remove all existing renderables from the layers
    groundStationsLayer.removeAllRenderables();
    groundStationConesLayer.removeAllRenderables();

    // Iterate over each ground station
    groundStations.forEach(gs => {
      const result = findChildByDisplayName(layerManagerData, gs.name);

      if (result) {
        // Check if gs.renderable is valid before adding it to the layer
        if (gs.renderable) {
          groundStationsLayer?.addRenderable(gs.renderable);
        } else {
          console.error('Renderable is null or undefined for ground station:', gs.name);
        }
        // Check if gs.coneMesh is valid before adding it to the layer
        if (gs.coneMesh) {
          groundStationConesLayer?.addRenderable(gs.coneMesh);
        } else {
          console.error('Cone mesh is null or undefined for ground station:', gs.name);
        }
      }
    });
  }

  function updateTotalLinksRenderable() {
    linkContactsLayer.removeAllRenderables();
    let allWindows_contact: Window[] = [];
    contactList.forEach(list => {
      const displayName = list.source + " - " + list.destination;
      const result = findChildByDisplayName(layerManagerData, displayName);
      if (result && Array.isArray(list.windows)) {
        if (list.windows.every(isValidWindow)) {
          allWindows_contact = allWindows_contact.concat(list.windows);
        } else if (isValidWindow(list.windows)) {
          allWindows_contact.push(list.windows);
        } else {
          console.error('Invalid window format:', list.windows);
        }
      }
    });
    const reducedContactPoints = mergeIntervals(allWindows_contact);
    setContactTimeline(reducedContactPoints);
    let allWindows_inteference: Window[] = [];
    interferenceContactList.forEach(list => {
      const displayName = list.source + " - " + list.destination;
      const result = findChildByDisplayName(layerManagerData, displayName);
      if (result && Array.isArray(list.windows)) {
        if (list.windows.every(isValidWindow)) {
          allWindows_inteference = allWindows_inteference.concat(list.windows);
        } else if (isValidWindow(list.windows)) {
          allWindows_inteference.push(list.windows);
        } else {
          console.error('Invalid window format:', list.windows);
        }
      }
    });
    const reducedInterferenceContactPoints = mergeIntervals(allWindows_inteference);
    setInterferenceTimeline(reducedInterferenceContactPoints);
    contactLines.map(contact => {
      const displayName = contact.source + " - " + contact.destination;
      const result = findChildByDisplayName(layerManagerData, displayName);
      if (result)
        linkContactsLayer.addRenderable(contact.renderable);
    });
    interferenceContactLines.map(interference => {
      const displayName = interference.source + " - " + interference.destination;
      const result = findChildByDisplayName(layerManagerData, displayName);
      if (result)
        linkContactsLayer.addRenderable(interference.renderable);
    });
  }

  function updateRfSlider() {

    const newLayerManagerData = [...layerManagerData];

    // Filter rfData and create newRfData
    const newRfData = rfData.filter((child: LayerRow) => {
      if (child.i_n === undefined) {
        return false;
      }
      return child.i_n === null || (child.i_n >= rfSlider[0] && child.i_n <= rfSlider[1]);
    });

    // Initialize sourceNames and destinationNames arrays
    const sourceNames: string[] = [];
    const destinationNames: string[] = [];

    // Populate sourceNames and destinationNames
    newRfData.forEach(item => {
      const [source, destination] = item.displayName.split(" - ");
      if (!sourceNames.includes(source)) {
        sourceNames.push(source);
      }
      if (!destinationNames.includes(destination)) {
        destinationNames.push(destination);
      }
    });

    // Function to update children status and parent status
    const updateStatus = (index: number, nameList: string[]) => {
      let allChildrenTrue = true;

      newLayerManagerData[index].children.forEach((child: LayerRow) => {
        if (nameList.includes(child.displayName)) {
          child.status = true;
        } else {
          child.status = false;
          allChildrenTrue = false;
        }
      });

      // Set parent status based on children status
      newLayerManagerData[index].parent.status = allChildrenTrue;
    };

    // Update status for source-related and destination-related indices
    updateStatus(0, sourceNames);
    updateStatus(1, sourceNames);
    updateStatus(3, destinationNames);
    updateStatus(4, destinationNames);

    newLayerManagerData[6].children = newRfData;
    newLayerManagerData[6].parent.status = true;

    setLayerManagerData(newLayerManagerData);
    setRfUpdateStatus(false);

  }

  function createEsriMapLayer(xmlDom: any, layerIdentifier: string) {
    const wmtsCapabilities = new WorldWind.WmtsCapabilities(xmlDom);
    const wmtsLayerCapabilities = wmtsCapabilities.getLayer(layerIdentifier);
    const wmtsConfig = WorldWind.WmtsLayer.formLayerConfiguration(wmtsLayerCapabilities);
    esriMapLayer = new WorldWind.WmtsLayer(wmtsConfig);
    wwd.addLayer(esriMapLayer);
  }

  function createEsriLabelLayer(xmlDom: any, layerIdentifier: string) {
    const wmtsCapabilities = new WorldWind.WmtsCapabilities(xmlDom);
    const wmtsLayerCapabilities = wmtsCapabilities.getLayer(layerIdentifier);
    const wmtsConfig = WorldWind.WmtsLayer.formLayerConfiguration(wmtsLayerCapabilities);
    esriLabelLayer = new WorldWind.WmtsLayer(wmtsConfig);
    wwd.addLayer(esriLabelLayer);
  }

  function logError(error: any) {
    console.log("There was a failure retrieving the capabilities document: " + error);
  }

  function renderEsriMap() {
    const renderEsriMapValue = fetch(imageryServiceAddress)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.text();
      })
      .then(str => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(str, "application/xml");
          createEsriMapLayer(xmlDoc, imageryLayerIdentifier);
        } catch (error) {
          logError(error);
        }
      })
      .catch(error => {
        logError(error);
      });
    return renderEsriMapValue;
  }

  function renderEsriLabelMap() {
    const renderEsriLabelValue = fetch(labelsServiceAddress)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.text();
      })
      .then(str => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(str, "application/xml");
          createEsriLabelLayer(xmlDoc, labelsLayerIdentifier);
        } catch (error) {
          logError(error);
        }
      })
      .catch(error => {
        logError(error);
      });
    return renderEsriLabelValue;
  }

  function animate() {
    setSimulationTime(simulationTime + (simulationTickAmount * (timeScale * timeDirection)));
    setTimelineTime(simulationTime);
    if (wwd.globe !== currentGlobe) {
      // user toggled between 2D and 3D. Force update.
      currentGlobe = wwd.globe;
      updateViewMode();
      forceUpdate = true;
      viewModeUpdated = true;
    }
    if (!modelIsDecayed) {
      try {
        updateSatellitePositions();
        updateOtherBody();
        updateGroundStations();
        updateLinkContacts();
        updateFovCones();
        updateOrbits();
        updateGroundStationCones();

      } catch (e) {
        console.log(e);
        setModelIsDecayed(true);
      }
      forceUpdate = false;
      viewModeUpdated = false;
      if (useInertialFrame) {
        wwd.navigator.lookAtLocation.longitude = lastLookAtLongitude;
      }
      if (modelReferenceBody === 'EARTH') {
        starfield.time = new Date(simulationTime);
        atmosphere.time = new Date(simulationTime);
      }
      if (modelReferenceBody === 'MOON') {
        // Set the date of the starfield such that it's relative to the moon's rate of rotation, not Earth's.
        // the atmosphere effect and the night side of the Earth.
        // Do this by calculating a date that has moved forward at a ration of 1/27.3 that of Earth because it takes
        // 27.3 Earth days for the moon to rotate once relative to the stars.
        const pseudoLunarSimulationTime = startTime + ((simulationTime - startTime) / DAYS_PER_MOON_ROTATION);
        starfield.time = new Date(pseudoLunarSimulationTime);
        atmosphere.time = new Date(pseudoLunarSimulationTime);
      }
      wwd.redraw();
    }
  }

  const timelineSliderChange = useCallback((newValue: number, committed: boolean) => {
    if (!committed) {
      timelineMouseDown = true;
    } else {
      timelineMouseDown = false;
    }
    if (timeAnimate || timelineMouseDown)
      setTimeAnimate(true);
    else
      setTimeAnimate(false);
    const month = (new Date(newValue)).getMonth() + 1;
    const day = (new Date(newValue)).getDate();

    setSimulationTime(newValue as number);
    fetchDataIfNeeded = committed;
    forceUpdate = committed;
    timeScale = 1;
    setTimelineDragged(prev => prev + 1); // increment dragged flag to force controls to react to it
  }, [timelineMouseDown]);

  const rangeSliderChange = useCallback((newValue: number[], committed: boolean) => {
    let min = newValue[0];
    let max = newValue[1];
    if (min < startTime) {
      min = startTime;
    }
    if (max > (startTime + simulationDuration)) {
      max = startTime + simulationDuration;
    }
    if (simulationTime < min) {
      fetchDataIfNeeded = committed;
      forceUpdate = committed;
      setSimulationTime(min);
      setTimelineTime(simulationTime);
    }
    if (simulationTime > max) {
      fetchDataIfNeeded = committed;
      forceUpdate = committed;
      setSimulationTime(max);
      setTimelineTime(simulationTime);
    }
    setTimelineRange([min, max]);
  }, [startTime, simulationDuration]);

  const timelineControlsChange = (newRealtime: boolean, newTimeDirection: number, newTimeScale: number) => {
    // if (newRealtime) {
    //     setSimulationTime(Date.now());
    //     setTimelineTime(simulationTime);
    // }
    timeDirection = newTimeDirection;
    timeScale = newTimeScale;
  }

  const handleLeftSelectSatellite = (selection: SatelliteSelectionData, x: number, y: number) => {
    if (selection.info.parentId && model.constellations) {
      setSatelliteSelection({ satelliteInfo: selection.info, satellite: selection.object, constellation: selection.info.parent, x: x, y: y });
    } else {
      setSatelliteSelection({ satelliteInfo: selection.info, satellite: selection.object, x: x, y: y });
    }
    setSelectionMode(SelectionMode.LEFT);
  }

  const handleRightSelectSatellite = (selection: SatelliteSelectionData, x: number, y: number) => {
    setSatelliteSelection({ satelliteInfo: selection.info, satellite: selection.object, x: x, y: y });
    setSelectionMode(SelectionMode.RIGHT);
  }

  const handleLeftSelectSpacecraft = (selection: SpacecraftSelectionData, x: number, y: number) => {
    setSpacecraftSelection({ spacecraftInfo: selection.info, spacecraft: selection.object, x: x, y: y });
    setSelectionMode(SelectionMode.LEFT);
  }

  const handleRightSelectSpacecraft = (selection: SpacecraftSelectionData, x: number, y: number) => {
    setSpacecraftSelection({ spacecraftInfo: selection.info, spacecraft: selection.object, x: x, y: y });
    setSelectionMode(SelectionMode.RIGHT);
  }

  const handleLeftSelectContactLink = (selection: ContactLinkSelectionData, x: number, y: number) => {
    setContactLinkSelection({ simulationTime: simulationTime, links: selection.links, x: x, y: y });
    setSelectionMode(SelectionMode.LEFT);
  }

  const handleRightSelectContactLink = (selection: ContactLinkSelectionData, x: number, y: number) => {
    setContactLinkSelection({ simulationTime: simulationTime, links: selection.links, x: x, y: y });
    setSelectionMode(SelectionMode.RIGHT);
  }

  const handleLeftSelectGroundStation = (selection: GroundStationSelectionData, x: number, y: number) => {
    setGroundStationSelection({ groundStationInfo: selection.info, groundStation: selection.object, x: x, y: y });
    setSelectionMode(SelectionMode.LEFT);
  }

  const handleRightSelectGroundStation = (selection: GroundStationSelectionData, x: number, y: number) => {
    setGroundStationSelection({ groundStationInfo: selection.info, groundStation: selection.object, x: x, y: y });
    setSelectionMode(SelectionMode.RIGHT);
  }

  const handleLeftDoubleClickObject = (objectType: string, selection: SatelliteSelectionData | SpacecraftSelectionData | GroundStationSelectionData | ContactLinkSelectionData, clientX: number, clientY: number) => {
    setSelectionMode(SelectionMode.DOUBLE_LEFT);
  }

  const handleHoverGroundStation = (selection: GroundStationSelectionData, x: number, y: number) => {
    setGroundStationSelection({ groundStationInfo: selection.info, groundStation: selection.object, x: x, y: y });
    setSelectionMode(SelectionMode.HOVER);
  }

  const handleHoverSatellite = (selection: SatelliteSelectionData, x: number, y: number) => {
    if (selection.info.parentId && model.constellations) {
      setSatelliteSelection({ satelliteInfo: selection.info, satellite: selection.object, constellation: selection.info.parent, x: x, y: y });
    } else {
      setSatelliteSelection({ satelliteInfo: selection.info, satellite: selection.object, x: x, y: y });
    }
    setSelectionMode(SelectionMode.HOVER);
  }

  const handleHoverSpacecraft = (selection: SpacecraftSelectionData, x: number, y: number) => {
    setSpacecraftSelection({ spacecraftInfo: selection.info, spacecraft: selection.object, x: x, y: y });
    setSelectionMode(SelectionMode.HOVER);
  }

  const cancelHoverObject = (clientX: number, clientY: number) => {
    setGroundStationSelection(undefined);
    setSatelliteSelection(undefined);
    setSpacecraftSelection(undefined);
    setSelectionMode(SelectionMode.NONE);
  }

  const handleRightSelectLocation = (latitude: number, longitude: number, altitude: number, x: number, y: number) => {
    setLocationSelection({ latitude: latitude, longitude: longitude, altitude: altitude, x: x, y: y });
    setSelectionMode(SelectionMode.RIGHT);
  }

  const handleRefreshLocation = (x: number, y: number) => {
    setClickLocation({ x: x, y: y });
    setSelectionMode(SelectionMode.RIGHT);
  }

  const handleDeselect = () => {
    setSelectionMode(SelectionMode.NONE);
    selectedSatellite = undefined;
    selectedSpacecraft = undefined;
    selectedContactLink = undefined;
    selectedGroundStation = undefined;
    selectedLocation = undefined;
    setGroundStationSelection(undefined);
    setSatelliteSelection(undefined);
    setSpacecraftSelection(undefined);
    setContactLinkSelection(undefined);
    setLocationSelection(undefined);
    setShowRefBodyMenu(false);
  }

  const handleBodyToggle = () => {
    setShowRefBodyMenu(!showRefBodyMenu);
    setSelectionMode(SelectionMode.NONE);
  }

  const updateLayerManagerData = (updateData: LayerManagerData) => {
    setLayerManagerData(updateData);
  }

  const updateOpen = (updateOpen: LayerManagerState) => {
    setOpen(updateOpen)
  }

  const rfSliderChange = (updateSlider: number[], committed: boolean) => {
    setRfSlider(updateSlider);
    if (committed === true)
      setRfUpdateStatus(true);
  }
  const handleTabButton = (value: string) => {
    setTabButton(value);
  };
  const handleToggleLayerManager = (status: boolean) => {
    setToggleLayerManager(status);
  }
  const handleCloseLayer = () => {
    handleToggleLayerManager(false);
  }
  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  }
  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };
  const handleDrag = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
  };
  const changeAnimate = (status: boolean) => {
    setTimeAnimate(status);
  }
  const layerManagerElement = useMemo(() => {
    if (!layerManagerData) return null;

    return (
      <div>
        <div className={classes.layerTitle}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} style={{ paddingBottom: 0 }}>
            <Typography variant="h6" fontStyle="italic">
              Layer Manager
            </Typography>
            <Close onClick={handleCloseLayer} />
          </Stack>
          <Divider />
          <Stack direction="row" spacing={1}>
            <Button variant='contained'
              onClick={() => handleTabButton("platforms")}
              style={{ border: tabButton === "platforms" ? '1px solid #000' : '0' }}>Platforms</Button>
            <Button variant='contained'
              onClick={() => handleTabButton("rfLinks")}
              style={{ border: tabButton === "rfLinks" ? '1px solid #000' : '0' }}>RF Links</Button>
            <Button variant='contained'
              onClick={() => handleTabButton("esri")}
              style={{ border: tabButton === "esri" ? '1px solid #000' : '0' }}>ESRI Map</Button>
          </Stack>
        </div>
        <LayerManager
          className={classes.layerManager}
          data={layerManagerData}
          updateData={updateLayerManagerData}
          parentOpen={open}
          updateParentOpen={updateOpen}
          activeTab={tabButton}
        />
      </div>
    );
  }, [layerManagerData, classes.layerManager, tabButton]);

  const rangeSliderElement = useMemo(() => {
    return (
      <RangeSlider
        className={showEnhancedTimeline ? classes.rangeSliderNew : classes.rangeSliderOld}
        bounds={rangeBounds}
        onChange={rangeSliderChange}
        resetSliderFlag={resetSliderFlag}
        setResetSliderFlag={setResetSliderFlag}
        showEnhancedTimeline={showEnhancedTimeline}
      />
    );
  }, [model.duration, rangeBounds, rangeSliderChange, resetSliderFlag, setResetSliderFlag, classes.rangeSliderNew, classes.rangeSliderOld, showEnhancedTimeline]);

  const timelineSliderElement = useMemo(() => {
    return (
      <TimelineSlider
        className={showEnhancedTimeline ? classes.timelineSliderWithRangeNew : classes.timelineSliderWithRangeOld}
        initialTime={startTime}
        simulationTime={timelineTime}
        range={timelineRange}
        onChange={timelineSliderChange}
        highlightedContactPoints={contactTimeline}
        highlightedInterferencePoints={interferenceTimeline}
        showEnhancedTimeline={showEnhancedTimeline}
      />
    );
  }, [model.duration, startTime, timelineTime, timelineRange, timelineSliderChange, classes.timelineSliderWithRangeNew, classes.timelineSliderWithRangeOld, classes.timelineSlider, contactTimeline, interferenceTimeline, showEnhancedTimeline]);

  const RfSliderElement = useMemo(() => {
    if (rfData.length > 0 && tabButton === "rfLinks")
      return (
        <div className={classes.RFSliderContainer}>
          <Stack direction="row" justifyContent="end" alignItems="center" style={{ marginRight: '0.2rem', marginTop: '0.2rem' }}>
            <Typography>Filter by I/N:</Typography>
            <FilterAlt style={{ marginLeft: '0.5rem', cursor: 'pointer' }} onClick={handleFilterOpen} />
          </Stack>
          <Collapse in={filterOpen}>
            <Stack direction="row" justifyContent="space-between" alignItems="end" spacing={2}>
              <Typography variant='h6' style={{ marginLeft: '0.3rem', marginBottom: '1.25rem' }}>I/N</Typography>
              <RfSlider
                className={classes.RFSlider}
                value={rfSlider}
                minValue={minIn ?? 0}
                maxValue={maxIn ?? 100}
                changeSlider={rfSliderChange}
              />
            </Stack>
          </Collapse>
        </div>
      );

  }, [classes.RFSlider, rfData, rfSlider, tabButton, filterOpen]);

  return (
    <div className={classes.root} style={{ height: (height), width: `${width}%` }} >
      <canvas id={canvasId} className={classes.worldwindCanvas}></canvas>

      <img src='images/worldwind_logo.png' alt='worldwind logo' className={classes.worldwindLogo} />
      {model.showOtherBodies && (modelReferenceBody === 'MOON') &&
        <IconButton onClick={handleBodyToggle} className={classes.bodyButton}>
          <img src='images/view/planet-dropdown-moon.png' alt='earth button' className={classes.bodyButtonImage} />
        </IconButton>
      }
      {model.showOtherBodies && (modelReferenceBody === 'EARTH') &&
        <IconButton onClick={handleBodyToggle} className={classes.bodyButton}>
          <img src='images/view/planet-dropdown-earth.png' alt='moon button' className={classes.bodyButtonImage} />
        </IconButton>
      }
      {showEnhancedTimeline && showLayerManager && <Rnd default={{ x: position.x, y: position.y, width: 440, height: 362 }}
        minHeight={362} maxHeight={462}
        className={classes.layerContainer}
        position={position}
        onDragStop={handleDrag}
        style={{ display: toggleLayerManager ? 'block' : 'none' }}
        bounds="window">
        <>{layerManagerElement}</>
        <div onMouseDown={stopPropagation} onTouchStart={stopPropagation}>{RfSliderElement}</div>
      </Rnd>}
      <div className={classes.timelineContainer}>
        {modelIsDecayed &&
          <div className={classes.warningMessage}>
            <Typography variant="subtitle2" color="initial" align='right'>User Satellite Orbit Has Decayed</Typography>
          </div>
        }
        {fetchingData &&
          <div className={classes.warningMessage}>
            <Typography variant="subtitle2" color="initial" align='right'>Fetching data...</Typography>
          </div>
        }
        <TimelineControls
          className={classes.timelineControls}
          timelineDragged={timelineDragged}
          simulationTime={timelineTime}
          onChange={timelineControlsChange}
          onChangeAnimate={changeAnimate}
          triggerReset={() => {
            setResetSliderFlag(true);
            setSimulationTime(startTime);
          }}
        />
        <>{timelineSliderElement}</>
        <>{rangeSliderElement}</>
      </div>
      {groundStationSelection &&
        ((selectionMode === SelectionMode.LEFT) || (selectionMode === SelectionMode.HOVER)) &&
        <GroundStationInfoDisplay
          selection={groundStationSelection}
        />
      }
      {satelliteSelection &&
        ((selectionMode === SelectionMode.LEFT) || (selectionMode === SelectionMode.HOVER)) &&
        <SatelliteInfoDisplay
          selection={satelliteSelection}
        />
      }
      {spacecraftSelection &&
        ((selectionMode === SelectionMode.LEFT) || (selectionMode === SelectionMode.HOVER)) &&
        <SpacecraftInfoDisplay
          selection={spacecraftSelection}
        />
      }
      {contactLinkSelection &&
        ((selectionMode === SelectionMode.LEFT) || (selectionMode === SelectionMode.HOVER)) &&
        <ContactLinkInfoDisplay
          selection={contactLinkSelection}
        />
      }
      {locationSelection &&
        selectionMode === SelectionMode.RIGHT &&
        <AddNewGroundStationMenu
          selection={locationSelection}
          handleAddNewGroundStation={handleAddNewGroundStation}
          handleRefresh={fullRefresh}
        />
      }
      {groundStationSelection &&
        selectionMode === SelectionMode.RIGHT &&
        <GroundStationContextMenu
          selection={groundStationSelection}
          handleActivateNode={(node: GroundStationInfo) => {
            handleActivateGroundStation(node);
            handleDeselect();
          }}
          handleDeactivateNode={(node: GroundStationInfo) => {
            handleDeactivateGroundStation(node);
            handleDeselect();
          }}
          handleRemoveNode={(node: GroundStationInfo) => {
            handleRemoveGroundStation(node);
            handleDeselect();
          }}
          handleViewPlatformDetails={handleViewGroundStationPlatformDetails}
          handleViewCoverageStatistics={handleViewCoverageStatistics}
        />
      }
      {satelliteSelection &&
        selectionMode === SelectionMode.RIGHT &&
        <SatelliteContextMenu
          selection={satelliteSelection}
          handleActivateNode={(node: SatelliteInfo) => {
            handleActivateSatellite(node);
            handleDeselect();
          }}
          handleDeactivateNode={(node: SatelliteInfo) => {
            handleDeactivateSatellite(node);
            handleDeselect();
          }}
          handleRemoveNode={(node: SatelliteInfo) => {
            handleRemoveSatellite(node);
            handleDeselect();
          }}
          handleViewSatellitePlatformDetails={handleViewSatellitePlatformDetails}
          handleViewCoverageStatistics={handleViewCoverageStatistics}
        />
      }
      {clickLocation && selectionMode === SelectionMode.RIGHT &&
        <RefreshMenu
          selection={clickLocation}
          handleRefresh={fullRefresh}
        />
      }
      <ReferenceBodyMenu
        visible={showRefBodyMenu}
        handleSelect={(val) => { modelReferenceBody = val; setShowRefBodyMenu(false); init(); }}
      />
      {showEnhancedTimeline && showLayerManager && <ToggleLayerButton
        toggleLayerManager={toggleLayerManager}
        handleClick={handleToggleLayerManager}
      />}
    </div>
  );
}

export default Visualizer;