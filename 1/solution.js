fs = require('fs');

function computeFuel(accountForFuel) {
    fs.readFile('input.txt', (err, data) => {
        if (err) throw err;

        let masses = data.toString().split("\n").map(Number);
        masses.pop(); // for some reason the toString has a new line at the end

        let fuels = masses.map(x => Math.floor(x / 3) - 2);

        if (accountForFuel) {
            let fuelsDelta = fuels

            while (fuelsDelta.reduce((a, b) => a + b, 0) > 0) {
                fuelsDelta = fuelsDelta.map(x => Math.max(0, Math.floor(x / 3) - 2));

                fuels.forEach((value, index, array) => {
                    array[index] = array[index] + fuelsDelta[index]

                })

            }

        }

        let res = fuels.reduce((a, b) => a + b, 0);
        console.log(res)
    });
}

computeFuel(false);  // first task
computeFuel(true);  // second task