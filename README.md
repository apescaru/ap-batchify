# AP BATCHIFY

## v1.0.0

## apBatch

### Usage

#### apBatch takes 2 required parameters and 2 optional parameters

#### - items: Array = default array of items

#### - batchSize: Integer > 1 = the number of elements in each batch

#### - options: Object = 2 sets of 2 options that go toghter

- <b>toObject</b> <default: false> = get the batched result as an object or array
- <b>toObjectPrefix</b> <default: "batch"> = set the object result keys name (key name will be "object prefix + batch number")
- <b>minBatch</b> <default: 5> = set a minumum number of elements in each batch (same as batchSize - allows for custom implementations). <b>Will not work without callbackOverMinBatch set to false</b>
- <b>callbackOverMinBatch</b> <default: true> - this options changes the verification between the callback (last argument) and the minBatch implementation. Default callback:

```javascript
const defaultCB = (_prev, _next) => {
  return true;
};
```

#### - callback: Function = callback function with 2 parameter that returns true or false:

- <b>true</b> - if the batchSize is met, the next batch will start
- <b>false</b> - if callbackOverMinBatch is set to true, a new batch will only start creating only if this function returns true

### Examples

```Javascript
    import { apBatch } from "ap-batchify";

    const exampleItems = [10, 20, 30, 40, 50, 70, 80, 90, 100, 110, 111, 112, 113];

    console.log(
    apBatch(exampleItems, 2)
    );

    /*
    [
        [ 10, 20 ],
        [ 30, 40 ],
        [ 50, 70 ],
        [ 80, 90 ],
        [ 100, 110 ],
        [ 111, 112 ],
        [ 113 ]
    ]
    */

    console.log(
        apBatch(exampleItems, 5)
    );

    /*
    [ [ 10, 20, 30, 40, 50 ], [ 70, 80, 90, 100, 110 ], [ 111, 112, 113 ] ]
    */

    console.log(
        apBatch(exampleItems, 5, {
            toObject: true,
        })
    )

    /*
    {
        batch1: [ 10, 20, 30, 40, 50 ],
        batch2: [ 70, 80, 90, 100, 110 ],
        batch3: [ 111, 112, 113 ]
    }
    */

    console.log(
        apBatch(exampleItems, 5, {
            toObject: true,
            toObjectPrefix: "exampleBatch"
        })
    )

    /*
    {
        exampleBatch1: [ 10, 20, 30, 40, 50 ],
        exampleBatch2: [ 70, 80, 90, 100, 110 ],
        exampleBatch3: [ 111, 112, 113 ]
    }
    */

    console.log(
        apBatch(exampleItems, 5, {
            minBatch: 6,
            callbackOverMinBatch: false,
        })
    )

    /*
    [ [ 10, 20, 30, 40, 50, 70 ], [ 80, 90, 100, 110, 111, 112 ], [ 113 ] ]
    */

    console.log(
        apBatch(exampleItems, 4, {
            minBatch: 7,
            callbackOverMinBatch: false,
            toObject: true,
        })
    )

    /*
    {
        batch1: [ 10, 20, 30, 40, 50, 70, 80 ],
        batch2: [ 90, 100, 110, 111, 112, 113 ]
    }
    */

    console.log(
        apBatch(exampleItems, 4, {}, (prev, next) => {
            return true;
        })
    )

    /*
    [
        [ 10, 20, 30, 40 ],
        [ 50, 70, 80, 90 ],
        [ 100, 110, 111, 112 ],
        [ 113 ]
    ]
    */

    console.log(
        apBatch(exampleItems, 4, {
            toObject: true,
            toObjectPrefix: "usingCallbacks"
        }, (prev, next) => {
            return true;
        })
    )

    /*
    {
        usingCallbacks1: [ 10, 20, 30, 40 ],
        usingCallbacks2: [ 50, 70, 80, 90 ],
        usingCallbacks3: [ 100, 110, 111, 112 ],
        usingCallbacks4: [ 113 ]
    }
    */

    console.log(
        apBatch(exampleItems, 4, {}, (prev, next) => {
            if(next % 3 === 0) return true;
            return false;
        })
    )
    
    // next is the last item in a batch
    // prev is the second to last item in a batch
    /*
    [
        [ 10, 20, 30, 40, 50, 70, 80, 90 ],
        [ 100, 110, 111, 112, 113 ]
    ]
    */
```
