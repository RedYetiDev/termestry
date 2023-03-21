/**
 * @module Geometry
 */
/**
 * @typedef {(Point|Size|number|number[]|{x: number, y:number})} PointLike
 * @description A point-like object. Can be a Point, Size, number, array, or object with x and y properties.
 */

/**
 * @param {PointLike} pointLike The point-like object to parse
 * @param {function} callback The callback to call with the parsed point
 * @throws {Error} If the point-like object is invalid
 * @private
 */
function pointLikeParsing(pointLike, y, callback) {
    if (typeof pointLike === 'number' && typeof y === 'number') {
        return callback(pointLike, y);
    } else if (pointLike instanceof Point) {
        return callback(pointLike.x, pointLike.y);
    } else if (pointLike instanceof Size) {
        return callback(pointLike.width, pointLike.height);
    } else if (typeof pointLike === 'number') {
        if (typeof y === 'number') {
            return callback(pointLike, y);
        } else {
            throw new Error('Invalid arguments. If the first argument is a number, the second argument must be a number');
        }
    } else if (Array.isArray(pointLike)) {
        return callback(pointLike[0], pointLike[1]);
    } else if (typeof pointLike?.x === 'number' && typeof pointLike?.y === 'number') {
    } else {
        throw new Error('Invalid arguments. The first argument must be a Point, Size, number, array, or object with x and y properties');
    }
}

/**
 * A point in 2D space
 * @class
 * @example
 * // Create a new point at (10, 10)
 * const point = new Point(10, 10);
 */
class Point {
    /**
     * Creates a new Point
     * @param {number} x The x coordinate. (Can be any number from 0 to process.stdout.columns)
     * @param {number} y The y coordinate. (Can be any number from 0 to process.stdout.rows)
     * @throws {Error} If the arguments are invalid or out of bounds
     */
    constructor(x, y) {
        if (!Point.inBounds(x, y)) throw new Error('Invalid arguments. Point coordinates must be within the bounds of the terminal');
        /**
         * The x coordinate
         * @type {number}
         */
        this.x = Math.round(x);
        /**
         * The y coordinate
         * @type {number}
        */
        this.y = Math.round(y);
    }

    /**
     * Transforms the point by the given matrix
     * @param {Matrix} matrix The matrix to transform the point by
     */
    transform(matrix) {
        this.x = Math.round(this.x * matrix.a + this.y * matrix.c + matrix.e);
        this.y = Math.round(this.x * matrix.b + this.y * matrix.d + matrix.f);
    }

    /**
     * Determines whether or not the point is equal to another point
     * @param {PointLike} x The point to compare to, or the x coordinate
     * @param {number} [y] The y coordinate
     * @returns {boolean} Whether or not the points are equal
     */
    equals(x, y) {
        return pointLikeParsing(x, y, (x, y) => this.x === x && this.y === y);
    }

    /**
     * Creates a new point at the center of the terminal
     * @returns {Point} The center point
     */
    static center() {
        return new Point(process.stdout.columns / 2, process.stdout.rows / 2);
    }

    /**
     * 
     * @param {PointLike} x The point or size to center, or the x coordinate
     * @param {number} [y] The y coordinate
     * @returns {Point}
     */
    static centerFor(x, y) {
        return pointLikeParsing(x, y, (width, height) => new Point(process.stdout.columns / 2 - width / 2, process.stdout.rows / 2 - height / 2));
    }

    /**
     * Creates a new point at (0, 0)
     * @returns {Point} A new point at (0, 0)
     */
    static zero() {
        return new Point(0, 0);
    }

    /**
     * Determines whether or not the given point is within the bounds of the terminal
     * @param {PointLike} px The point or size to check, or the x coordinate
     * @param {number} [y] The y coordinate
     * @returns {boolean} Whether or not the point is within the bounds of the terminal
     * @throws {Error} If the arguments are invalid
     */
    static inBounds(px, y) {
        return pointLikeParsing(px, y, (x, y) => x >= 0 && x < process.stdout.columns && y >= 0 && y < process.stdout.rows);
    }

    /**
     * Creates a new point from the given point, size, array, or coordinates
     * @param {(Point|Size|number|number[]|{x: number, y:number})} psx The point or size to create a new point from, or the x coordinate
     * @param {number} [y] The y coordinate
     * @returns {Point} The new point
     */
    static of(psx, y) {
        return pointLikeParsing(psx, y, (x, y) => new Point(x, y));
    }
}

/**
 * A matrix for transforming points
 * @class
 */
class Matrix {
    /**
     * The identity matrix
     * @param {number} a The a value
     * @param {number} b The b value
     * @param {number} c The c value
     * @param {number} d The d value
     * @param {number} e The e value
     * @param {number} f The f value
     */
    constructor(a, b, c, d, e, f) {
        /**
         * The a value
         * @type {number}
         */
        this.a = a;
        /**
         * The b value
         * @type {number}
        */
        this.b = b;
        /**
         * The c value
         * @type {number}
        */
        this.c = c;
        /**
         * The d value
         * @type {number}
        */
        this.d = d;
        /**
         * The e value
         * @type {number}
        */
        this.e = e;
        /**
         * The f value
         * @type {number}
        */
        this.f = f;
    }
}

/**
 * A size in 2D space
 * @class
 * @example
 * // Create a new size of (10, 10)
 * const size = new Size(10, 10);
 */
class Size {
    /**
     * Creates a new Size
     * @param {number} width The width
     * @param {number} height The height
     */
    constructor(width, height) {
        if (!Point.inBounds(width, height)) throw new Error('Invalid arguments. Size coordinates must be within the bounds of the terminal');
        
        /**
         * The width
         * @type {number}
         */
        this.width = Math.round(width);
        /**
         * The height
         * @type {number}
        */
        this.height = Math.round(height);
    }
}

export { Point, Matrix, Size }