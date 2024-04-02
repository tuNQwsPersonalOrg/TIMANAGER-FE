import { getType } from './TypeUtil';

export default function groupClass(...classList) {
    const classListSet = new Set();
    Array.from(classList).forEach((className) => {
        const classNameType = getType(className);
        if (classNameType === 'string') {
            classListSet.add(className);
        } else if (classNameType === 'array') {
            classListSet.add(groupClass(...className));
        } else if (classNameType === 'object') {
            Object.keys(className).forEach((classKey) => {
                const classValue = className[classKey];
                const classValueType = getType(classValue);
                if (classValueType !== 'boolean') return;
                if (classValue) {
                    classListSet.add(classKey);
                } else {
                    classListSet.delete(classKey);
                }
            });
        }
    });

    return Array.from(classListSet).join(' ');
}
