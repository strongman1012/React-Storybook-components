import WorldWind from '@nasaworldwind/worldwind'

class MarsMDIM21Layer extends WorldWind.TiledImageLayer {
    constructor(layerName?: string) {
        super(WorldWind.Sector.FULL_SPHERE, new WorldWind.Location(45, 45), 7, "image/jpeg", layerName || "MDIM21_color", 256, 256);
        super.displayName = "USGS Moon";
        super.pickEnabled = false;
        super.urlBuilder = new WorldWind.WmsUrlBuilder("https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map", layerName || "MDIM21_color", "", "1.3.0");
    }
};


export default MarsMDIM21Layer;
