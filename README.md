# kodemonki/react-child-sequence

Plays a sequence of child image objects. It absolutely positions the remaining images over the top with visibility set to hidden. It then cycles through setting the visibility to visible for the current image.

## Updates

- Changed frameRate prop to fps (frames per second) to make it less strange
- Added className and style object passing to children
- Removed dummy first image
- Added propTypes
- added defaultProps
- Added Es-lint to build
- Cleaned up function binding

## Install

```
$ npm install @kodemonki/react-child-sequence
```

## Props

```
autoPlay : boolean - play sequence
loop : boolean - repeat sequence
yoyo : boolean - replay in reverse
fps : number - frames per second
```

## Usage

```js

import { Sequence } from "@kodemonki/react-child-sequence";

//Images

import image1 from "./PathToImage1.jpg";
import image2 from "./PathToImage2.jpg";
import image3 from "./PathToImage3.jpg";

//Defaults

<Sequence>
  <img src={image1} />
  <img src={image2} />
  <img src={image3} />
</Sequence>

//Optional

<Sequence
    autoPlay={true}
    loop={true}
    yoyo={true}
    fps={29}
    style={...}
    className="className"
>
  <img src={image1} style={...} className="className" alt={"Alt text"}/>
  <img src={image2} style={...} className="className" alt={"Alt text"}/>
  <img src={image3} style={...} className="className" alt={"Alt text"}/>
</Sequence>
```
