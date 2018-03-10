import { Component, EventEmitter, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Cropper from 'cropperjs/dist/cropper';

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
        this.export = new EventEmitter();
        this.ready = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'ngx-cropperjs',
                    templateUrl: './ngx-cropperjs.component.html',
                    styleUrls: ['./ngx-cropperjs.component.scss'],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NgxCropperjsComponent.ctorParameters = function () { return []; };
    NgxCropperjsComponent.propDecorators = {
        "image": [{ type: ViewChild, args: ['image',] },],
        "imageUrl": [{ type: Input },],
        "settings": [{ type: Input },],
        "cropbox": [{ type: Input },],
        "loadImageErrorText": [{ type: Input },],
        "cropperOptions": [{ type: Input },],
        "export": [{ type: Output },],
        "ready": [{ type: Output },],
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
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
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

export { NgxCropperjsModule, NgxCropperjsComponent };
