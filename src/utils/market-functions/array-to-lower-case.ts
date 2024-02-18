const arrayToLowerCase = (array: Array<string>) => {
    const result = [];
    for(let i = 0; i < array.length; i++){
        result.push(array[i].toLowerCase());
    }
    return result;
}

export default arrayToLowerCase;