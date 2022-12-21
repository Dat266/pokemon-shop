const accessNestedObject = (obj, string) => {
    const arrayString = string.split(".");
    arrayString.forEach((el) => {
        if (obj?.[el]) {
            obj = obj[el];
            return obj;
        }
    });
    return obj;
};

export default accessNestedObject;
