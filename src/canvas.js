/**
 * @module Canvas
 */

import { Operations, OperationType } from "./operations.js";
import { Color, Paint } from "./paint.js";
import { Size, Point, Matrix } from "./geo.js";

const KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);

/**
 * A canvas for drawing paths
 * @class
 * @example
 * // Create a new canvas, with a stroke of red
 * const canvas = new Canvas(new Paint(Color.red));
 */
class Canvas {
    /**
     * The pathing operations
     * @type {import("./operations.js").Operation[]}
     * @private
     * @memberof Canvas
     */
    operations = [];

    /**
     * Whether or not the path is closed
     * @type {boolean}
     * @private
     * @memberof Canvas
     */
    _closed = false;

    /**
     * The current point
     * @type {Point}
     * @memberof Canvas
     * @readonly
     */
    get currentPoint() {
        let op = this.operations[this.operations.length - 1];
        if (!op || op.points.length < 1) return this.startPoint;
        return op.points[op.points.length - 1];
    }

    /**
     * Whether or not the path is closed
     * @type {boolean}
     * @readonly
     * @memberof Canvas
     */
    get isClosed() {
        return this._closed;
    }

    /**
     * The size of the canvas (The size of the terminal)
     * @type {Size}
     * @readonly
     */
    get size() {
        return new Size(process.stdout.columns, process.stdout.rows);
    }

    /**
     * Creates a new `Canvas`
     * @param {Paint} paint The paint to use for rendering
     * @param {Point} [startPoint=Point.zero()] The starting point of the path 
     */
    constructor(paint, startPoint = Point.zero()) {
        /**
         * The paint to use for rendering
         * @type {Paint}
         */
        this.paint = paint;
        /**
         * The starting point of the path
         * @type {Point}
         * @readonly
         */
        this.startPoint = startPoint;
        /**
         * The current point of the path's rendering operations
         * @type {Point}
         * @private
         */
        this._renderLocation = startPoint;
    }

    /**
     * Draws the current canvas to the terminal
     * @param {boolean} [clear=true] Whether or not to clear the screen before rendering 
     */
    draw(clear = true) {
        this._render(Paint.Mode.Paint, !clear);
    }

    /**
     * Without resetting the operations, clears the canvas
     */
    clear() {
        this.clearRect(Point.zero(), this.size);
    }

    /**
     * Renders the canvas
     * @param {Paint.Mode} mode The mode to render in
     * @param {boolean} doNotClear Whether or not to clear the screen before rendering
     * @param {boolean} print Whether or not to print the output to the terminal, or return it as a string
     * @returns {(string|undefined)}
     * @private
     */
    _render(mode = Paint.Mode.Paint, doNotClear = false, print = true) {
        // Move to the top left corner
        let toWrite = `\x1b[0;0H`;

        // Clear the screen
        if (!doNotClear) {
            toWrite += "\x1b[2J";
        }


        if (mode === Paint.Mode.Clear) {
            toWrite += "\x1b[0m";
        }

        // Apply the render operations
        for (let i = 0; i < this.operations.length; ++i) {
            let operation = this.operations[i];
            toWrite += Operations[operation.type].run(this, operation.points, operation, mode);
        }
        // Finalize the rendering by filling the path IF it is closed
        if (this.isClosed && this.paint.fillColor !== Color.None) {
            let char = "";
            switch (mode) {
                case Paint.Mode.Paint:
                    toWrite += "\x1b[" + this.paint.fillColor.toEscapeCode();
                    char = "█";
                    break;
                case Paint.Mode.Clear:
                    toWrite += "\x1b[0m";
                    char = " ";
                    break;
                case Paint.Mode.Gradient:
                    // TODO: Implement gradient rendering for the background
                    break;
            }

            if (char.length > 0) {
                for (let i = 0; i < process.stdout.rows; ++i) {
                    for (let j = 0; j < process.stdout.columns; ++j) {
                        let p = new Point(j, i);
                        if (this.isPointInPath(p) && !this.isPointInStroke(p)) {
                            toWrite += `\x1b[${i};${j}H${char}`
                        }
                    }
                }
            }
        }
        // Move to the bottom right corner
        if (!print) return toWrite;
        process.stdout.write(toWrite + `\x1b[${process.stdout.rows};${process.stdout.columns}H`);
    }

