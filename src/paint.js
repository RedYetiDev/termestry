/**
 * @module Paint
 */

import { Point } from './geo.js';
import { WriteStream } from "tty";

function rgbToAnsi256(r, g, b) {
    if (r === g && g === b) {
        if (r < 8) {
            return 16;
        }
        if (r > 248) {
            return 231;
        }
        return Math.round(((r - 8) / 247) * 24) + 232;
    }
    var ansi = 16
        + (36 * Math.round(r / 255 * 5))
        + (6 * Math.round(g / 255 * 5))
        + Math.round(b / 255 * 5);
    return ansi;
}

function rgbToAnsi16(r, g, b) {
    var ansi = 30
        + ((Math.round(b / 255) << 2)
            | (Math.round(g / 255) << 1)
            | Math.round(r / 255));
    return ansi;
}

/**
 * A paint object
 * @class
 * @example
 * // Create a new paint object with a red stroke and a blue fill
 * const paint = new Paint(Color.Red, Color.Blue);
 */
class Paint {
    /**
     * @enum {Symbol}
     * @property {Symbol} Clear
     * @property {Symbol} Paint
     * @property {Symbol} Gradient
     */
    static Mode = Object.freeze({
        Clear: Symbol("Clear"),
        Paint: Symbol("Paint"),
        Gradient: Symbol("Gradient")
    });
    /**
     * Creates a new paint object
     * @param {(Color|Gradient)} strokeColor 
     * @param {(Color|Gradient)} fillColor 
     */
    constructor(strokeColor, fillColor) {
        if (!(strokeColor instanceof Color || strokeColor instanceof Gradient)) {
            strokeColor = Color.Default;
        }

        if (!(fillColor instanceof Color || fillColor instanceof Gradient)) {
            fillColor = Color.Default;
        }
        /**
         * The stroke color
         * @type {(Color|Gradient)}
         */
        this.strokeColor = strokeColor;
        /**
         * The fill color
         * @type {(Color|Gradient)}
        */
        this.fillColor = fillColor;
    }
}

/**
 * A color object
 * @class
 * @example
 * // Create a new color object with the RGB values of (255, 0, 0)
 * const color = new Color(255, 0, 0);
 */
class Color {
    // Assuming that the terminal color depth will not change during runtime...
    /**
     * @type {number}
     * @readonly
     * @static
    */
    static depth = WriteStream.prototype.getColorDepth();
    // Default colors
    /**
     * Black
     * @type {Color}
     * @readonly
     * @static
     */
    static Black = new Color(0, 0, 0);
    /**
     * Red
     * @type {Color}
     * @readonly
     * @static
    */
    static Red = new Color(255, 0, 0);
    /**
     * Green
     * @type {Color}
     * @readonly
     * @static
    */
    static Green = new Color(0, 255, 0);
    /**
     * Blue
     * @type {Color}
     * @readonly
     * @static
    */
    static Blue = new Color(0, 0, 255);
    /**
     * White
     * @type {Color}
     * @readonly
     * @static
    */
    static White = new Color(255, 255, 255);

    /**
     * Do not paint
     * @type {Color}
     * @readonly
     * @static
     */
    static None = new Color(-1, -1, -1);

    /**
     * Creates a new color object
     * @param {number} r Red
     * @param {number} g Blue
     * @param {number} b Green
     */
    constructor(r, g, b) {
        /**
         * Red
         * @type {number}
         */
        this.r = Math.round(Math.min(Math.max(r, 0), 255));
        /**
         * Green
         * @type {number}
        */
        this.g = Math.round(Math.min(Math.max(g, 0), 255));
        /**
         * Blue
         * @type {number}
        */
        this.b = Math.round(Math.min(Math.max(b, 0), 255));
    }

    /**
     * Creates a color from a number
     * @param {number} num Number to convert
     * @returns {Color}
     */
    static fromNumber(num) {
        return new Color(
            (num >> 16) & 0xFF,
            (num >> 8) & 0xFF,
            num & 0xFF
        )
    }

