export const updateObject = (oldObject, newValues) => {
    return {
        ...oldObject,
        ...newValues
    }
}