<div align="center">
<img 
    src="https://raw.githubusercontent.com/RedYetiDev/termestry/gh-pages/logo.svg"
    width="100"
/>

# Termestry

### Version 0.0.1

**A dependency free tapestry for the terminal**

</div>

---

With **Termestry**, you can draw on terminal with ease.

## Installation

Termestry is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/). Installation is done using the [npm install](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) command:

```bash
$ npm install termestry
```

You can also just add it to your `package.json` file, and it will be installed the next time you run `npm install`:

```json
{
  "dependencies": {
    "termestry": "^0.0.1"
  }
}
```

## Basic Usage

### Drawing a Rectangle

```js
import { Canvas, Paint, Color, Size, Point } from "termestry";

const myPaint = new Paint(
  Color.RED /* stroke color */,
  Color.BLUE /* fill color */
);

const myCanvas = new Canvas(myPaint); /* create a canvas with the paint */

const size = new Size(10, 10);

myCanvas.rect(
  Point.centerFor(size),
  size
); /* draw a rectangle at the center of the screen */

myCanvas.draw(); // draw the canvas
```

### Creating a stick figure

```js
import { Paint, Color, Size, Point, Canvas } from './src/index.js';

const myPaint = new Paint(
    Color.Red, /* stroke color */
    Color.None, /* fill color */
);
const myCanvas = new Canvas(myPaint); /* create a canvas with the paint */

// What is a stick figure?
//  O <- A circle (head)
// --- <- A long line (arms)
//  | <- A line (body)
// / \ <- Two lines (legs)

const head = new Size(6, 6);
const body = new Size(1, 5);
const arms = new Size(5, 1);
const legs = new Size(5, 2);

const center = Point.centerFor(head);

// The head
myCanvas.ellipse(
    center, // Where to draw the head
    head.width / 2, // The X radius
    head.height / 2, // The Y radius
    0, // The rotation
    0, // The start angle
    2 * Math.PI, // The end angle (2 * PI is a full circle)
);

// The arms
let arms_subpath = myCanvas.subpathAt(
    new Point(
        center.x - arms.width / 2,
        center.y + head.height - arms.height
    )
); // Create a subpath at the center of the head

arms_subpath.lineTo(
    new Point(
        center.x + arms.width / 2,
        center.y + head.height - arms.height
    )
); // Draw the arms

// The body
let body_subpath = myCanvas.subpathAt(
    new Point(
        center.x,
        center.y + head.height / 2
    )
); // Create a subpath at the bottom of the head

body_subpath.lineTo(
    new Point(
        center.x,
        center.y + head.height / 2 + body.height
    )
); // Draw the body

// The legs
let legs_subpath = myCanvas.subpathAt(
    new Point(
        center.x,
        center.y + head.height / 2 + body.height
    )
); // Create a subpath at the bottom of the body

legs_subpath.lineTo(
    new Point(
        center.x - legs.width,
        center.y + head.height / 2 + body.height + legs.height
    )
); // Draw the left leg

let legs_subpath_2 = myCanvas.subpathAt(
    new Point(
        center.x,
        center.y + head.height / 2 + body.height
    )
); // Create a subpath at the bottom of the body

legs_subpath_2.lineTo(
    new Point(
        center.x + legs.width,
        center.y + head.height / 2 + body.height + legs.height
    )
); // Draw the right leg

myCanvas.draw(); // Draw the canvas
```

_For API usage, and more specific examples, refer to the [API](https://termestry.js.org/) (⚠️ Link Broken ⚠️)._

## Project Status

Termestry is currently in **alpha**. While the current API is stable, there may be breaking changes in the future, and more features will be added.

To help with the development of Termestry, you can contribute to the project by submitting issues, pull requests, or shooting me an email at [RedYetiDev@gmail.com](mailto:redyetidev@gmail.com).

## License

Termestry is licensed under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license. This means that you can use Termestry in any way you want, as long as you give credit to me, the original author ([RedYetiDev](https://redyetidev.github.io)).

> **What is "as long as you give credit to me"?**
>
> Giving credit is showing that you used Termestry in your project. This can be done by linking to the [GitHub repository](https://github.com/RedYetiDev/termestry), or by linking to the [npm package](https://www.npmjs.com/package/termestry).
>
> **Can I use Termestry in a commercial project?**
>
> Of course! You can use Termestry in any project, commercial or not, as long as you give credit to me.
