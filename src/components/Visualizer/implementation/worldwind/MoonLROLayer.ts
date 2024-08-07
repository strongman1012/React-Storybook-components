import WorldWind from '@nasaworldwind/worldwind'

class MoonLROLayer extends WorldWind.TiledImageLayer {
    constructor(layerName?: string) {
        super(WorldWind.Sector.FULL_SPHERE, new WorldWind.Location(45, 45), 7, "image/jpeg", layerName || "MOON_LROC_WAC", 256, 256);
        super.displayName = "MoonLRO";
        super.pickEnabled = false;
        super.urlBuilder = new WorldWind.WmsUrlBuilder("https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/earth/moon_simp_cyl.map", layerName || "LROC_WAC", "", "1.3.0");        
    }

};

export default MoonLROLayer;
