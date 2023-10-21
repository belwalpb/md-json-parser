const encodeCache: Record<string, string[]> = {};
const defaultChars = ";/?:@&=+$,-_.!~*'()#";

export const encode = (string: string, keepEscaped: boolean = true): string => {
    let result = '';
    const l = string.length;

    if (typeof keepEscaped === 'undefined') {
        keepEscaped = true;
    }

    const cache: string[] = getEncodeCache(defaultChars);

    for (let i = 0; i < l; i++) {
        const code = string.charCodeAt(i);

        if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
            if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
                result += string.slice(i, i + 3);
                i += 2;
                continue;
            }
        }

        if (code < 128) {
            result += cache[code];
            continue;
        }

        if (code >= 0xd800 && code <= 0xdfff) {
            if (code >= 0xd800 && code <= 0xdbff && i + 1 < l) {
                const nextCode = string.charCodeAt(i + 1);
                if (nextCode >= 0xdc00 && nextCode <= 0xdfff) {
                    result += encodeURIComponent(string[i] + string[i + 1]);
                    i++;
                    continue;
                }
            }
            result += '%EF%BF%BD';
            continue;
        }

        result += encodeURIComponent(string[i]);
    }

    return result;
};

const getEncodeCache = (exclude: string): string[] => {
    let cache = encodeCache[exclude];
    if (cache) {
        return cache;
    }

    cache = encodeCache[exclude] = [];

    for (let i = 0; i < 128; i++) {
        const ch = String.fromCharCode(i);

        if (/^[0-9a-z]$/i.test(ch)) {
            cache.push(ch);
        } else {
            cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
        }
    }

    for (let i = 0; i < exclude.length; i++) {
        cache[exclude.charCodeAt(i)] = exclude[i];
    }

    return cache;
};