    /**
     * Applies an operation to the canvas
     * @param {import("./operations.js").Operation} operation 
     * @private
     */
    _applyOperation(operation) {
        if (this.isClosed) throw new Error("Cannot apply operation to a closed path");

        if (!Operations[operation.type].render) {
            Operations[operation.type].run(this, operation.points, operation);
        } else this.operations.push(operation);
    }

    // arc (Do we need this?)
    /**
     * Draws an arc
     * @param {Point} center The center-point of the arc
     * @param {number} radius The radius of the arc
     * @param {number} startAngle The angle to start at
     * @param {number} endAngle The angle to end at
     * @param {boolean} [anticlockwise=false] Whether or not to draw the arc in an anticlockwise direction 
     */
    arc(center, radius, startAngle, endAngle, anticlockwise = false) {
        let arcPath = this.subpathAt(new Point(center.x + radius * Math.cos(startAngle), center.y + radius * Math.sin(startAngle)));

        let angleIncrement = Math.PI / 180;
        if (anticlockwise) angleIncrement *= -1;
        let angle = startAngle + angleIncrement;

        let lastPoint = new Point(-1, -1);
        while (angle < endAngle) {
            angle += angleIncrement;

            let currentPoint = new Point(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle));
            if (!lastPoint.equals(currentPoint)) {
                arcPath.lineTo(currentPoint);
                lastPoint = currentPoint;
            }
        }

