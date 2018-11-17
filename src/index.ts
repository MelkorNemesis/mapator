// Interfaces

interface StringHashMap {
  [key: string]: string;
}

interface Options {
  onKeyNotFound?: (key: string) => any;
  onValueNotFound?: (value: string) => any;
  strict?: boolean;
}

interface PublicAPI {
  keyToValue: (key: string) => any;
  valueToKey: (val: string) => any;
}

// Helpers

function defaultKeyNotFoundHandler(value: string) {
  return undefined;
}

function defaultValueNotFoundHandler(key: string) {
  return undefined;
}

function findValue(hashMap: StringHashMap, key: string): string | undefined {
  return hashMap[key];
}

function findKey(hashMap: StringHashMap, value: string): string | undefined {
  return Object.keys(hashMap).find(key => hashMap[key] === value);
}

// Main

export default function Mapator(
  hashMap: StringHashMap,
  options: Options = {}
): PublicAPI {
  // @ts-ignore
  if (this instanceof Mapator) {
    throw new Error(
      `Don't invoke Mapator with "new" keyword, use 'const mapper = Mapator({ ... })'.`
    );
  }

  if (Object.keys(hashMap).length === 0 || hashMap === undefined) {
    throw new Error("Pass non-empty hashMap object as a first argument.");
  }

  const {
    onKeyNotFound: keyNotFound = defaultKeyNotFoundHandler,
    onValueNotFound: valueNotFound = defaultValueNotFoundHandler
  } = options;

  return {
    keyToValue(key: string): any {
      return findValue(hashMap, key) || valueNotFound(key);
    },
    valueToKey(val: string): any {
      return findKey(hashMap, val) || keyNotFound(val);
    }
  };
}
