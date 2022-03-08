const defaultCB = (_prev, _next) => {
    return true;
}

const defaultOptions = {
    minBatch: 5,
    callbackOverMinBatch: true,
    toObject: false,
    toObjectPrefix: "batch",
}

export function apBatch (_items, batchSize, options = defaultOptions, callback = defaultCB) {
    if(!Array.isArray(_items)) throw new TypeError("First argument must be an array");
    if(!Number.isInteger(batchSize) || batchSize <= 1) throw new TypeError("Second argument must be a positive integer greater than one");
    if(options.minBatch < batchSize) throw new RangeError("Minimum batch number must be greater or equal to the batch size");
    if(options.callbackOverMinBatch === false && callback != defaultCB) console.warn("options.callbackOverMinBatch = false should not be used with a custom callback because the callback has no effect");

    let items = [..._items];

    if(options !== defaultOptions) options = {...defaultOptions, ...options};
    
    const originalLength = items.length;
    const result = [];

    const returnAsObj = (result, _toObject = options.toObject ?? false) => {
        if(!_toObject) return result;
        let batch = 0;
        let obj = {};

        for(const res of result) {
            const objName = `${options.toObjectPrefix ?? 'batch'}${++batch}`;
            obj[objName] = res;
        }

        return obj;
    }

    if(items.length <= batchSize) return returnAsObj(items);

    let curr = 1;
    let currentBatch = [];
    let prev = items.shift();
    currentBatch.push(prev);
    let next;

    while(items.length) {
        next = items.shift();
        curr++;
        currentBatch.push(next);
        if(currentBatch.length === originalLength || ((currentBatch.length + items.length) < batchSize)) {
            result.push([...currentBatch, ...items]);
            break;
        }

        if(curr >= batchSize) {
            if((options.callbackOverMinBatch ?? true) === true ) {
                if(callback(prev, next)) {
                    result.push(currentBatch);
                    currentBatch = [];
                    curr = 0;
                }       
            } else {
                if(curr >= options.minBatch ?? batchSize) {
                    result.push(currentBatch);
                    currentBatch = [];
                    curr = 0;
                }
            }
        }

        prev = next;
    }

    if(currentBatch.length > 1) result.push(currentBatch);

    return returnAsObj(result);
}