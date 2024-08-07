export type Configuration = {
    viewOptions: {
        projectOntoUSAT: boolean;
        showOrbits: boolean;
        showUSAT: boolean;
        showTerrestrialUser: boolean;
        showFovCones: boolean;
        showGSCones: boolean;
        fovConeColor: string;
        fovInactiveConeColor: string;
        relayColor: string;
        usatColor: string;
        groundStationConeColor: string;
        groundStationInactiveConeColor: string;
    },
    usat: {
        show: boolean;
    }
}

export const initialConfiguration: Configuration = {
    viewOptions: {
        projectOntoUSAT: true,
        showOrbits: true,
        showUSAT: true,
        showTerrestrialUser: true,
        showFovCones: true,
        showGSCones: true,
        fovConeColor: "#12b3f040",
        fovInactiveConeColor: "#8888884C",
        relayColor: "#edc100",
        usatColor:  "#ff0000",
        groundStationConeColor: "#00ff0026",
        groundStationInactiveConeColor: "#88888866",
    },
    usat: {
        show: true
    }
};
