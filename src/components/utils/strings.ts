
export function firstLetterUpper(str: string): string {
    if (str.length === 0)
        return str;
    else
        return str.toLocaleUpperCase()[0] + str.toLocaleLowerCase().substring(1);
}