        arcPath.close();
    }
    // arcTo
    /**
     * Draws an arc through two controls points
     * @param {Point} controlPoint1 The first control point
     * @param {Point} controlPoint2 The second control point
     * @param {number} radius The radius of the arc
     */
    arcTo(controlPoint1, controlPoint2, radius) {
        let angle = Math.atan2(controlPoint1.y - controlPoint2.y, controlPoint1.x - controlPoint2.x);
        let controlPoint1Offset = new Point(
            radius * KAPPA * Math.cos(angle + Math.PI / 2),
            radius * KAPPA * Math.sin(angle + Math.PI / 2)
        );
        let controlPoint2Offset = new Point(
            radius * KAPPA * Math.cos(angle + Math.PI / 2 + Math.PI),
            radius * KAPPA * Math.sin(angle + Math.PI / 2 + Math.PI)
        );

        this.bezierCurveTo(new Point(
            controlPoint1.x + controlPoint1Offset.x,
            controlPoint1.y + controlPoint1Offset.y
        ), new Point(
            controlPoint2.x + controlPoint2Offset.x,
            controlPoint2.y + controlPoint2Offset.y
        ), controlPoint2);
    }

    /**
     * Gets the bounds of the path, hoping that the path is closed
     * @returns {Point[]} The points that make up the path bounds
     */
    getBounds() {
        // If the path is open, then the bounds will work "mostly" correctly (TODO: Open path bounds?)
        // But, when determining if a point is inside the path, the bounds will only function on mostly CLOSED polygons within the open path
        let bounds = [];
        let currentPoint = this.operations[0].points.length > 0 ? this.operations[0].points[0] : this.startPoint;
        let currentSlope = null;
        for (let i = 0; i < this.operations.length; ++i) {
            let operation = this.operations[i];
            switch (operation.type) {
                case OperationType.MoveToPoint:
                    currentPoint = operation.points[0];
                    currentSlope = null;
                    break;
                case OperationType.AddLineToPoint:
                    let newSlope = (operation.points[0].y - currentPoint.y) / (operation.points[0].x - currentPoint.x);
                    if (newSlope === currentSlope) {
                        // Merge the lines
                        bounds[bounds.length - 1] = operation.points[0];
                    } else {
                        bounds.push(operation.points[0]);
                    }
                    currentPoint = operation.points[0];
                    currentSlope = newSlope;
                    break;
            }
        }

        return bounds;
    }

    // beginPath - Opens a new subpath
    /**
     * Creates a new subpath at the current point 
     * @param {Paint} [paint=this.paint] The paint to use for the subpath 
     * @returns {Canvas} The subpath
     */
    beginPath(paint = this.paint) {
        let startPoint;
        if (this.operations.length > 0) {
            for (let i = this.operations.length - 1; i >= 0; i--) {
                if (this.operations[i].points.length > 0) {
                    startPoint = this.operations[i].points[this.operations[i].points.length - 1];
                    break;
                }
            }
        } else startPoint = this._renderLocation;

        let subpath = new Canvas(paint, startPoint);

        this._applyOperation({
            type: OperationType.Subpath,
            paint: paint,
            points: [],
            path: subpath
        });

        return subpath;
    }

    /**
     * Draws a cubic bezier curve from the current point to the specified point
     * @param {Point} controlPoint1 The first control point
     * @param {Point} controlPoint2 The second control point
     * @param {Point} endPoint The end point
     */
    bezierCurveTo(controlPoint1, controlPoint2, endPoint) {
        this._applyOperation({
            type: OperationType.AddCurveToPoint,
            points: [controlPoint1, controlPoint2, endPoint]
        });
    }

    // clearRect
    /**
     * Clears a rectangle at the specified point in the screen
     * @param {Point} start The top left corner of the rectangle
     * @param {Size} size The size of the rectangle
     */
    clearRect(start, size) {
        let subpath = this.subpathAt(start);
        subpath.lineTo(new Point(start.x, start.y + size.height));
        subpath.lineTo(new Point(start.x + size.width, start.y + size.height));
        subpath.lineTo(new Point(start.x + size.width, start.y));
        subpath.close();

        this._applyOperation({
            type: OperationType.MaskSubpath,
            points: [],
            path: subpath
        });

    }
    // clip
    /**
     * Clears a path out of the current path (like a mask)
     * @param {Canvas} path The path to clip to
     */
    clip(path) {
        this._applyOperation({
            type: OperationType.MaskSubpath,
            points: [],
            path: path
        });
    }

    /**
     * Closes the last opened subpath, or closes the path if no subpaths are open
     */
    close() {
        if (this.closed) throw new Error("Cannot close a path that is already closed");
        // Close the path
        if (this.currentPoint.x !== this.startPoint.x || this.currentPoint.y !== this.startPoint.y) {
            this._applyOperation({
                type: OperationType.AddLineToPoint,
                points: [this.startPoint]
            });
        }
        this._closed = true;
    }

    // createConicGradient (See ConicGradient)
    // createImageData (TODO - Image Library)
    // createLinearGradient (See LinearGradient)
    // createPattern (TODO - Image Library)
    // createRadialGradient (See RadialGradient)
    // drawFocusIfNeeded (Not needed)
    // drawImage (TODO - Image Library)
    // ellipse
    /**
     * Draws an ellipse
     * @param {Point} center The center of the ellipse
     * @param {number} radiusX The radius of the ellipse on the x axis
     * @param {number} radiusY The radius of the ellipse on the y axis
     * @param {number} rotation The rotation of the ellipse (in radians)
     * @param {number} startAngle The start angle of the ellipse (in radians)
     * @param {number} endAngle The end angle of the ellipse (in radians)
     */
    ellipse(center, radiusX, radiusY, rotation, startAngle, endAngle) {
        // Same as a arc, but with a radiusX and radiusY, and a rotation
        // So, we need to reimpliment the arc function with our own math

        let angle = startAngle;
        let angleStep = Math.PI / 180;

        let x = center.x + radiusX * Math.cos(angle);
        let y = center.y + radiusY * Math.sin(angle);

        let xDiff = x - center.x;
        let yDiff = y - center.y;

        let x2 = xDiff * Math.cos(rotation) - yDiff * Math.sin(rotation);
        let y2 = xDiff * Math.sin(rotation) + yDiff * Math.cos(rotation);

        let lastPoint = new Point(
            x2 + center.x,
            y2 + center.y
        );

        let subpath = this.subpathAt(lastPoint)
        
        while (angle < endAngle) {
            angle += angleStep;

            let x = center.x + radiusX * Math.cos(angle);
            let y = center.y + radiusY * Math.sin(angle);

            let xDiff = x - center.x;
            let yDiff = y - center.y;

            let x2 = xDiff * Math.cos(rotation) - yDiff * Math.sin(rotation);
            let y2 = xDiff * Math.sin(rotation) + yDiff * Math.cos(rotation);

            let point = new Point(x2 + center.x, y2 + center.y);
            if (point.x !== lastPoint.x || point.y !== lastPoint.y) {
                subpath.lineTo(point);
                lastPoint = point;
            }
        }

        subpath.close();
    }
    // fill (Not needed)
    // fillRect (Not needed)
    // fillText (TODO)
    // getContextAttributes (Not needed)
    // getImageData (Not needed)
    // getLineDash (Not needed)
    // getTransform (Not needed)
    // isContextLost (Experimental)
    // isPointInPath
    /**
     * Checks if the specified point is in the path
     * @param {Point} point The point to check
     * @returns {boolean} Whether or not the point is in the path
     */
    isPointInPath(point) {
        if (!this.bounds) this.bounds = this.getBounds();

        if (point.x > this.bounds.width || point.x < 0 || point.y > this.bounds.height || point.y < 0) return false;
        let windingNumber = 0;
        let prev = this.bounds[this.bounds.length - 1];
        for (let i = 0; i < this.bounds.length; ++i) {
            let curr = this.bounds[i];
            if ((curr.y > point.y) !== (prev.y > point.y)) {
                const isLeft = (prev.x - curr.x) * (point.y - curr.y) - (point.x - curr.x) * (prev.y - curr.y);
                if ((curr.y > point.y) ? isLeft > 0 : isLeft < 0) {
                    windingNumber += (curr.y > prev.y) ? 1 : -1;
                }
            }
            prev = curr;
        }
        return windingNumber !== 0;
    }

    // isPointInStroke
    /**
     * Determines if the specified point is in the stroke
     * @param {Point} point The point to check
     * @param {Point} start The start point of the line
     * @param {Point} end The end point of the line
     * @returns {boolean} Whether or not the point is in the stroke
     */
    isPointInStroke(point, start, end) {
        if (start && end) {
            // Is the point between the start and end points? (Use Bresenham's line algorithm)
            let dx = Math.abs(end.x - start.x);
            let sx = start.x < end.x ? 1 : -1;
            let dy = Math.abs(end.y - start.y);
            let sy = start.y < end.y ? 1 : -1;
            let err = (dx > dy ? dx : -dy) / 2;

            let x = start.x;
            let y = start.y;

            while (true) {
                if (x === point.x && y === point.y) return true;
                if (x === end.x && y === end.y) break;
                let e2 = err;
                if (e2 > -dx) { err -= dy; x += sx; }
                if (e2 < dy) { err += dx; y += sy; }
            }
            return false;

        } else {
            // Check if the point is on ANY of the lines in the path
            let currentPoint = this.startPoint;
            for (let i = 0; i < this.operations.length; ++i) {
                let operation = this.operations[i];
                switch (operation.type) {
                    case OperationType.AddLineToPoint:
                        if (this.isPointInStroke(point, currentPoint, operation.points[0])) return true;
                        currentPoint = operation.points[0];
                        break;
                    case OperationType.Subpath:
                        if (operation.path.isPointInStroke(point)) return true;
                        currentPoint = operation.path.currentPoint;
                        break;
                }
            }
            return false;
        }
    }

    /**
     * Draws a line from the current point to the specified point
     * @param {Point} point The point to draw a line to
    */
    lineTo(point) {
        this._applyOperation({
            type: OperationType.AddLineToPoint,
            points: [point]
        });
    }

    // measureText
    // moveTo => subpathAt
    /**
     * Moves the current point to the specified point
     * @param {Point} point The point to move to
     * @returns {Canvas}
     */
    subpathAt(point) {
        let sp = this.beginPath();
        sp.startPoint = point;
        sp._renderLocation = point;
        return sp;
    }
    // putImageData

    /**
     * Draws a quadratic bezier curve from the current point to the specified point
     * @param {Point} controlPoint The control point
     * @param {Point} endPoint The end point
     */
    quadraticCurveTo(controlPoint, endPoint) {
        this._applyOperation({
            type: OperationType.AddQuadCurveToPoint,
            points: [controlPoint, endPoint]
        });
    }

    /**
     * Draws a rectangle
     * @param {Point} startingPoint The starting point of the rectangle (top left)
     * @param {Size} size The size of the rectangle
     */
    rect(startingPoint, size) {
        // TODO: We don't need two subpaths, we can just use one

        // We make a subpath with four lines (top, right, bottom, left)
        // We then close the subpath
        let subpath = this.subpathAt(startingPoint);
        subpath.lineTo(new Point(startingPoint.x, startingPoint.y + size.height));
        subpath.lineTo(new Point(startingPoint.x + size.width, startingPoint.y + size.height));
        subpath.lineTo(new Point(startingPoint.x + size.width, startingPoint.y));
        subpath.close();
    }

    // reset (Experimental)
    /**
     * Resets the path, including all the operations
     * @param {Point} start The new starting point
     */
    reset(start = this.startPoint) {
        this.operations = [];
        this._closed = false;
        this.startPoint = start;
        this._renderLocation = start;
        this.bounds = null;
    }
    // resetTransform (Not needed)
    // restore
    // rotate
    // roundRect
    /**
     * Makes a rounded rectangle
     * @param {Point} startingPoint The starting point
     * @param {Size} size The size of the rectangle
     * @param {(number[]|number)} radii The radii of the corners. If it is a number, or number[1], it will be applied to all corners. If it is a number[2], the first element will apply to the top left and bottom right corners, and the second element will apply to the top right and bottom left corners. If it is a number[4], then the array will be applied to the top left, top right, bottom right, and bottom left corners, respectively.
     */
    roundRect(startingPoint, size, radii) {
        let topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius;
        if (typeof radii === "number") {
            topLeftRadius = topRightRadius = bottomLeftRadius = bottomRightRadius = radii;
        } else if (Array.isArray(radii)) {
            if (radii.length === 1) {
                topLeftRadius = topRightRadius = bottomLeftRadius = bottomRightRadius = radii[0];
            } else if (radii.length === 2) {
                topLeftRadius = bottomRightRadius = radii[0];
                topRightRadius = bottomLeftRadius = radii[1];
            } else {
                topLeftRadius = radii[0];
                topRightRadius = radii[1];
                bottomRightRadius = radii[2];
                bottomLeftRadius = radii[3];
            }
        } else throw new Error("Invalid radii");

        let subpath = this.subpathAt(startingPoint);
        subpath.lineTo(new Point(startingPoint.x + size.width - topRightRadius, startingPoint.y));
        subpath.quadraticCurveTo(new Point(startingPoint.x + size.width, startingPoint.y), new Point(startingPoint.x + size.width, startingPoint.y + topRightRadius));
        subpath.lineTo(new Point(startingPoint.x + size.width, startingPoint.y + size.height - bottomRightRadius));
        subpath.quadraticCurveTo(new Point(startingPoint.x + size.width, startingPoint.y + size.height), new Point(startingPoint.x + size.width - bottomRightRadius, startingPoint.y + size.height));
        subpath.lineTo(new Point(startingPoint.x + bottomLeftRadius, startingPoint.y + size.height));
        subpath.quadraticCurveTo(new Point(startingPoint.x, startingPoint.y + size.height), new Point(startingPoint.x, startingPoint.y + size.height - bottomLeftRadius));
        subpath.lineTo(new Point(startingPoint.x, startingPoint.y + topLeftRadius));
        subpath.quadraticCurveTo(new Point(startingPoint.x, startingPoint.y), new Point(startingPoint.x + topLeftRadius, startingPoint.y));
        subpath.close();
    }
    // save
    // scale (TODO)
    // scrollPathIntoView (Experimental, not needed)
    // setLineDash (TODO)
    // setTransform (See transform)
    // stroke (Not needed)
    // strokeRect (Not needed)
    // strokeText (Not needed)
    // transform
    /**
     * Transforms all the points in the path by the specified matrix
     * @param {Matrix} matrix The matrix to transform the path by
     */
    transform(matrix) {
        for (let i = 0; i < this.operations.length; ++i) {
            let operation = this.operations[i];
            if (operation.type === OperationType.Subpath || operation.type === OperationType.MaskSubpath) {
                operation.path.transform(matrix);
                continue;
            }
            for (let j = 0; j < operation.points.length; ++j) {
                operation.points[j].transform(matrix);
            }
        }
    }
    // translate
    /**
     * Translates all the points in the path by the specified amount
     * @param {number} x The x value to translate by
     * @param {number} y The y value to translate by
     */
    translate(x, y) {
        for (let i = 0; i < this.operations.length; ++i) {
            let operation = this.operations[i];
            if (operation.type === OperationType.Subpath || operation.type === OperationType.MaskSubpath) {
                operation.path.translate(x, y);
                continue;
            }
            for (let j = 0; j < operation.points.length; ++j) {
                operation.points[j].x += Math.round(x);
                operation.points[j].y += Math.round(y);
                if (!this.inBounds(operation.points[j]))
                    throw new Error(`Point ${operation.points[j].x}, ${operation.points[j].y} is out of bounds!`);
            }
        }
    }

    /**
     * Adds a subpath to the path, and optionally applies a transform to it
     * @param {Path} path The subpath to add
     * @param {Matrix} [transform] The optional transform to apply to the subpath
     */
    addPath(path, transform) {
        // TODO: Make new points instead of modifying the old ones (Should be really easy)z
        for (let i = 0; i < path.operations.length; ++i) {
            if (transform instanceof Matrix) path.operations[i].points.forEach(point => point.transformByMatrix(transform));
        }
        this.operations.push({
            type: OperationType.Subpath,
            points: [],
            path
        });
    }
}

export { Canvas };