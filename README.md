# kodemonki/react-child-sequence

Plays a sequence of child images

## Install

```
$ npm install @kodemonki/react-child-sequence
```

## Usage

```js
const Sequence = require("@kodemonki/react-child-sequence");

<Sequence loop={true} yoyo={true} framerate={60} direcion={"forward"}>
  <img src={Image1} />
  <img src={Image2} />
  <img src={Image3} />
  <img src={Image4} />
  <img src={Image5} />
</Sequence>;
```
