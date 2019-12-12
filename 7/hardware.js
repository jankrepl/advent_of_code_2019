class Hardware {
    /**
     * Construct an instance
     * @param data {Array} Array of strings representing the memory
     * @param phase {Number} Will be used as the very first standard input
     */
    constructor(data, phase) {
        this.data = data;
        this.phase = phase;

        this.stanardInputs = [this.phase];
        this.pointer = 0;
        this.halted = false;

        // logging variables
        this.allOpCodes = [];
        this.allDataStates = [];
        this.allIndices = [];

    }

    /**
     * Check whether the opcode is valid
     * @param expandedCode {String} 5 character string representing the instruction
     * @private
     */
    _checkExpandedCode(expandedCode) {
        const lengthCheck = expandedCode.length === 5;

        let legalModesCheck = true;
        for (let i = 0; i < 3; i++) {
            legalModesCheck &= (expandedCode[i] === '0' || expandedCode[i] === '1')
        }

        const legalOps = [1, 2, 3, 4, 5, 6, 7, 8, 99];
        const legalOpsCheck = legalOps.includes(Number(expandedCode.slice(3)));

        if (!(lengthCheck && legalModesCheck && legalOpsCheck)) {
            this._diagnose(10);
            throw Error(`expandedCode contains illegal characters, ${expandedCode}`)
        }
    }

    /**
     * Print some reports before exception raised
     * @param iMax {Number} The number of entries of data to print out
     * @private
     */
    _diagnose(iMax) {
        for (let i = 0; i < this.allIndices.length; i++) {
            console.log('Instruction count: ' + String(i));
            console.log('Position: ' + String(this.allIndices[i]));
            console.log('Opcode: ' + String(this.allOpCodes[i]));
            console.log('Memory state before: ' + String(this.allDataStates[i].slice(0, iMax)));
            console.log('-----------------------------')

        }

    }

    /**
     * Get a value from memory based on the mode
     * @param {Number} mode Either 0 (parameter) or 1 (value) mode
     * @param {Number} position  Position to be used
     * @returns {Number} The queried value
     */
    getValue(mode, position) {

        if (mode === 0) {
            return Number(this.data[this.data[position]])
        } else if (mode === 1) {
            return Number(this.data[position])
        } else {
            throw Error(`Unsupported mode ${mode}`)
        }
    }

    /**
     * Set a position in memory to a given value.
     * @param mode {Number} Either 0 (parameter) or 1 (value) mode
     * @param position {Number} Integer representing the position to be used
     * @param value {Number|String} New value
     */
    setValue(mode, position, value) {
        if (mode === 0) {
            this.data[this.data[position]] = String(value)
        } else if (mode !== 1) {
            throw Error('Cannot modify entries in Value mode!')
        } else {
            throw Error(`Unsupported mode ${mode}`)
        }
    }

    /**
     * Run program until it halts (opcode 99 encountered) or until
     * @param {Array} signals Array of standard inputs that are going to be used for the opcode 3 (starts on the left)
     * @returns {Number|undefined} The standard output or null (if halted before any standard output)
     */
    run(signals) {
        this.stanardInputs = this.stanardInputs.concat(signals); // leftmost is the first one to be used
        while (!this.halted) {

            const initialCodeStr = String(this.data[this.pointer]);
            const expandedCode = '0'.repeat(5 - initialCodeStr.length) + initialCodeStr;
            this._checkExpandedCode(expandedCode);

            // logging
            this.allDataStates.push(this.data.slice());
            this.allIndices.push(this.pointer);
            this.allOpCodes.push(expandedCode);

            const operation = Number(expandedCode.substr(3));

            const firstParameterMode = Number(expandedCode[2]);
            const secondParameterMode = Number(expandedCode[1]);
            const thirdParameterMode = Number(expandedCode[0]);

            if (operation === 1) {
                // addition
                const firstParameter = this.getValue(firstParameterMode, this.pointer + 1);
                const secondParameter = this.getValue(secondParameterMode, this.pointer + 2);

                this.setValue(thirdParameterMode, this.pointer + 3, firstParameter + secondParameter);

                this.pointer += 4

            } else if (operation === 2) {
                // multiplication
                const firstParameter = this.getValue(firstParameterMode, this.pointer + 1);
                const secondParameter = this.getValue(secondParameterMode, this.pointer + 2);

                this.setValue(thirdParameterMode, this.pointer + 3, firstParameter * secondParameter);

                this.pointer += 4

            } else if (operation === 3) {
                // standard input
                this.setValue(firstParameterMode, this.pointer + 1, this.stanardInputs.shift());

                this.pointer += 2

            } else if (operation === 4) {
                const output = this.getValue(firstParameterMode, this.pointer + 1);

                this.pointer += 2;

                return output
            } else if (operation === 5) {
                const firstParameter = this.getValue(firstParameterMode, this.pointer + 1);
                const secondParameter = this.getValue(secondParameterMode, this.pointer + 2);

                if (firstParameter === 0) {
                    this.pointer += 3
                } else {
                    this.pointer = secondParameter
                }

            } else if (operation === 6) {
                const firstParameter = this.getValue(firstParameterMode, this.pointer + 1);
                const secondParameter = this.getValue(secondParameterMode, this.pointer + 2);

                if (firstParameter === 0) {
                    this.pointer = secondParameter
                } else {
                    this.pointer += 3;
                }


            } else if (operation === 7) {
                const firstParameter = this.getValue(firstParameterMode, this.pointer + 1);
                const secondParameter = this.getValue(secondParameterMode, this.pointer + 2);

                if (firstParameter < secondParameter) {
                    this.setValue(thirdParameterMode, this.pointer + 3, 1)
                } else {
                    this.setValue(thirdParameterMode, this.pointer + 3, 0)
                }
                this.pointer += 4

            } else if (operation === 8) {
                const firstParameter = this.getValue(firstParameterMode, this.pointer + 1);
                const secondParameter = this.getValue(secondParameterMode, this.pointer + 2);

                if (firstParameter === secondParameter) {
                    this.setValue(thirdParameterMode, this.pointer + 3, 1)
                } else {
                    this.setValue(thirdParameterMode, this.pointer + 3, 0)
                }
                this.pointer += 4

            } else if (operation === 99) {
                this.halted = true;
                this.pointer += 1

            }


        }


    }
}

module.exports = Hardware;