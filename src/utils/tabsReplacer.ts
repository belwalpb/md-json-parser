// This Utility is used to replace tabs with spaces in input string.
export const tabsReplacer = (value: string, tabSize: number = 4) => {
    const search = /[\t\n\r]/g;
    const result = [];
    let start = 0;
    let index = 0;
    let column = -1;

    if (typeof value !== 'string') {
        throw new TypeError('The Function Requires a value of type String.');
    }

    while (index < value.length) {
        search.lastIndex = index;
        const match = search.exec(value);
        const end = match ? match.index : value.length;

        if (value.codePointAt(end) === 9) {
            const add = tabSize - ((column + end - index + 1) % tabSize);
            result.push(value.slice(start, end), ' '.repeat(add));
            column += end - index + add;
            start = end + 1;
        } else {
            column = -1;
        }

        index = end + 1;
    }

    result.push(value.slice(start));

    return result.join('');
};
