
export function ToKebabCase(str: string) {
    return str.split('').map((letter, idx) => {
        return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter
    }).join('')
}

export function IsEmptyString(str: string) {
    return str.length === 0;
}

export function IsWhitespaceOnly(str: string) {
    return /^[\s]+$/.test(str);
}

export function IsSymbolOnly(str: string) {
    return /^[\W]+$/.test(str);
}