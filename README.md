# kodemonki/react-child-sequence

Plays a sequence of child image objects

## Install

```
$ npm install @kodemonki/react-child-sequence
```

## Usage

```js
const Sequence = require("@kodemonki/react-child-sequence");

<Sequence loop={true} yoyo={true} framerate={60}}>
  <img src={Image1} />
  <img src={Image2} />
  <img src={Image3} />
  <img src={Image4} />
  <img src={Image5} />
</Sequence>;
```
