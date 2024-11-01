export function replaceObjectAtIndexImmutable(array, index, newObject) {
    // Check if the index is within array bounds
    if (index < 0 || index >= array.length) {
        throw new Error("Index out of bounds");
    }

    // Return a new array with the updated object
    return [
        ...array.slice(0, index),
        newObject,
        ...array.slice(index + 1)
    ];
}

export function removeObjectAtIndexImmutable(array, index) {
    // Check if the index is within array bounds
    if (index < 0 || index >= array.length) {
        throw new Error("Index out of bounds");
    }

    // Return a new array without the object at the specified index
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ];
}