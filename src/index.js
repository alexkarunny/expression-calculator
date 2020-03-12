function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let arrExpr;
    let arrStackNumbers = [];
    let arrStackSigns = [];
    let objPrioretsSigns = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    let result;
    let number1,
        number2,
        sign1,
        br1 = 0,
        br2 = 0;

    function stringConversion(str) {
        let num;
        let newArr = [];
        for (let i = 0; i < str.length; i++) {
            if (str[i] === " ") {
                continue;
            } else if (isNaN(+str[i])) {
                newArr.push(str[i])
            } else {
                num = parseInt(str.slice(i));
                newArr.push(num);
                i = i + (num.toString().length - 1);
            }
        }
        return newArr;
    }

    function calculation(num1, num2, sign) {
        switch (sign) {
            case "+":
                return num1 + num2;
                ;
            case "-":
                return num1 - num2;
                ;
            case "*":

                return num1 * num2;
                ;
            case "/":
                if (num2 === 0) throw "TypeError: Division by zero.";
                return num1 / num2;
                ;
        }
    }

    arrExpr = stringConversion(expr);

    for (let i = 0; i < arrExpr.length; i++) {
        if(arrExpr[i] == "(") br1++;
        else if (arrExpr[i] == ")") br2++;
    }
    if (br1 != br2) {
        throw 'ExpressionError: Brackets must be paired';
    }
    for (let i = 0; i < arrExpr.length; i++) {
        if (isNaN(arrExpr[i])) {

            if (arrStackSigns.length === 0) {

                arrStackSigns.push(arrExpr[i]);
                continue;

            } else if (arrExpr[i] == "(") {

                arrStackSigns.push(arrExpr[i]);

            } else if (arrExpr[i] == ")") {

                do {
                    number2 = +arrStackNumbers.splice(-1, 1).toString();
                    number1 = +arrStackNumbers.splice(-1, 1).toString();
                    sign1 = arrStackSigns.splice(-1, 1).toString();
                    result = calculation(number1, number2, sign1);
                    arrStackNumbers.push(result);
                } while (arrStackSigns[arrStackSigns.length - 1] != "(");
                arrStackSigns.splice(-1, 1);
                if (i == arrExpr.length - 1) {
                    do {
                        number2 = +arrStackNumbers.splice(-1, 1).toString();
                        number1 = +arrStackNumbers.splice(-1, 1).toString();
                        sign1 = arrStackSigns.splice(-1, 1).toString();
                        result = calculation(number1, number2, sign1);
                        arrStackNumbers.push(result);
                    } while (arrStackNumbers.length > 1)
                }
            } else if (arrStackSigns[arrStackSigns.length - 1] == "(") {

                arrStackSigns.push(arrExpr[i]);

            } else if (objPrioretsSigns[arrExpr[i]] > objPrioretsSigns[arrStackSigns[arrStackSigns.length - 1]]) {

                arrStackSigns.push(arrExpr[i]);

            } else if (objPrioretsSigns[arrExpr[i]] <= objPrioretsSigns[arrStackSigns[arrStackSigns.length - 1]]) {

                do {
                    number2 = +arrStackNumbers.splice(-1, 1).toString();
                    number1 = +arrStackNumbers.splice(-1, 1).toString();
                    sign1 = arrStackSigns.splice(-1, 1).toString();
                    result = calculation(number1, number2, sign1);
                    arrStackNumbers.push(result);
                } while (objPrioretsSigns[arrExpr[i]] <= objPrioretsSigns[arrStackSigns[arrStackSigns.length - 1]])
                arrStackSigns.push(arrExpr[i])
            }

        } else if (typeof (+arrExpr[i]) === 'number' && i == arrExpr.length - 1) {
            arrStackNumbers.push(+arrExpr[i]);
            do {
                number2 = +arrStackNumbers.splice(-1, 1).toString();
                number1 = +arrStackNumbers.splice(-1, 1).toString();
                sign1 = arrStackSigns.splice(-1, 1).toString();
                result = calculation(number1, number2, sign1);
                arrStackNumbers.push(result);
            } while (arrStackNumbers.length > 1)

        } else if (typeof (+arrExpr[i]) === 'number') {
            arrStackNumbers.push(+arrExpr[i]);
        }

    }
    return result;
}

let teststr = ' 88 - (72 + 55) * 57 ';


function stringConversion(str) {
    let num;
    let newArr = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === " ") {
            continue;
        } else if (isNaN(+str[i])) {
            newArr.push(str[i])
        } else {
            num = parseInt(str.slice(i));
            newArr.push(num);
            i = i + (num.toString().length - 1);
        }
    }
    return newArr;
}

module.exports = {
    expressionCalculator
}