    /**
     * Creates a new color from the given number
     * @returns {number}
     */
    toNumber() {
        return (this.r << 16) + (this.g << 8) + this.b;
    }

    /**
     * Converts the color to an escape code
     * @returns {Color} The escape code
     * @private
     */
    toEscapeCode() {
        switch (Color.depth) {
            case 1:
                // We only have black and white, so we figure out which one is closer
                let gray = (this.r + this.g + this.b) / 3;
                return gray > 127 ? "37m" : "30m";
            case 4:
                return `38;5;${rgbToAnsi16(this.r, this.g, this.b)}m`;
            case 8:
                return `38;5;${rgbToAnsi256(this.r, this.g, this.b)}m`;
            case 24:
                return `38;2;${this.r};${this.g};${this.b}m`;
            default:
                // Just return 24-bit color
                return `38;2;${this.r};${this.g};${this.b}m`;
        }
    }
}

/**
 * A gradient
 * @class
 * @abstract
 * @private
 */
class Gradient {
    /**
     * The color stops in the gradient
     * @type {Array<{offset: number, color: Color}>}
     * @private
     */
    colorStops = [];

    /**
     * A gradient
     * @param {Type} type  The type of gradient
     * @param {number} angle The angle direction of the gradient (Radians)
     */
    constructor(type, angle) {
        /**
         * The type of gradient
         * @type {GradientType}
         * @readonly
        */
        this.type = type;
        /**
         * The angle direction of the gradient (Radians)
         * @type {number}
        */
        this.angle = angle;
    }

    /**
     * Adds a color stop to the gradient
     * @param {number} offset The offset of the color stop (0-1)
     * @param {Color} color The color to add
     */
    addColorStop(offset, color) {
        if (offset < 0) offset = 0;
        if (offset > 1) offset = 1;

        let index = this.colorStops.findIndex((stop) => stop.offset === offset);
        if (index !== -1) {
            this.colorStops[index].color = color;
        } else {
            this.colorStops.push({ offset, color });
        }
    }

    /**
     * 
     * @param {import('./geo.js').Point} fillStart The start point of the fill
     * @param {import('./geo.js').Point} point The point to get the color for
     * @param {import('./geo.js').Point} fillEnd The end point of the fill
     */
    getColorAt(fillStart, point, fillEnd) {
        throw new Error("Do not use the base Gradient class. Use a subclass instead.");
    }

    /**
     * Gets the color for a percentage of the gradient
     * @param {number} percent The percentage of the gradient to get the color for
     * @returns {Color}
     */
    getColorFor(percent) {
        percent = Math.min(Math.max(percent, 0), 1);
        if (this.colorStops.length === 0) return Color.Black;
        if (this.colorStops[0].offset !== 0) {
            this.colorStops.unshift({ offset: 0, color: this.colorStops[0].color });
        }
        if (this.colorStops.length === 1) return this.colorStops[0].color;
        if (this.colorStops[this.colorStops.length - 1].offset !== 1) {
            this.colorStops.push({ offset: 1, color: this.colorStops[this.colorStops.length - 1].color });
            this.colorStops.splice(this.colorStops.length - 2, 1);
        }

        let before = this.colorStops.findLast((stop) => stop.offset <= percent);
        let after = this.colorStops.find((stop) => stop.offset >= percent);

        // console.log(before, percent, after)
        if (before === after) return before.color;

        let percentBetween = (percent - before.offset) / (after.offset - before.offset);

        let r = Math.round((before.color.r * (1 - percentBetween)) + (after.color.r * percentBetween));
        let g = Math.round((before.color.g * (1 - percentBetween)) + (after.color.g * percentBetween));
        let b = Math.round((before.color.b * (1 - percentBetween)) + (after.color.b * percentBetween));

        return new Color(r, g, b);
    }
}

const GradientType = {
    Linear: Symbol("Linear"),
    Radial: Symbol("Radial"),
    Conic: Symbol("Conic"),
}

