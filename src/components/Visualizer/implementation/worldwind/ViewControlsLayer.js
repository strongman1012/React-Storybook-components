/**
 * Custom subclass of ViewControlsLayer which adds mode selection for 3D or 2D.
 * 
 * @param {*} worldWindow worldWindow The WorldWindow associated with this layer.
 * @param {*} globe3D 3D globe to use when 3D mode is selected
 * @param {*} globe2D 2D globe to use when 2D mode is selected
 */
import WorldWind from '@nasaworldwind/worldwind'


var ViewControlsLayer = function (worldWindow, globe3D, globe2D) {

    WorldWind.ViewControlsLayer.call(this, worldWindow);
    this.wwd = worldWindow;
    this.globe3D = globe3D;
    this.globe2D = globe2D;

    // Set the screen and image offsets of each control to the lower left corner.
    var screenOffset = new WorldWind.Offset(WorldWind.OFFSET_PIXELS, 0, WorldWind.OFFSET_PIXELS, 0),
        imagePath = "images/";

    this.mode3DControl = new WorldWind.ScreenImage(screenOffset.clone(), imagePath + "view-mode-3D-32x32.png");
    this.mode2DControl = new WorldWind.ScreenImage(screenOffset.clone(), imagePath + "view-mode-2D-32x32.png");

    // Put the controls in an array so we can easily apply bulk operations.
    this.controls.push(this.mode3DControl);
    this.controls.push(this.mode2DControl);

    this.mode3DControl.imageOffset = screenOffset.clone();
    this.mode3DControl.opacity = this._inactiveOpacity;
    this.mode3DControl.size = 32;
    this.mode2DControl.imageOffset = screenOffset.clone();
    this.mode2DControl.opacity = this._inactiveOpacity;
    this.mode2DControl.size = 32;
    
    // Establish event handlers.
    this.wwd.worldWindowController.addGestureListener(this);
    this.placement = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 1, WorldWind.OFFSET_FRACTION, 1);
    this.alignment = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 1, WorldWind.OFFSET_FRACTION, 1);

    this.showExaggerationControl = false;

}

ViewControlsLayer.prototype = Object.create(WorldWind.ViewControlsLayer.prototype);

Object.defineProperties(ViewControlsLayer.prototype, {
    showModeControl: {
        get: function () {
            return this.mode3DControl.enabled;
        },
        set: function (value) {
            this.mode3DControl.enabled = value;
            this.mode2DControl.enabled = value;
        }
    }
});


