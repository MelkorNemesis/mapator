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
export default function Mapator(hashMap: StringHashMap, options?: Options): PublicAPI;
export {};
