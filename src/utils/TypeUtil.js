export function getType(value) {
    const typeString = Object.prototype.toString.call(value).slice(8, -1);
    return typeString.toLowerCase();
}
