function curriedAdd(total) {
    let finalTotal = 0;
    if (!total) {
        return finalTotal;
    }
    finalTotal += total;
    return function addNumb(numb) {
        if (!numb) {
            return finalTotal;
        }
        finalTotal += numb;
        return addNumb;
    }

}

module.exports = { curriedAdd };
