class Calculator {
    constructor(skinName) {
        this.skin = skinName;
    }

    pingPong(goal) {
        var output = [];
        for (var i = 1; i <= goal; i++) {
            if (i % 15 === 0) {
                output.push("ping-pong");
            } else if (i % 3 === 0) {
                output.push("ping");
            } else if (i % 5 === 0) {
                output.push("pong");
            } else {
                output.push(i);
            }
        }
        return output;
    }
}

exports.calculatorModule = Calculator;
// we attach the whole Calculator declaration to a property on the exports global object called calculatorModule.