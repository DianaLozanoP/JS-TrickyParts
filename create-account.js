function createAccount(pin, amount) {
    if (!amount) {
        amount = 0;
    }
    return {
        checkBalance: function (enteredPin) {
            if (enteredPin === pin) {
                return `$${amount}`
            }
            return "Invalid PIN."
        },
        deposit: function (enteredPin, depositAmt) {
            if (enteredPin === pin) {
                amount += depositAmt;
                return `Succesfully deposited $${depositAmt}. Current balance: $${amount}.`
            }
            return "Invalid PIN."
        },
        withdraw: function (enteredPin, withdrawAmt) {
            if (enteredPin === pin) {
                if (amount > withdrawAmt) {
                    amount -= withdrawAmt;
                    return `Succesfully withdrew $${withdrawAmt}. Current balance: $${amount}.`
                }
                return 'Withdrawal amount exceeds account balance. Transaction cancelled.'
            }
            return "Invalid PIN."
        },
        changePin: function (enteredPin, newPin) {
            if (enteredPin === pin) {
                pin = newPin;
                return 'PIN successfully changed!'
            }
            return "Invalid PIN."
        }
    }

}

module.exports = { createAccount };
