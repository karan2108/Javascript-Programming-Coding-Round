// Secure Passcode Game
// A security company provides digital lockers that require a passcode to be generated based on a secret key. The passcode is generated using the following logic:
// 1. Take an input string S (secret key) consisting of alphabets, digits, and special characters.
// 2. Extract all digits from the string in the order they appear.
// 3. If the extracted number is even, double each digit. If it is odd, triple each digit. If no digits then return default value.
// 4. Find the sum of the transformed digits.
// 5. Reverse the sum if it is greater than 25.
// 6. If the sum has multiple digits, keep summing its digits until you get a single-digit number.
// 7. If the final digit is prime (2, 3, 5, or 7), return Final Passcode: <digit> (Prime!), else
// return Final Passcode: <digit>.

// Sample Test Case:
// Sample Input:
// abcdef
// Expected Output:
// Final Passcode: 0


function isPrime(n) {
    return [2, 3, 5, 7].includes(n);
}

function getPasscode(s) {
    let digits = s.split('').filter(c=>/\d/.test(c)).map(Number);
    if(digits.length==0){
        return "Final Passcode: 0";
    }
    let num = parseInt(digits.join(''), 10);
    let transformed = num%2===0
    ? digits.map(d=>d*2)
    : digits.map(d=>d*3);
    let total = transformed.reduce((sum, d) => sum+d,0);
    if(total>25){
        total = parseInt(total.toString().split('').reverse().join(''), 10);
    }
    while(total>=10){
        total = total.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
    }
    if(isPrime(total)) {
        return `Final Passcode: ${total} (Prime!)`;
    }
    else{
        return `Final Passcode: ${total}`;
    }
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
console.log(getPasscode(input));

