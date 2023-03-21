import { Paint } from "./paint.js";
import { Point } from "./geo.js";
// TODO: use drawLineTo instead of drawLine for less operations
/**
 * @enum {Symbol} PathOperationType
 * @property {Symbol} MoveToPoint
 * @property {Symbol} AddLineToPoint
 * @property {Symbol} AddQuadCurveToPoint
 * @property {Symbol} AddCurveToPoint
 * @property {Symbol} Subpath
 * @property {Symbol} MaskSubpath
 * @readonly
 * @private
 */
const OperationType = Object.freeze({
    MoveToPoint: Symbol("MoveToPoint"),
    AddLineToPoint: Symbol("AddLineToPoint"),
    AddQuadCurveToPoint: Symbol("AddQuadCurveToPoint"),
    AddCurveToPoint: Symbol("AddCurveToPoint"),
    Subpath: Symbol("Subpath"),
    MaskSubpath: Symbol("MaskSubpath"),
});

/**
 * @typedef {Object} Operation
 * @property {OperationType} type
 * @property {Point[]} points
 * @readonly
 * @private
 */

const Operations = Object.freeze({
    [OperationType.MoveToPoint]: {
        run: function(path, points, operation, mode) {
            path._renderLocation = points[0];     
            return `\x1b[${path._renderLocation.y};${path._renderLocation.x}H`;
        },
        render: true, // This operation is applied when rendering
    },

    [OperationType.AddLineToPoint]: {
        run: function (path, points, operation, mode) {
            let start = path._renderLocation;
            let end = points[0];

            let dx = Math.abs(end.x - start.x);
            let sx = start.x < end.x ? 1 : -1;
            let dy = Math.abs(end.y - start.y);
            let sy = start.y < end.y ? 1 : -1;
            let err = (dx > dy ? dx : -dy) / 2;

            let x = start.x;
            let y = start.y;
            let toBeWritten = "";
            switch (mode) {
                case Paint.Mode.Paint:
                    toBeWritten = "\x1b[" + path.paint.strokeColor.toEscapeCode();
                    while (true) {
                        toBeWritten += `\x1b[${y};${x}H█`
                        if (x === end.x && y === end.y) break;
                        let e2 = err;
                        if (e2 > -dx) { err -= dy; x += sx; }
                        if (e2 < dy) { err += dx; y += sy; }
                    }
                    break;
                case Paint.Mode.Clear:
                    while (true) {
                        toBeWritten += `\x1b[${y};${x}H `;
                        if (x === end.x && y === end.y) break;
                        let e2 = err;
                        if (e2 > -dx) { err -= dy; x += sx; }
                        if (e2 < dy) { err += dx; y += sy; }
                    }
                    break;
                case Paint.Mode.Gradient:
                    while (true) {
                        toBeWritten += `\x1b[${y};${x}H\x1b[3${path.paint.strokeColor.getColorAt(start, new Point(x, y), end)}█`;
                        if (x === end.x && y === end.y) break;
                        let e2 = err;
                        if (e2 > -dx) { err -= dy; x += sx; }
                        if (e2 < dy) { err += dx; y += sy; }
                    }
                    break;
            }
            path._renderLocation = end;
            return toBeWritten;
        },
        render: true
    },

    [OperationType.AddQuadCurveToPoint]: {
        run: function (path, points, operation) {
            let start = path.currentPoint;
            let control = points[0];
            let end = points[1];

            let nseg = 10;
            let currx = start.x;
            let curry = start.y;
            for (let i = 0; i < nseg; i++) {
                let t = i / nseg;
                let a = Math.pow(1 - t, 2);
                let b = 2 * t * (1 - t);
                let c = Math.pow(t, 2);

                currx = Math.floor(a * start.x + b * control.x + c * end.x + 0.5);
                curry = Math.floor(a * start.y + b * control.y + c * end.y + 0.5);

                if (i > 0) {
                    path.lineTo(new Point(currx, curry));
                }
            }
        },
        render: false, // This operation adds new operations to the path, so it is not applied when rendering
    },

    [OperationType.AddCurveToPoint]: {
        run: function (path, points, operation) {
            let start = path.currentPoint;
            let control1 = points[0];
            let control2 = points[1];
            let end = points[2];
            let nseg = Math.floor(Math.sqrt(Math.pow(process.stdout.columns, 2) + Math.pow(process.stdout.rows, 2)) / 2);

            for (let i = 0; i < nseg; i++) {
                let t = i / nseg;
                let a = Math.pow(1 - t, 3);
                let b = 3 * t * Math.pow(1 - t, 2);
                let c = 3 * Math.pow(t, 2) * (1 - t);
                let d = Math.pow(t, 3);

                let x = Math.floor(a * start.x + b * control1.x + c * control2.x + d * end.x);
                let y = Math.floor(a * start.y + b * control1.y + c * control2.y + d * end.y);

                path.lineTo(new Point(x, y));
            }
        },
        render: false,
    },

    [OperationType.Subpath]: {
        run: function (path, points, operation, mode) {
            return operation.path._render(mode, true, false);
        },
        render: true
    },

    [OperationType.MaskSubpath]: {
        run: function (path, points, operation, mode) {
            return operation.path._render(Paint.Mode.Clear, true, false);
        },
        render: true
    }
});

export { OperationType, Operations }