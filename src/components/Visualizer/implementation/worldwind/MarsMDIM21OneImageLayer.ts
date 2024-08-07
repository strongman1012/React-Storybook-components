import WorldWind from '@nasaworldwind/worldwind'

class MarsMDIM21OneImageLayer extends WorldWind.RenderableLayer {
    constructor() {
        super("Mars MDIM21");
        var surfaceImage = new WorldWind.SurfaceImage(WorldWind.Sector.FULL_SPHERE,
            WorldWind.configuration.baseUrl + "images/Mars_Viking_MDIM21_ClrMosaic.jpg");

        super.addRenderable(surfaceImage);
        super.pickEnabled = false;
    }

};

export default MarsMDIM21OneImageLayer;
