import { apBatch } from "./index.js";

const exampleItems = [10, 20, 30, 40, 50, 70, 80, 90, 100, 110, 111, 112, 113];

console.log(
  apBatch(exampleItems, 2)
);

console.log(
    apBatch(exampleItems, 5)
);

console.log(
    apBatch(exampleItems, 5, {
        toObject: true,
    })
)

console.log(
    apBatch(exampleItems, 5, {
        toObject: true,
        toObjectPrefix: "exampleBatch"
    })
)

console.log(
    apBatch(exampleItems, 5, {
        minBatch: 6,
        callbackOverMinBatch: false,
    })
)

console.log(
    apBatch(exampleItems, 4, {
        minBatch: 7,
        callbackOverMinBatch: false,
        toObject: true,
    })
)

console.log(
    apBatch(exampleItems, 4, {}, (prev, next) => {
        return true;
    })
)

console.log(
    apBatch(exampleItems, 4, {
        toObject: true,
        toObjectPrefix: "usingCallbacks"
    }, (prev, next) => {
        return true;
    })
)

console.log(
    apBatch(exampleItems, 4, {}, (prev, next) => {
        if(next % 3 === 0) return true;
        return false;
    })
)