/**
 * A linear gradient
 * @extends Gradient
 * @class
 * @example
 * // Create a new gradient that goes from red to blue
 * let gradient = new LinearGradient(0 /* The angle of the gradient in radians *\/);
 * gradient.addColorStop(0, Color.Red);
 * gradient.addColorStop(1, Color.Blue);
 */
class LinearGradient extends Gradient {
    /**
     * Creates a new linear gradient
     * @param {number} angle The angle direction of the gradient (Radians)
     */
    constructor(angle) {
        super(GradientType.Linear, angle);
    }

    /**
     * Gets the color for a point in the gradient 
     * @param {import('./geo.js').Point} fillStart The start point of the fill
     * @param {import('./geo.js').Point} point The point to get the color for
     * @param {import('./geo.js').Point} fillEnd The end point of the fill
     * @returns {Color}
     */
    getColorAt(fillStart, point, fillEnd) {
        let distance = Math.sqrt(Math.pow(fillEnd.x - fillStart.x, 2) + Math.pow(fillEnd.y - fillStart.y, 2));
        let x = Math.cos(this.angle) * distance;
        let y = Math.sin(this.angle) * distance;
        let percentX = (point.x - fillStart.x) / x;
        let percentY = (point.y - fillStart.y) / y;
        let percent = (percentX + percentY) / 2;

        return this.getColorFor(percent);
    }
}

/**
 * A radial gradient
 * @extends Gradient
 * @class
 * @example
 * // Create a new gradient that goes from red to blue
 * let gradient = new RadialGradient();
 * gradient.addColorStop(0, Color.Red);
 * gradient.addColorStop(1, Color.Blue);
 */
class RadialGradient extends Gradient {
    /**
     * Creates a new radial gradient
     */
    constructor() {
        super(GradientType.Radial, 0);
    }

    /**
     * Gets the color for a point in the gradient 
     * @param {import('./geo.js').Point} fillStart The start point of the fill
     * @param {import('./geo.js').Point} point The point to get the color for
     * @param {import('./geo.js').Point} fillEnd The end point of the fill
     * @returns {Color}
     */
    getColorAt(fillStart, point, fillEnd) {
        // Figure out the center of the circle (midpoint of fillStart and fillEnd)
        let center = new Point((fillStart.x + fillEnd.x) / 2, (fillStart.y + fillEnd.y) / 2);
        // Figure out the radius of the circle (distance between fillStart and fillEnd)
        let radius = Math.sqrt(Math.pow(fillEnd.x - fillStart.x, 2) + Math.pow(fillEnd.y - fillStart.y, 2)) / 2;
        // Figure out the distance from the center to the point
        let distance = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
        // Figure out the percent of the distance from the center to the point
        let percent = distance / radius;

        return this.getColorFor(percent);
    }
}

/**
 * A conic gradient
 * @extends Gradient
 * @class
 * @example
 * // Create a new gradient that goes from red to blue
 * let gradient = new ConicGradient(0 /* The angle of the gradient in radians *\/);
 * gradient.addColorStop(0, Color.Red);
 * gradient.addColorStop(1, Color.Blue);
 */
class ConicGradient extends Gradient {
    /**
     * Creates a new conic gradient
     * @param {number} angle The angle direction of the gradient (Radians)
     */
    constructor(angle) {
        super(GradientType.Conic, angle);
    }

    /**
     * Gets the color for a point in the gradient 
     * @param {import('./geo.js').Point} fillStart The start point of the fill
     * @param {import('./geo.js').Point} point The point to get the color for
     * @param {import('./geo.js').Point} fillEnd The end point of the fill
     * @returns {Color}
     */
    getColorAt(fillStart, point, fillEnd) {
        let center = new Point((fillStart.x + fillEnd.x) / 2, (fillStart.y + fillEnd.y) / 2);

        let pointRelativeToCenter = new Point(point.x - center.x, point.y - center.y);

        let angle = Math.atan2(pointRelativeToCenter.y, pointRelativeToCenter.x) + this.angle;

        let percent = 1 / (angle + Math.PI);

        return this.getColorFor(percent);
    }
}

export { Paint, Color, LinearGradient, RadialGradient, ConicGradient };