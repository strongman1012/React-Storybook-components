import { TFile } from "src/components/script-manager/types";
import { scriptType } from "../implementation/RenderPlot";

export interface AnalyticsPanelProps {
  dataset: any,
  users: userParams[],
  plotScripts: scriptType[],
  getAllPlotScripts: () => scriptType[],
  templateScript: string,
  manageTemplateScript: string,
  apiURL: string,
  viewAll: boolean,
  filterMultiSelect: boolean,
  updatePlotSelections: () => void,
  handleDeleteScript: (id: string) => void;
  handleUpdateScript: (file: TFile, actionType: string) => void;
  downloadResults: () => void;
  savePoints: () => void;
}

export interface AnalyticsTraces {
  coverage: AnalyticsPanelData | null;
  gap: AnalyticsPanelData | null;
  histogram: any | null;
  boxPlot: any | null;
  coverage_histogram: AnalyticsPanelData | null;
  gap_histogram: AnalyticsPanelData | null;
}

export interface AnalyticsPanelData {
  xTraces: any;
  yTraces?: any;
  avgTraces?: any;
  type: string;
  title: string;
}

// Stores terrestrial model data, a set of interpolated data ready
// to display in the heatmap plots, and the model data structured
// for input into the interpolation algorithm.
export interface TerrestrialData {
  heatmap: { x: number[]; y: number[]; z: number[] };
  interpolatedHeatmap: { x: number[]; y: number[]; z: number[] };
  table: number[][];
}


export interface SPAOrbitalPoint {
  altitude: number;
  inclination: number;
  eccentricity: number;
}

export interface SPATerrestrialPoint {
  latitude: number;
  longitude: number;
  altitude: number;
}

export type OrbitalCoverageEvent = (SPAOrbitalPoint & { coverageEvents: SimEvent[] })
export type OrbitalGapEvent = (SPAOrbitalPoint & { gapEvents: SimEvent[] })
export type TerrestrialCoverageEvent = (SPATerrestrialPoint & { coverageEvents: SimEvent[] })
export type TerrestrialGapEvent = (SPATerrestrialPoint & { gapEvents: SimEvent[] })

export interface SimEvent {
  name: string;
  duration: number;
}

export interface userParams {
  isOrbital: boolean,
  altitude?: number,
  inclination?: number,
  eccentricity?: number,
  latitude?: number,
  longitude?: number
}