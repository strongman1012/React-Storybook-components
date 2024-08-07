import WorldWind from '@nasaworldwind/worldwind'

class MoonLROOneImageLayer extends WorldWind.RenderableLayer {
    constructor() {
        super("Moon LROC");
        var surfaceImage = new WorldWind.SurfaceImage(WorldWind.Sector.FULL_SPHERE,
            WorldWind.configuration.baseUrl + "images/Moon_LRO_WAC_GLOBAL_E000N0000_064P.jpg");

        super.addRenderable(surfaceImage);
        super.pickEnabled = false;
    }

};

export default MoonLROOneImageLayer;
