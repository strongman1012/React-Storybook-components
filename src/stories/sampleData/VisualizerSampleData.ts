import { VisualizerModel } from "../../components/Visualizer/implementation/model";

const today = (): Date => {
  var d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const visualizerData: VisualizerModel = {
  "epoch": 1.6725312E+12,
    "referenceBody": "EARTH",
    "showOtherBodies": true,
    "duration": 3.15354E+7,
    "apiURL": "http://localhost:5000/api/v0/",
    "simulationName": "E:/SamplePositionData_Large",
    "showLayerManager": true,
    "showEnhancedTimeline": true,
    "userSatellites": [
        {
            "id": 1,
            "name": "ARIEL",
            "usePositionAPI": true,
            "referenceBody": "EARTH",
            "activated": true,
            "sma": 45000
        },
        {
            "id": 2,
            "name": "Blue_Moon_MK1_New",
            "usePositionAPI": true,
            "referenceBody": "MOON",
            "activated": true,
            "sma": 35786
        },
        {
            "id": 3,
            "name": "Blue_Moon_Mk-1",
            "usePositionAPI": true,
            "referenceBody": "MOON",
            "activated": true,
            "sma": 35786
        },
        {
            "id": 4,
            "name": "D2S2",
            "usePositionAPI": true,
            "referenceBody": "MOON",
            "activated": true,
            "sma": 25000
        },
        {
            "id": 5,
            "name": "Gateway",
            "usePositionAPI": true,
            "referenceBody": "EARTH",
            "activated": true,
            "sma": 35786
        },
        {
            "id": 6,
            "name": "HAKUTO-R-L1",
            "usePositionAPI": true,
            "referenceBody": "MOON",
            "activated": true,
            "sma": 35786
        },
        {
            "id": 7,
            "name": "Masten_Mission_One",
            "usePositionAPI": true,
            "referenceBody": "MOON",
            "activated": true,
            "sma": 35786
        },
        {
            "id": 8,
            "name": "TSUKIMI",
            "usePositionAPI": true,
            "referenceBody": "MOON",
            "activated": true,
            "sma": 90
        }
    ],
    "groundStations": [
        {
            "id": 9,
            "name": "ARIEL_Ground_Station_-31.0483_116.1911",
            "latitude": -31.0483,
            "longitude": 116.1911,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 10,
            "name": "ARIEL_Ground_Station_-35.4_148.98",
            "latitude": -35.4,
            "longitude": 148.98,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 11,
            "name": "ARIEL_Ground_Station_40.43_-4.25",
            "latitude": 40.43,
            "longitude": -4.25,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 12,
            "name": "ARIEL_Ground_Station_50.0504_-5.1833",
            "latitude": 50.0504,
            "longitude": -5.1833,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 13,
            "name": "Blue_Moon_MK1_New_Ground_Station_-33.15_-70.67",
            "latitude": -33.15,
            "longitude": -70.67,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 14,
            "name": "Blue_Moon_MK1_New_Ground_Station_-35.4_148.98",
            "latitude": -35.4,
            "longitude": 148.98,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 15,
            "name": "Blue_Moon_MK1_New_Ground_Station_12.9_77.37",
            "latitude": 12.9,
            "longitude": 77.37,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 16,
            "name": "Blue_Moon_MK1_New_Ground_Station_19.01_-155.66",
            "latitude": 19.01,
            "longitude": -155.66,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 17,
            "name": "Blue_Moon_MK1_New_Ground_Station_27.76_-15.63",
            "latitude": 27.76,
            "longitude": -15.63,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 18,
            "name": "Blue_Moon_MK1_New_Ground_Station_35.34_-116.87",
            "latitude": 35.34,
            "longitude": -116.87,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 19,
            "name": "Blue_Moon_MK1_New_Ground_Station_40.43_-4.25",
            "latitude": 40.43,
            "longitude": -4.25,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 20,
            "name": "Blue_Moon_MK1_New_Ground_Station_50.05_-5.18",
            "latitude": 50.05,
            "longitude": -5.18,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 21,
            "name": "Blue_Moon_Mk-1_Ground_Station_-29.05_115.35",
            "latitude": -29.05,
            "longitude": 115.35,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 22,
            "name": "Blue_Moon_Mk-1_Ground_Station_-33.15_-70.67",
            "latitude": -33.15,
            "longitude": -70.67,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 23,
            "name": "Blue_Moon_Mk-1_Ground_Station_-33.23_20.58",
            "latitude": -33.23,
            "longitude": 20.58,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 24,
            "name": "Blue_Moon_Mk-1_Ground_Station_-35.4_148.98",
            "latitude": -35.4,
            "longitude": 148.98,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 25,
            "name": "Blue_Moon_Mk-1_Ground_Station_12.9_77.37",
            "latitude": 12.9,
            "longitude": 77.37,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 26,
            "name": "Blue_Moon_Mk-1_Ground_Station_19.01_-155.66",
            "latitude": 19.01,
            "longitude": -155.66,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 27,
            "name": "Blue_Moon_Mk-1_Ground_Station_27.76_-15.63",
            "latitude": 27.76,
            "longitude": -15.63,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 28,
            "name": "Blue_Moon_Mk-1_Ground_Station_32.55_-106.61",
            "latitude": 32.55,
            "longitude": -106.61,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 29,
            "name": "Blue_Moon_Mk-1_Ground_Station_35.3_-116.8",
            "latitude": 35.3,
            "longitude": -116.8,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 30,
            "name": "Blue_Moon_Mk-1_Ground_Station_40.43_-4.25",
            "latitude": 40.43,
            "longitude": -4.25,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 31,
            "name": "Blue_Moon_Mk-1_Ground_Station_5.25_-52.8",
            "latitude": 5.25,
            "longitude": -52.8,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 32,
            "name": "Blue_Moon_Mk-1_Ground_Station_50.05_-5.18",
            "latitude": 50.05,
            "longitude": -5.18,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 33,
            "name": "D2S2_Ground_Station_-29.05_115.35",
            "latitude": -29.05,
            "longitude": 115.35,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 34,
            "name": "D2S2_Ground_Station_19.02_-155.67",
            "latitude": 19.02,
            "longitude": -155.67,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 35,
            "name": "D2S2_Ground_Station_64.8_-147.65",
            "latitude": 64.8,
            "longitude": -147.65,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 36,
            "name": "D2S2_Ground_Station_67.88_21.07",
            "latitude": 67.88,
            "longitude": 21.07,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 37,
            "name": "Gateway_Ground_Station_-35.3989_148.98",
            "latitude": -35.3989,
            "longitude": 148.98,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 38,
            "name": "Gateway_Ground_Station_35.3368_-116.8726",
            "latitude": 35.3368,
            "longitude": -116.8726,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 39,
            "name": "Gateway_Ground_Station_40.4279_-4.2505",
            "latitude": 40.4279,
            "longitude": -4.2505,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 40,
            "name": "HAKUTO-R-L1_Ground_Station_-3_40.19",
            "latitude": -3,
            "longitude": 40.19,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 41,
            "name": "HAKUTO-R-L1_Ground_Station_-31.05_116.19",
            "latitude": -31.05,
            "longitude": 116.19,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 42,
            "name": "HAKUTO-R-L1_Ground_Station_-35.4_148.98",
            "latitude": -35.4,
            "longitude": 148.98,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 43,
            "name": "HAKUTO-R-L1_Ground_Station_21.56_-158.27",
            "latitude": 21.56,
            "longitude": -158.27,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 44,
            "name": "HAKUTO-R-L1_Ground_Station_35.34_-116.87",
            "latitude": 35.34,
            "longitude": -116.87,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 45,
            "name": "HAKUTO-R-L1_Ground_Station_40.45_-4.37",
            "latitude": 40.45,
            "longitude": -4.37,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 46,
            "name": "HAKUTO-R-L1_Ground_Station_5.25_-52.8",
            "latitude": 5.25,
            "longitude": -52.8,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 47,
            "name": "Masten_Mission_One_Ground_Station_-25.89_27.69",
            "latitude": -25.89,
            "longitude": 27.69,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 48,
            "name": "Masten_Mission_One_Ground_Station_-29.05_115.35",
            "latitude": -29.05,
            "longitude": 115.35,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 49,
            "name": "Masten_Mission_One_Ground_Station_-33.15_-70.67",
            "latitude": -33.15,
            "longitude": -70.67,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 50,
            "name": "Masten_Mission_One_Ground_Station_-35.4_148.98",
            "latitude": -35.4,
            "longitude": 148.98,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 51,
            "name": "Masten_Mission_One_Ground_Station_19.01_-155.66",
            "latitude": 19.01,
            "longitude": -155.66,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 52,
            "name": "Masten_Mission_One_Ground_Station_35.34_-116.87",
            "latitude": 35.34,
            "longitude": -116.87,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 53,
            "name": "Masten_Mission_One_Ground_Station_40.43_-4.25",
            "latitude": 40.43,
            "longitude": -4.25,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 54,
            "name": "TSUKIMI_Ground_Station_12.9_77.37",
            "latitude": 12.9,
            "longitude": 77.37,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 55,
            "name": "TSUKIMI_Ground_Station_31.25_131.08",
            "latitude": 31.25,
            "longitude": 131.08,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 56,
            "name": "TSUKIMI_Ground_Station_36.13_138.36",
            "latitude": 36.13,
            "longitude": 138.36,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 57,
            "name": "TSUKIMI_Ground_Station_36.14_138.35",
            "latitude": 36.14,
            "longitude": 138.35,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 58,
            "name": "TSUKIMI_Ground_Station_36.26_136.23",
            "latitude": 36.26,
            "longitude": 136.23,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        },
        {
            "id": 59,
            "name": "TSUKIMI_Ground_Station_47.88_11.08",
            "latitude": 47.88,
            "longitude": 11.08,
            "altitude": 0,
            "minElevationAngle": 5,
            "activated": true,
            "fov": 5,
            "referenceBody": "EARTH"
        }
    ]
};