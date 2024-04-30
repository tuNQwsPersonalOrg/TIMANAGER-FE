export function formatData(type, value) {
    if (value === null || value === undefined || value === '') return '';

    switch (type) {
        case 'number': {
            const newValue = value.toString();
            const numberParts = newValue.split('.');
            const numberFormat = new Intl.NumberFormat('en-US');
            if (numberParts.length === 1)
                return numberFormat.format(numberParts.join(''));

            const originPart = numberParts.splice(0, 1).join('');
            const decimalPart = numberParts.join('');
            return `${numberFormat.format(originPart)}.${decimalPart}`;
        }
        case 'date': {
            const date = new Date(value);
            const formattedDate = date.toLocaleDateString(undefined, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            return formattedDate;
        }
        case 'datetime': {
            const date = new Date(value);
            const formattedTime = date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            return formattedTime;
        }
        default:
            return value;
    }
}
export function parseNumber(value, type) {
    if (type !== 'number') return value;
    if (value === '') return value;
    if (!value || value === '.') return 0;
    const numberValue = value?.replaceAll(/[^0-9.]/g, '');

    const numberParts = numberValue.split('.');
    if (numberParts.length === 1) return +numberParts.join('');

    const originPart = numberParts.splice(0, 1).join('');
    const decimalPart = numberParts.join('');

    if (decimalPart === '' || decimalPart.slice(-1) === '0')
        return `${originPart}.${decimalPart}`;
    return +`${originPart}.${decimalPart}`;
}