ViewControlsLayer.prototype.doRender = function (dc) {
    var controlPanelWidth = 0, controlPanelHeight = 64,
        panelOffset, screenOffset,
        x, y;

    this.inCurrentFrame = false; // to track whether any control is displayed this frame

    // Determine the dimensions of the control panel and whether any control is displayed.
    if (this.showPanControl) {
        controlPanelWidth += this.panControl.size;
        this.inCurrentFrame = true;
    }
    if (this.showZoomControl) {
        controlPanelWidth += this.zoomInControl.size;
        this.inCurrentFrame = true;
    }
    if (this.showHeadingControl) {
        controlPanelWidth += this.headingLeftControl.size;
        this.inCurrentFrame = true;
    }
    if (this.showTiltControl) {
        controlPanelWidth += this.tiltDownControl.size;
        this.inCurrentFrame = true;
    }
    if (this.showExaggerationControl) {
        controlPanelWidth += this.exaggerationDownControl.size;
        this.inCurrentFrame = true;
    }
    if (this.showFieldOfViewControl) {
        controlPanelWidth += this.fovNarrowControl.size;
        this.inCurrentFrame = true;
    }
    if (this.showModeControl) {
        controlPanelWidth += this.mode3DControl.size;
        this.inCurrentFrame = true;
    }

    // Determine the lower-left corner position of the control collection.
    screenOffset = this.placement.offsetForSize(dc.viewport.width,
        dc.viewport.height);
    panelOffset = this.alignment.offsetForSize(controlPanelWidth, controlPanelHeight);
    x = screenOffset[0] - panelOffset[0];
    y = screenOffset[1] - panelOffset[1];

    // Determine the control positions and render the controls.

    if (this.showPanControl) {
        this.panControl.screenOffset.x = x;
        this.panControl.screenOffset.y = y;
        this.panControl.render(dc);
        this.panControlCenter[0] = x + this.panControl.size / 2;
        this.panControlCenter[1] = y + this.panControl.size / 2;
        x += this.panControl.size;
    }

    if (this.showZoomControl) {
        this.zoomOutControl.screenOffset.x = x;
        this.zoomOutControl.screenOffset.y = y;
        this.zoomInControl.screenOffset.x = x;
        this.zoomInControl.screenOffset.y = y + this.zoomOutControl.size;
        this.zoomOutControl.render(dc);
        this.zoomInControl.render(dc);
        x += this.zoomOutControl.size;
    }

    if (this.showHeadingControl) {
        this.headingRightControl.screenOffset.x = x;
        this.headingRightControl.screenOffset.y = y;
        this.headingLeftControl.screenOffset.x = x;
        this.headingLeftControl.screenOffset.y = y + this.headingLeftControl.size;
        this.headingRightControl.render(dc);
        this.headingLeftControl.render(dc);
        x += this.headingLeftControl.size;
    }

    if (this.showTiltControl) {
        this.tiltDownControl.screenOffset.x = x;
        this.tiltDownControl.screenOffset.y = y;
        this.tiltUpControl.screenOffset.x = x;
        this.tiltUpControl.screenOffset.y = y + this.tiltDownControl.size;
        this.tiltDownControl.render(dc);
        this.tiltUpControl.render(dc);
        x += this.tiltDownControl.size;
    }

    if (this.showExaggerationControl) {
        this.exaggerationDownControl.screenOffset.x = x;
        this.exaggerationDownControl.screenOffset.y = y;
        this.exaggerationUpControl.screenOffset.x = x;
        this.exaggerationUpControl.screenOffset.y = y + this.exaggerationDownControl.size;
        this.exaggerationUpControl.render(dc);
        this.exaggerationDownControl.render(dc);
        x += this.exaggerationDownControl.size;
    }

    if (this.showFieldOfViewControl) {
        this.fovNarrowControl.screenOffset.x = x;
        this.fovNarrowControl.screenOffset.y = y;
        this.fovWideControl.screenOffset.x = x;
        this.fovWideControl.screenOffset.y = y + this.fovNarrowControl.size;
        this.fovNarrowControl.render(dc);
        this.fovWideControl.render(dc);
        x += this.mode2DControl.size;
    }

    if (this.showModeControl) {
        this.mode2DControl.screenOffset.x = x;
        this.mode2DControl.screenOffset.y = y;
        this.mode3DControl.screenOffset.x = x;
        this.mode3DControl.screenOffset.y = y + this.mode2DControl.size;
        this.mode2DControl.render(dc);
        this.mode3DControl.render(dc);
    }
};

ViewControlsLayer.prototype.determineOperation = function (e, topObject) {
    var operation = null;

    if (topObject && (topObject instanceof WorldWind.ScreenImage)) {
        if (topObject === this.panControl) {
            operation = this.handlePan;
        } else if (topObject === this.zoomInControl
            || topObject === this.zoomOutControl) {
            operation = this.handleZoom;
        } else if (topObject === this.headingLeftControl
            || topObject === this.headingRightControl) {
            operation = this.handleHeading;
        } else if (topObject === this.tiltUpControl
            || topObject === this.tiltDownControl) {
            operation = this.handleTilt;
        } else if (topObject === this.exaggerationUpControl
            || topObject === this.exaggerationDownControl) {
            operation = this.handleExaggeration;
        } else if (topObject === this.fovNarrowControl
            || topObject === this.fovWideControl) {
            operation = this.handleFov;
        } else if (topObject === this.mode3DControl
            || topObject === this.mode2DControl) {
            operation = this.handleMode;
        }
    }

    return operation;
};

ViewControlsLayer.prototype.handleMode = function (e, control) {
    var handled = false;

    if (this.isPointerDown(e) || this.isTouchStart(e)) {
        this.activeControl = control;
        this.activeOperation = this.handleZoom;
        e.preventDefault();

        if (this.isTouchStart(e)) {
            this.currentTouchId = e.changedTouches.item(0).identifier; // capture the touch identifier
        }

        if (this.activeControl === this.mode3DControl) {
            this.wwd.globe = this.globe3D;
        } else {
            if (this.activeControl === this.mode2DControl) {
                if (this.wwd.globe !== this.globe2D) {
                    this.wwd.layers.forEach(l => {
                        if ((l.displayName === "Orbits") || (l.displayName === "User Satellite Orbit")) {
                            l.removeAllRenderables();
                        }
                    });
                }
                this.wwd.globe = this.globe2D;
            }
        }
        handled = true;
    }

    return handled;
}

export default ViewControlsLayer;
