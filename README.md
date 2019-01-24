# kodemonki/react-child-sequence

Plays a sequence of child image objects

## Install

```
$ npm install @kodemonki/react-child-sequence
```

## Usage

```js
import { Sequence } from "@kodemonki/react-child-sequence";

<Sequence loop={true} yoyo={true} frameRate={60}>
  <img src={logo1} />
  <img src={logo2} />
  <img src={logo3} />
</Sequence>;
```
