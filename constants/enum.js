// https://www.30secondsofcode.org/articles/s/javascript-enum
export class Enum {
    constructor(...keys) {
        keys.forEach((key, i) => {
            this[key] = key;
        });
        Object.freeze(this);
    }

    *[Symbol.iterator]() {
        for (let key of Object.keys(this)) yield key;
    }
}