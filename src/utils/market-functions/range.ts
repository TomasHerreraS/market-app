const Range = (start: number, end: number) => {
    const result: number[] = [];

    for(let i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
}

export default Range;
