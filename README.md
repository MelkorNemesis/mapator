# Mapator

A javascript utility that creates a mapper from one string value to another and back.

## Installation

```sh
npm install mapator --save
yarn add mapator
```

## Usage

### JavaScript

```javascript
import Mapator from "mapator";

const fooMapper = Mapator({
  abc: "123",
  def: "456",
  ghi: 789
});

fooMapper.keyToValue("abc"); // '123'
fooMapper.valueToKey("456"); // '456'
fooMapper.keyToValue("jkl"); // undefined
```

## Options

### onKeyNotFound

By default when no key is found for given value, `undefined` is returned.

```javascript
import Mapator from "mapator";

const barMapper = Mapator(
  {
    abc: "123"
  },
  {
    onKeyNotFound(value) {
      throw new Error(`No key found for value "${value}".`);
    }
  }
);

barMapper.valueToKey("456"); // Error: No key found for value "456".
```

### onValueNotFound

By default when no value is found for given key, `undefined` is returned.

```javascript
import Mapator from "mapator";

const barMapper = Mapator(
  {
    abc: "123"
  },
  {
    onValueNotFound(key) {
      throw new Error(`No value found for key "${key}".`);
    }
  }
);

barMapper.keyToValue("def"); // Error: No value found for key "def".
```

## Test

```sh
npm run test
```
