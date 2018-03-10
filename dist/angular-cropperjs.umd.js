(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('cropperjs/dist/cropper')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'cropperjs/dist/cropper'], factory) :
	(factory((global['angular-cropperjs'] = {}),global.core,global.common,global.Cropper));
}(this, (function (exports,core,common,Cropper) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

var NgxCropperjsComponent = /** @class */ (function () {
    function NgxCropperjsComponent() {
        /*--------  Output events  --------*/
        this.export = new core.EventEmitter();
        this.ready = new core.EventEmitter();
        this.isLoading = true;
    }
    /*--------  Controller  --------*/
    /**
     * Image lodaded event
     * @param ev
     */
    /**
     * Image lodaded event
     * @param {?} ev
     * @return {?}
     */
    NgxCropperjsComponent.prototype.imageLoaded = /**
     * Image lodaded event
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        var _this = this;
        //
        // Unset load error state
        this.loadError = false;
        //
        // Setup image element
        var /** @type {?} */ image = /** @type {?} */ (ev.target);
        this.imageElement = image;
        //
        // Add crossOrigin?
        if (this.cropperOptions.checkCrossOrigin)
            image.crossOrigin = 'anonymous';
        //
        // Image on ready event
        image.addEventListener('ready', function () {
            //
            // Emit ready
            //
            // Emit ready
            _this.ready.emit(true);
            //
            // Unset loading state
            //
            // Unset loading state
            _this.isLoading = false;
            //
            // Validate cropbox existance
            if (_this.cropbox) {
                //
                // Set cropbox data
                //
                // Set cropbox data
                _this.cropper.setCropBoxData(_this.cropbox);
            }
        });
        //
        // Setup aspect ratio according to settings
        var /** @type {?} */ aspectRatio = NaN;
        if (this.settings) {
            var _a = this.settings, width = _a.width, height = _a.height;
            aspectRatio = width / height;
        }
        //
        // Set crop options
        // extend default with custom config
        this.cropperOptions = Object.assign({
            aspectRatio: aspectRatio,
            movable: false,
            scalable: false,
            zoomable: false,
            viewMode: 1,
            checkCrossOrigin: true
        }, this.cropperOptions);
        //
        // Set cropperjs
        this.cropper = new Cropper(image, this.cropperOptions);
    };
    /**
     * Image load error
     * @param event
     */
    /**
     * Image load error
     * @param {?} event
     * @return {?}
     */
    NgxCropperjsComponent.prototype.imageLoadError = /**
     * Image load error
     * @param {?} event
     * @return {?}
     */
    function (event) {
        //
        // Set load error state
        this.loadError = true;
        //
        // Unset loading state
        this.isLoading = false;
    };
    /**
     * Export canvas
     * @param base64
     */
    /**
     * Export canvas
     * @param {?=} base64
     * @return {?}
     */
    NgxCropperjsComponent.prototype.exportCanvas = /**
     * Export canvas
     * @param {?=} base64
     * @return {?}
     */
    function (base64) {
        var _this = this;
        //
        // Get and set image, crop and canvas data
        var /** @type {?} */ imageData = this.cropper.getImageData();
        var /** @type {?} */ cropData = this.cropper.getCropBoxData();
        var /** @type {?} */ canvas = this.cropper.getCroppedCanvas();
        var /** @type {?} */ data = { imageData: imageData, cropData: cropData };
        //
        // Create promise to resolve canvas data
        var /** @type {?} */ promise = new Promise(function (resolve) {
            //
            // Validate base64
            if (base64) {
                //
                // Resolve promise with dataUrl
                return resolve({
                    dataUrl: canvas.toDataURL('image/png')
                });
            }
            canvas.toBlob(function (blob) { return resolve({ blob: blob }); });
        });
        //
        // Emit export data when promise is ready
        promise.then(function (res) {
            _this.export.emit(Object.assign(data, res));
        });
    };
    NgxCropperjsComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-cropperjs',
                    templateUrl: './ngx-cropperjs.component.html',
                    styleUrls: ['./ngx-cropperjs.component.scss'],
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NgxCropperjsComponent.ctorParameters = function () { return []; };
    NgxCropperjsComponent.propDecorators = {
        "image": [{ type: core.ViewChild, args: ['image',] },],
        "imageUrl": [{ type: core.Input },],
        "settings": [{ type: core.Input },],
        "cropbox": [{ type: core.Input },],
        "loadImageErrorText": [{ type: core.Input },],
        "cropperOptions": [{ type: core.Input },],
        "export": [{ type: core.Output },],
        "ready": [{ type: core.Output },],
    };
    return NgxCropperjsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxCropperjsModule = /** @class */ (function () {
    function NgxCropperjsModule() {
    }
    /**
     * @return {?}
     */
    NgxCropperjsModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxCropperjsModule,
            providers: []
        };
    };
    NgxCropperjsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [
                        NgxCropperjsComponent
                    ],
                    exports: [
                        NgxCropperjsComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxCropperjsModule.ctorParameters = function () { return []; };
    return NgxCropperjsModule;
}());

exports.NgxCropperjsModule = NgxCropperjsModule;
exports.NgxCropperjsComponent = NgxCropperjsComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
