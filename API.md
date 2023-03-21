## Modules

<dl>
<dt><a href="#module_Canvas">Canvas</a></dt>
<dd></dd>
<dt><a href="#module_Geometry">Geometry</a></dt>
<dd></dd>
<dt><a href="#module_Paint">Paint</a></dt>
<dd></dd>
</dl>

<a name="module_Canvas"></a>

## Canvas

* [Canvas](#module_Canvas)
    * [~Canvas](#module_Canvas..Canvas)
        * [new Canvas(paint, [startPoint])](#new_module_Canvas..Canvas_new)
        * [.size](#module_Canvas..Canvas+size) : <code>Size</code>
        * [.paint](#module_Canvas..Canvas+paint) : <code>Paint</code>
        * [.startPoint](#module_Canvas..Canvas+startPoint) : <code>Point</code>
        * [.draw([clear])](#module_Canvas..Canvas+draw)
        * [.clear()](#module_Canvas..Canvas+clear)
        * [.arc(center, radius, startAngle, endAngle, [anticlockwise])](#module_Canvas..Canvas+arc)
        * [.arcTo(controlPoint1, controlPoint2, radius)](#module_Canvas..Canvas+arcTo)
        * [.getBounds()](#module_Canvas..Canvas+getBounds) ⇒ <code>Array.&lt;Point&gt;</code>
        * [.beginPath([paint])](#module_Canvas..Canvas+beginPath) ⇒ <code>Canvas</code>
        * [.bezierCurveTo(controlPoint1, controlPoint2, endPoint)](#module_Canvas..Canvas+bezierCurveTo)
        * [.clearRect(start, size)](#module_Canvas..Canvas+clearRect)
        * [.clip(path)](#module_Canvas..Canvas+clip)
        * [.close()](#module_Canvas..Canvas+close)
        * [.ellipse(center, radiusX, radiusY, rotation, startAngle, endAngle)](#module_Canvas..Canvas+ellipse)
        * [.isPointInPath(point)](#module_Canvas..Canvas+isPointInPath) ⇒ <code>boolean</code>
        * [.isPointInStroke(point, start, end)](#module_Canvas..Canvas+isPointInStroke) ⇒ <code>boolean</code>
        * [.lineTo(point)](#module_Canvas..Canvas+lineTo)
        * [.subpathAt(point)](#module_Canvas..Canvas+subpathAt) ⇒ <code>Canvas</code>
        * [.quadraticCurveTo(controlPoint, endPoint)](#module_Canvas..Canvas+quadraticCurveTo)
        * [.rect(startingPoint, size)](#module_Canvas..Canvas+rect)
        * [.reset(start)](#module_Canvas..Canvas+reset)
        * [.roundRect(startingPoint, size, radii)](#module_Canvas..Canvas+roundRect)
        * [.transform(matrix)](#module_Canvas..Canvas+transform)
        * [.translate(x, y)](#module_Canvas..Canvas+translate)
        * [.addPath(path, [transform])](#module_Canvas..Canvas+addPath)

<a name="module_Canvas..Canvas"></a>

### Canvas~Canvas
A canvas for drawing paths

**Kind**: inner class of [<code>Canvas</code>](#module_Canvas)  

* [~Canvas](#module_Canvas..Canvas)
    * [new Canvas(paint, [startPoint])](#new_module_Canvas..Canvas_new)
    * [.size](#module_Canvas..Canvas+size) : <code>Size</code>
    * [.paint](#module_Canvas..Canvas+paint) : <code>Paint</code>
    * [.startPoint](#module_Canvas..Canvas+startPoint) : <code>Point</code>
    * [.draw([clear])](#module_Canvas..Canvas+draw)
    * [.clear()](#module_Canvas..Canvas+clear)
    * [.arc(center, radius, startAngle, endAngle, [anticlockwise])](#module_Canvas..Canvas+arc)
    * [.arcTo(controlPoint1, controlPoint2, radius)](#module_Canvas..Canvas+arcTo)
    * [.getBounds()](#module_Canvas..Canvas+getBounds) ⇒ <code>Array.&lt;Point&gt;</code>
    * [.beginPath([paint])](#module_Canvas..Canvas+beginPath) ⇒ <code>Canvas</code>
    * [.bezierCurveTo(controlPoint1, controlPoint2, endPoint)](#module_Canvas..Canvas+bezierCurveTo)
    * [.clearRect(start, size)](#module_Canvas..Canvas+clearRect)
    * [.clip(path)](#module_Canvas..Canvas+clip)
    * [.close()](#module_Canvas..Canvas+close)
    * [.ellipse(center, radiusX, radiusY, rotation, startAngle, endAngle)](#module_Canvas..Canvas+ellipse)
    * [.isPointInPath(point)](#module_Canvas..Canvas+isPointInPath) ⇒ <code>boolean</code>
    * [.isPointInStroke(point, start, end)](#module_Canvas..Canvas+isPointInStroke) ⇒ <code>boolean</code>
    * [.lineTo(point)](#module_Canvas..Canvas+lineTo)
    * [.subpathAt(point)](#module_Canvas..Canvas+subpathAt) ⇒ <code>Canvas</code>
    * [.quadraticCurveTo(controlPoint, endPoint)](#module_Canvas..Canvas+quadraticCurveTo)
    * [.rect(startingPoint, size)](#module_Canvas..Canvas+rect)
    * [.reset(start)](#module_Canvas..Canvas+reset)
    * [.roundRect(startingPoint, size, radii)](#module_Canvas..Canvas+roundRect)
    * [.transform(matrix)](#module_Canvas..Canvas+transform)
    * [.translate(x, y)](#module_Canvas..Canvas+translate)
    * [.addPath(path, [transform])](#module_Canvas..Canvas+addPath)

<a name="new_module_Canvas..Canvas_new"></a>

#### new Canvas(paint, [startPoint])
Creates a new `Canvas`


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| paint | <code>Paint</code> |  | The paint to use for rendering |
| [startPoint] | <code>Point</code> | <code>Point.zero()</code> | The starting point of the path |

**Example**  
```js
// Create a new canvas, with a stroke of red
const canvas = new Canvas(new Paint(Color.red));
```
<a name="module_Canvas..Canvas+size"></a>

#### canvas.size : <code>Size</code>
The size of the canvas (The size of the terminal)

**Kind**: instance property of [<code>Canvas</code>](#module_Canvas..Canvas)  
**Read only**: true  
<a name="module_Canvas..Canvas+paint"></a>

#### canvas.paint : <code>Paint</code>
The paint to use for rendering

**Kind**: instance property of [<code>Canvas</code>](#module_Canvas..Canvas)  
<a name="module_Canvas..Canvas+startPoint"></a>

#### canvas.startPoint : <code>Point</code>
The starting point of the path

**Kind**: instance property of [<code>Canvas</code>](#module_Canvas..Canvas)  
**Read only**: true  
<a name="module_Canvas..Canvas+draw"></a>

#### canvas.draw([clear])
Draws the current canvas to the terminal

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [clear] | <code>boolean</code> | <code>true</code> | Whether or not to clear the screen before rendering |

<a name="module_Canvas..Canvas+clear"></a>

#### canvas.clear()
Without resetting the operations, clears the canvas

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  
<a name="module_Canvas..Canvas+arc"></a>

#### canvas.arc(center, radius, startAngle, endAngle, [anticlockwise])
Draws an arc

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| center | <code>Point</code> |  | The center-point of the arc |
| radius | <code>number</code> |  | The radius of the arc |
| startAngle | <code>number</code> |  | The angle to start at |
| endAngle | <code>number</code> |  | The angle to end at |
| [anticlockwise] | <code>boolean</code> | <code>false</code> | Whether or not to draw the arc in an anticlockwise direction |

<a name="module_Canvas..Canvas+arcTo"></a>

#### canvas.arcTo(controlPoint1, controlPoint2, radius)
Draws an arc through two controls points

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| controlPoint1 | <code>Point</code> | The first control point |
| controlPoint2 | <code>Point</code> | The second control point |
| radius | <code>number</code> | The radius of the arc |

<a name="module_Canvas..Canvas+getBounds"></a>

#### canvas.getBounds() ⇒ <code>Array.&lt;Point&gt;</code>
Gets the bounds of the path, hoping that the path is closed

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  
**Returns**: <code>Array.&lt;Point&gt;</code> - The points that make up the path bounds  
<a name="module_Canvas..Canvas+beginPath"></a>

#### canvas.beginPath([paint]) ⇒ <code>Canvas</code>
Creates a new subpath at the current point

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  
**Returns**: <code>Canvas</code> - The subpath  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [paint] | <code>Paint</code> | <code>this.paint</code> | The paint to use for the subpath |

<a name="module_Canvas..Canvas+bezierCurveTo"></a>

#### canvas.bezierCurveTo(controlPoint1, controlPoint2, endPoint)
Draws a cubic bezier curve from the current point to the specified point

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| controlPoint1 | <code>Point</code> | The first control point |
| controlPoint2 | <code>Point</code> | The second control point |
| endPoint | <code>Point</code> | The end point |

<a name="module_Canvas..Canvas+clearRect"></a>

#### canvas.clearRect(start, size)
Clears a rectangle at the specified point in the screen

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Point</code> | The top left corner of the rectangle |
| size | <code>Size</code> | The size of the rectangle |

<a name="module_Canvas..Canvas+clip"></a>

#### canvas.clip(path)
Clears a path out of the current path (like a mask)

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Canvas</code> | The path to clip to |

<a name="module_Canvas..Canvas+close"></a>

#### canvas.close()
Closes the last opened subpath, or closes the path if no subpaths are open

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  
<a name="module_Canvas..Canvas+ellipse"></a>

#### canvas.ellipse(center, radiusX, radiusY, rotation, startAngle, endAngle)
Draws an ellipse

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| center | <code>Point</code> | The center of the ellipse |
| radiusX | <code>number</code> | The radius of the ellipse on the x axis |
| radiusY | <code>number</code> | The radius of the ellipse on the y axis |
| rotation | <code>number</code> | The rotation of the ellipse (in radians) |
| startAngle | <code>number</code> | The start angle of the ellipse (in radians) |
| endAngle | <code>number</code> | The end angle of the ellipse (in radians) |

<a name="module_Canvas..Canvas+isPointInPath"></a>

#### canvas.isPointInPath(point) ⇒ <code>boolean</code>
Checks if the specified point is in the path

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  
**Returns**: <code>boolean</code> - Whether or not the point is in the path  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Point</code> | The point to check |

<a name="module_Canvas..Canvas+isPointInStroke"></a>

#### canvas.isPointInStroke(point, start, end) ⇒ <code>boolean</code>
Determines if the specified point is in the stroke

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  
**Returns**: <code>boolean</code> - Whether or not the point is in the stroke  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Point</code> | The point to check |
| start | <code>Point</code> | The start point of the line |
| end | <code>Point</code> | The end point of the line |

<a name="module_Canvas..Canvas+lineTo"></a>

#### canvas.lineTo(point)
Draws a line from the current point to the specified point

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Point</code> | The point to draw a line to |

<a name="module_Canvas..Canvas+subpathAt"></a>

#### canvas.subpathAt(point) ⇒ <code>Canvas</code>
Moves the current point to the specified point

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Point</code> | The point to move to |

<a name="module_Canvas..Canvas+quadraticCurveTo"></a>

#### canvas.quadraticCurveTo(controlPoint, endPoint)
Draws a quadratic bezier curve from the current point to the specified point

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| controlPoint | <code>Point</code> | The control point |
| endPoint | <code>Point</code> | The end point |

<a name="module_Canvas..Canvas+rect"></a>

#### canvas.rect(startingPoint, size)
Draws a rectangle

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| startingPoint | <code>Point</code> | The starting point of the rectangle (top left) |
| size | <code>Size</code> | The size of the rectangle |

<a name="module_Canvas..Canvas+reset"></a>

#### canvas.reset(start)
Resets the path, including all the operations

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Point</code> | The new starting point |

<a name="module_Canvas..Canvas+roundRect"></a>

#### canvas.roundRect(startingPoint, size, radii)
Makes a rounded rectangle

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| startingPoint | <code>Point</code> | The starting point |
| size | <code>Size</code> | The size of the rectangle |
| radii | <code>Array.&lt;number&gt;</code> \| <code>number</code> | The radii of the corners. If it is a number, or number[1], it will be applied to all corners. If it is a number[2], the first element will apply to the top left and bottom right corners, and the second element will apply to the top right and bottom left corners. If it is a number[4], then the array will be applied to the top left, top right, bottom right, and bottom left corners, respectively. |

<a name="module_Canvas..Canvas+transform"></a>

#### canvas.transform(matrix)
Transforms all the points in the path by the specified matrix

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Matrix</code> | The matrix to transform the path by |

<a name="module_Canvas..Canvas+translate"></a>

#### canvas.translate(x, y)
Translates all the points in the path by the specified amount

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value to translate by |
| y | <code>number</code> | The y value to translate by |

<a name="module_Canvas..Canvas+addPath"></a>

#### canvas.addPath(path, [transform])
Adds a subpath to the path, and optionally applies a transform to it

**Kind**: instance method of [<code>Canvas</code>](#module_Canvas..Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Path</code> | The subpath to add |
| [transform] | <code>Matrix</code> | The optional transform to apply to the subpath |

<a name="module_Geometry"></a>

## Geometry

* [Geometry](#module_Geometry)
    * [~Point](#module_Geometry..Point)
        * [new Point(x, y)](#new_module_Geometry..Point_new)
        * _instance_
            * [.x](#module_Geometry..Point+x) : <code>number</code>
            * [.y](#module_Geometry..Point+y) : <code>number</code>
            * [.transform(matrix)](#module_Geometry..Point+transform)
            * [.equals(x, [y])](#module_Geometry..Point+equals) ⇒ <code>boolean</code>
        * _static_
            * [.center()](#module_Geometry..Point.center) ⇒ <code>Point</code>
            * [.centerFor(x, [y])](#module_Geometry..Point.centerFor) ⇒ <code>Point</code>
            * [.zero()](#module_Geometry..Point.zero) ⇒ <code>Point</code>
            * [.inBounds(px, [y])](#module_Geometry..Point.inBounds) ⇒ <code>boolean</code>
            * [.of(psx, [y])](#module_Geometry..Point.of) ⇒ <code>Point</code>
    * [~Matrix](#module_Geometry..Matrix)
        * [new Matrix(a, b, c, d, e, f)](#new_module_Geometry..Matrix_new)
        * [.a](#module_Geometry..Matrix+a) : <code>number</code>
        * [.b](#module_Geometry..Matrix+b) : <code>number</code>
        * [.c](#module_Geometry..Matrix+c) : <code>number</code>
        * [.d](#module_Geometry..Matrix+d) : <code>number</code>
        * [.e](#module_Geometry..Matrix+e) : <code>number</code>
        * [.f](#module_Geometry..Matrix+f) : <code>number</code>
    * [~Size](#module_Geometry..Size)
        * [new Size(width, height)](#new_module_Geometry..Size_new)
        * [.width](#module_Geometry..Size+width) : <code>number</code>
        * [.height](#module_Geometry..Size+height) : <code>number</code>
    * [~PointLike](#module_Geometry..PointLike) : <code>Point</code> \| <code>Size</code> \| <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>Object</code>

<a name="module_Geometry..Point"></a>

### Geometry~Point
A point in 2D space

**Kind**: inner class of [<code>Geometry</code>](#module_Geometry)  

* [~Point](#module_Geometry..Point)
    * [new Point(x, y)](#new_module_Geometry..Point_new)
    * _instance_
        * [.x](#module_Geometry..Point+x) : <code>number</code>
        * [.y](#module_Geometry..Point+y) : <code>number</code>
        * [.transform(matrix)](#module_Geometry..Point+transform)
        * [.equals(x, [y])](#module_Geometry..Point+equals) ⇒ <code>boolean</code>
    * _static_
        * [.center()](#module_Geometry..Point.center) ⇒ <code>Point</code>
        * [.centerFor(x, [y])](#module_Geometry..Point.centerFor) ⇒ <code>Point</code>
        * [.zero()](#module_Geometry..Point.zero) ⇒ <code>Point</code>
        * [.inBounds(px, [y])](#module_Geometry..Point.inBounds) ⇒ <code>boolean</code>
        * [.of(psx, [y])](#module_Geometry..Point.of) ⇒ <code>Point</code>

<a name="new_module_Geometry..Point_new"></a>

#### new Point(x, y)
Creates a new Point

**Throws**:

- <code>Error</code> If the arguments are invalid or out of bounds


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x coordinate. (Can be any number from 0 to process.stdout.columns) |
| y | <code>number</code> | The y coordinate. (Can be any number from 0 to process.stdout.rows) |

**Example**  
```js
// Create a new point at (10, 10)
const point = new Point(10, 10);
```
<a name="module_Geometry..Point+x"></a>

#### point.x : <code>number</code>
The x coordinate

**Kind**: instance property of [<code>Point</code>](#module_Geometry..Point)  
<a name="module_Geometry..Point+y"></a>

#### point.y : <code>number</code>
The y coordinate

**Kind**: instance property of [<code>Point</code>](#module_Geometry..Point)  
<a name="module_Geometry..Point+transform"></a>

#### point.transform(matrix)
Transforms the point by the given matrix

**Kind**: instance method of [<code>Point</code>](#module_Geometry..Point)  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Matrix</code> | The matrix to transform the point by |

<a name="module_Geometry..Point+equals"></a>

#### point.equals(x, [y]) ⇒ <code>boolean</code>
Determines whether or not the point is equal to another point

**Kind**: instance method of [<code>Point</code>](#module_Geometry..Point)  
**Returns**: <code>boolean</code> - Whether or not the points are equal  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>PointLike</code> | The point to compare to, or the x coordinate |
| [y] | <code>number</code> | The y coordinate |

<a name="module_Geometry..Point.center"></a>

#### Point.center() ⇒ <code>Point</code>
Creates a new point at the center of the terminal

**Kind**: static method of [<code>Point</code>](#module_Geometry..Point)  
**Returns**: <code>Point</code> - The center point  
<a name="module_Geometry..Point.centerFor"></a>

#### Point.centerFor(x, [y]) ⇒ <code>Point</code>
**Kind**: static method of [<code>Point</code>](#module_Geometry..Point)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>PointLike</code> | The point or size to center, or the x coordinate |
| [y] | <code>number</code> | The y coordinate |

<a name="module_Geometry..Point.zero"></a>

#### Point.zero() ⇒ <code>Point</code>
Creates a new point at (0, 0)

**Kind**: static method of [<code>Point</code>](#module_Geometry..Point)  
**Returns**: <code>Point</code> - A new point at (0, 0)  
<a name="module_Geometry..Point.inBounds"></a>

#### Point.inBounds(px, [y]) ⇒ <code>boolean</code>
Determines whether or not the given point is within the bounds of the terminal

**Kind**: static method of [<code>Point</code>](#module_Geometry..Point)  
**Returns**: <code>boolean</code> - Whether or not the point is within the bounds of the terminal  
**Throws**:

- <code>Error</code> If the arguments are invalid


| Param | Type | Description |
| --- | --- | --- |
| px | <code>PointLike</code> | The point or size to check, or the x coordinate |
| [y] | <code>number</code> | The y coordinate |

<a name="module_Geometry..Point.of"></a>

#### Point.of(psx, [y]) ⇒ <code>Point</code>
Creates a new point from the given point, size, array, or coordinates

**Kind**: static method of [<code>Point</code>](#module_Geometry..Point)  
**Returns**: <code>Point</code> - The new point  

| Param | Type | Description |
| --- | --- | --- |
| psx | <code>Point</code> \| <code>Size</code> \| <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>Object</code> | The point or size to create a new point from, or the x coordinate |
| [y] | <code>number</code> | The y coordinate |

<a name="module_Geometry..Matrix"></a>

### Geometry~Matrix
A matrix for transforming points

**Kind**: inner class of [<code>Geometry</code>](#module_Geometry)  

* [~Matrix](#module_Geometry..Matrix)
    * [new Matrix(a, b, c, d, e, f)](#new_module_Geometry..Matrix_new)
    * [.a](#module_Geometry..Matrix+a) : <code>number</code>
    * [.b](#module_Geometry..Matrix+b) : <code>number</code>
    * [.c](#module_Geometry..Matrix+c) : <code>number</code>
    * [.d](#module_Geometry..Matrix+d) : <code>number</code>
    * [.e](#module_Geometry..Matrix+e) : <code>number</code>
    * [.f](#module_Geometry..Matrix+f) : <code>number</code>

<a name="new_module_Geometry..Matrix_new"></a>

#### new Matrix(a, b, c, d, e, f)
The identity matrix


| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | The a value |
| b | <code>number</code> | The b value |
| c | <code>number</code> | The c value |
| d | <code>number</code> | The d value |
| e | <code>number</code> | The e value |
| f | <code>number</code> | The f value |

<a name="module_Geometry..Matrix+a"></a>

#### matrix.a : <code>number</code>
The a value

**Kind**: instance property of [<code>Matrix</code>](#module_Geometry..Matrix)  
<a name="module_Geometry..Matrix+b"></a>

#### matrix.b : <code>number</code>
The b value

**Kind**: instance property of [<code>Matrix</code>](#module_Geometry..Matrix)  
<a name="module_Geometry..Matrix+c"></a>

#### matrix.c : <code>number</code>
The c value

**Kind**: instance property of [<code>Matrix</code>](#module_Geometry..Matrix)  
<a name="module_Geometry..Matrix+d"></a>

#### matrix.d : <code>number</code>
The d value

**Kind**: instance property of [<code>Matrix</code>](#module_Geometry..Matrix)  
<a name="module_Geometry..Matrix+e"></a>

#### matrix.e : <code>number</code>
The e value

**Kind**: instance property of [<code>Matrix</code>](#module_Geometry..Matrix)  
<a name="module_Geometry..Matrix+f"></a>

#### matrix.f : <code>number</code>
The f value

**Kind**: instance property of [<code>Matrix</code>](#module_Geometry..Matrix)  
<a name="module_Geometry..Size"></a>

### Geometry~Size
A size in 2D space

**Kind**: inner class of [<code>Geometry</code>](#module_Geometry)  

* [~Size](#module_Geometry..Size)
    * [new Size(width, height)](#new_module_Geometry..Size_new)
    * [.width](#module_Geometry..Size+width) : <code>number</code>
    * [.height](#module_Geometry..Size+height) : <code>number</code>

<a name="new_module_Geometry..Size_new"></a>

#### new Size(width, height)
Creates a new Size


| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | The width |
| height | <code>number</code> | The height |

**Example**  
```js
// Create a new size of (10, 10)
const size = new Size(10, 10);
```
<a name="module_Geometry..Size+width"></a>

#### size.width : <code>number</code>
The width

**Kind**: instance property of [<code>Size</code>](#module_Geometry..Size)  
<a name="module_Geometry..Size+height"></a>

#### size.height : <code>number</code>
The height

**Kind**: instance property of [<code>Size</code>](#module_Geometry..Size)  
<a name="module_Geometry..PointLike"></a>

### Geometry~PointLike : <code>Point</code> \| <code>Size</code> \| <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>Object</code>
A point-like object. Can be a Point, Size, number, array, or object with x and y properties.

**Kind**: inner typedef of [<code>Geometry</code>](#module_Geometry)  
<a name="module_Paint"></a>

## Paint

* [Paint](#module_Paint)
    * [~Paint](#module_Paint..Paint)
        * [new Paint(strokeColor, fillColor)](#new_module_Paint..Paint_new)
        * [.strokeColor](#module_Paint..Paint+strokeColor) : <code>Color</code> \| <code>Gradient</code>
        * [.fillColor](#module_Paint..Paint+fillColor) : <code>Color</code> \| <code>Gradient</code>
        * [.Mode](#module_Paint..Paint+Mode) : <code>enum</code>
    * [~Color](#module_Paint..Color)
        * [new Color(r, g, b)](#new_module_Paint..Color_new)
        * _instance_
            * [.depth](#module_Paint..Color+depth) : <code>number</code>
            * [.Black](#module_Paint..Color+Black) : <code>Color</code>
            * [.Red](#module_Paint..Color+Red) : <code>Color</code>
            * [.Green](#module_Paint..Color+Green) : <code>Color</code>
            * [.Blue](#module_Paint..Color+Blue) : <code>Color</code>
            * [.White](#module_Paint..Color+White) : <code>Color</code>
            * [.None](#module_Paint..Color+None) : <code>Color</code>
            * [.r](#module_Paint..Color+r) : <code>number</code>
            * [.g](#module_Paint..Color+g) : <code>number</code>
            * [.b](#module_Paint..Color+b) : <code>number</code>
            * [.toNumber()](#module_Paint..Color+toNumber) ⇒ <code>number</code>
        * _static_
            * [.fromNumber(num)](#module_Paint..Color.fromNumber) ⇒ <code>Color</code>
    * [~LinearGradient](#module_Paint..LinearGradient) ⇐ <code>Gradient</code>
        * [new LinearGradient(angle)](#new_module_Paint..LinearGradient_new)
        * [.getColorAt(fillStart, point, fillEnd)](#module_Paint..LinearGradient+getColorAt) ⇒ <code>Color</code>
    * [~RadialGradient](#module_Paint..RadialGradient) ⇐ <code>Gradient</code>
        * [new RadialGradient()](#new_module_Paint..RadialGradient_new)
        * [.getColorAt(fillStart, point, fillEnd)](#module_Paint..RadialGradient+getColorAt) ⇒ <code>Color</code>
    * [~ConicGradient](#module_Paint..ConicGradient) ⇐ <code>Gradient</code>
        * [new ConicGradient(angle)](#new_module_Paint..ConicGradient_new)
        * [.getColorAt(fillStart, point, fillEnd)](#module_Paint..ConicGradient+getColorAt) ⇒ <code>Color</code>

<a name="module_Paint..Paint"></a>

### Paint~Paint
A paint object

**Kind**: inner class of [<code>Paint</code>](#module_Paint)  

* [~Paint](#module_Paint..Paint)
    * [new Paint(strokeColor, fillColor)](#new_module_Paint..Paint_new)
    * [.strokeColor](#module_Paint..Paint+strokeColor) : <code>Color</code> \| <code>Gradient</code>
    * [.fillColor](#module_Paint..Paint+fillColor) : <code>Color</code> \| <code>Gradient</code>
    * [.Mode](#module_Paint..Paint+Mode) : <code>enum</code>

<a name="new_module_Paint..Paint_new"></a>

#### new Paint(strokeColor, fillColor)
Creates a new paint object


| Param | Type |
| --- | --- |
| strokeColor | <code>Color</code> \| <code>Gradient</code> | 
| fillColor | <code>Color</code> \| <code>Gradient</code> | 

**Example**  
```js
// Create a new paint object with a red stroke and a blue fill
const paint = new Paint(Color.Red, Color.Blue);
```
<a name="module_Paint..Paint+strokeColor"></a>

#### paint.strokeColor : <code>Color</code> \| <code>Gradient</code>
The stroke color

**Kind**: instance property of [<code>Paint</code>](#module_Paint..Paint)  
<a name="module_Paint..Paint+fillColor"></a>

#### paint.fillColor : <code>Color</code> \| <code>Gradient</code>
The fill color

**Kind**: instance property of [<code>Paint</code>](#module_Paint..Paint)  
<a name="module_Paint..Paint+Mode"></a>

#### paint.Mode : <code>enum</code>
**Kind**: instance enum of [<code>Paint</code>](#module_Paint..Paint)  
**Properties**

| Name | Type |
| --- | --- |
| Clear | <code>Symbol</code> | 
| Paint | <code>Symbol</code> | 
| Gradient | <code>Symbol</code> | 

<a name="module_Paint..Color"></a>

### Paint~Color
A color object

**Kind**: inner class of [<code>Paint</code>](#module_Paint)  

* [~Color](#module_Paint..Color)
    * [new Color(r, g, b)](#new_module_Paint..Color_new)
    * _instance_
        * [.depth](#module_Paint..Color+depth) : <code>number</code>
        * [.Black](#module_Paint..Color+Black) : <code>Color</code>
        * [.Red](#module_Paint..Color+Red) : <code>Color</code>
        * [.Green](#module_Paint..Color+Green) : <code>Color</code>
        * [.Blue](#module_Paint..Color+Blue) : <code>Color</code>
        * [.White](#module_Paint..Color+White) : <code>Color</code>
        * [.None](#module_Paint..Color+None) : <code>Color</code>
        * [.r](#module_Paint..Color+r) : <code>number</code>
        * [.g](#module_Paint..Color+g) : <code>number</code>
        * [.b](#module_Paint..Color+b) : <code>number</code>
        * [.toNumber()](#module_Paint..Color+toNumber) ⇒ <code>number</code>
    * _static_
        * [.fromNumber(num)](#module_Paint..Color.fromNumber) ⇒ <code>Color</code>

<a name="new_module_Paint..Color_new"></a>

#### new Color(r, g, b)
Creates a new color object


| Param | Type | Description |
| --- | --- | --- |
| r | <code>number</code> | Red |
| g | <code>number</code> | Blue |
| b | <code>number</code> | Green |

**Example**  
```js
// Create a new color object with the RGB values of (255, 0, 0)
const color = new Color(255, 0, 0);
```
<a name="module_Paint..Color+depth"></a>

#### color.depth : <code>number</code>
**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
**Read only**: true  
<a name="module_Paint..Color+Black"></a>

#### color.Black : <code>Color</code>
Black

**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
**Read only**: true  
<a name="module_Paint..Color+Red"></a>

#### color.Red : <code>Color</code>
Red

**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
**Read only**: true  
<a name="module_Paint..Color+Green"></a>

#### color.Green : <code>Color</code>
Green

**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
**Read only**: true  
<a name="module_Paint..Color+Blue"></a>

#### color.Blue : <code>Color</code>
Blue

**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
**Read only**: true  
<a name="module_Paint..Color+White"></a>

#### color.White : <code>Color</code>
White

**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
**Read only**: true  
<a name="module_Paint..Color+None"></a>

#### color.None : <code>Color</code>
Do not paint

**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
**Read only**: true  
<a name="module_Paint..Color+r"></a>

#### color.r : <code>number</code>
Red

**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
<a name="module_Paint..Color+g"></a>

#### color.g : <code>number</code>
Green

**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
<a name="module_Paint..Color+b"></a>

#### color.b : <code>number</code>
Blue

**Kind**: instance property of [<code>Color</code>](#module_Paint..Color)  
<a name="module_Paint..Color+toNumber"></a>

#### color.toNumber() ⇒ <code>number</code>
Creates a new color from the given number

**Kind**: instance method of [<code>Color</code>](#module_Paint..Color)  
<a name="module_Paint..Color.fromNumber"></a>

#### Color.fromNumber(num) ⇒ <code>Color</code>
Creates a color from a number

**Kind**: static method of [<code>Color</code>](#module_Paint..Color)  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | Number to convert |

<a name="module_Paint..LinearGradient"></a>

### Paint~LinearGradient ⇐ <code>Gradient</code>
A linear gradient

**Kind**: inner class of [<code>Paint</code>](#module_Paint)  
**Extends**: <code>Gradient</code>  

* [~LinearGradient](#module_Paint..LinearGradient) ⇐ <code>Gradient</code>
    * [new LinearGradient(angle)](#new_module_Paint..LinearGradient_new)
    * [.getColorAt(fillStart, point, fillEnd)](#module_Paint..LinearGradient+getColorAt) ⇒ <code>Color</code>

<a name="new_module_Paint..LinearGradient_new"></a>

#### new LinearGradient(angle)
Creates a new linear gradient


| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle direction of the gradient (Radians) |

**Example**  
```js
// Create a new gradient that goes from red to blue
let gradient = new LinearGradient(0 /* The angle of the gradient in radians *\/);
gradient.addColorStop(0, Color.Red);
gradient.addColorStop(1, Color.Blue);
```
<a name="module_Paint..LinearGradient+getColorAt"></a>

#### linearGradient.getColorAt(fillStart, point, fillEnd) ⇒ <code>Color</code>
Gets the color for a point in the gradient

**Kind**: instance method of [<code>LinearGradient</code>](#module_Paint..LinearGradient)  

| Param | Type | Description |
| --- | --- | --- |
| fillStart | <code>Point</code> | The start point of the fill |
| point | <code>Point</code> | The point to get the color for |
| fillEnd | <code>Point</code> | The end point of the fill |

<a name="module_Paint..RadialGradient"></a>

### Paint~RadialGradient ⇐ <code>Gradient</code>
A radial gradient

**Kind**: inner class of [<code>Paint</code>](#module_Paint)  
**Extends**: <code>Gradient</code>  

* [~RadialGradient](#module_Paint..RadialGradient) ⇐ <code>Gradient</code>
    * [new RadialGradient()](#new_module_Paint..RadialGradient_new)
    * [.getColorAt(fillStart, point, fillEnd)](#module_Paint..RadialGradient+getColorAt) ⇒ <code>Color</code>

<a name="new_module_Paint..RadialGradient_new"></a>

#### new RadialGradient()
Creates a new radial gradient

**Example**  
```js
// Create a new gradient that goes from red to blue
let gradient = new RadialGradient();
gradient.addColorStop(0, Color.Red);
gradient.addColorStop(1, Color.Blue);
```
<a name="module_Paint..RadialGradient+getColorAt"></a>

#### radialGradient.getColorAt(fillStart, point, fillEnd) ⇒ <code>Color</code>
Gets the color for a point in the gradient

**Kind**: instance method of [<code>RadialGradient</code>](#module_Paint..RadialGradient)  

| Param | Type | Description |
| --- | --- | --- |
| fillStart | <code>Point</code> | The start point of the fill |
| point | <code>Point</code> | The point to get the color for |
| fillEnd | <code>Point</code> | The end point of the fill |

<a name="module_Paint..ConicGradient"></a>

### Paint~ConicGradient ⇐ <code>Gradient</code>
A conic gradient

**Kind**: inner class of [<code>Paint</code>](#module_Paint)  
**Extends**: <code>Gradient</code>  

* [~ConicGradient](#module_Paint..ConicGradient) ⇐ <code>Gradient</code>
    * [new ConicGradient(angle)](#new_module_Paint..ConicGradient_new)
    * [.getColorAt(fillStart, point, fillEnd)](#module_Paint..ConicGradient+getColorAt) ⇒ <code>Color</code>

<a name="new_module_Paint..ConicGradient_new"></a>

#### new ConicGradient(angle)
Creates a new conic gradient


| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle direction of the gradient (Radians) |

**Example**  
```js
// Create a new gradient that goes from red to blue
let gradient = new ConicGradient(0 /* The angle of the gradient in radians *\/);
gradient.addColorStop(0, Color.Red);
gradient.addColorStop(1, Color.Blue);
```
<a name="module_Paint..ConicGradient+getColorAt"></a>

#### conicGradient.getColorAt(fillStart, point, fillEnd) ⇒ <code>Color</code>
Gets the color for a point in the gradient

**Kind**: instance method of [<code>ConicGradient</code>](#module_Paint..ConicGradient)  

| Param | Type | Description |
| --- | --- | --- |
| fillStart | <code>Point</code> | The start point of the fill |
| point | <code>Point</code> | The point to get the color for |
| fillEnd | <code>Point</code> | The end point of the fill |

