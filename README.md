# kodemonki/react-child-sequence

Plays a sequence of child image objects. It takes a copy of the first image and hides it positioned relatively, to force the div to have the correct size. Then it absolutely positions the remaining images over the top with visibility set to hidden. It then cycles through setting the visibility to visible.

## Install

```
$ npm install @kodemonki/react-child-sequence
```

## Props

```
loop - true|false - repeat sequence
yoyo - true|false - replay in reverse
frameRate - number - time frame is visible for
```

## Usage

```js
import { Sequence } from "@kodemonki/react-child-sequence";

### Defaults
<Sequence>
  <img src={image1} />
  <img src={image2} />
  <img src={image3} />
</Sequence>

### Optional
<Sequence loop={true} yoyo={true} frameRate={60}>
  <img src={image1} />
  <img src={image2} />
  <img src={image3} />
</Sequence>
```
