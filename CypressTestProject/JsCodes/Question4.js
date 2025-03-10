// Hardcode the first two numbers
let sequence = [1, 2];
// Function to generate the next number in the sequence
function getNextNumber(sequence) {
    const position = sequence.length + 1; // Current position in the sequence
    if (position % 2 === 1) {
        // Odd position: Multiply the previous two numbers
        return sequence[sequence.length - 1] * sequence[sequence.length - 2];
    } else {
        // Even position: Add the previous two numbers
        return sequence[sequence.length - 1] + sequence[sequence.length - 2];
    }
}
// Generate the next 5 numbers
for (let i = 0; i < 5; i++) {
    sequence.push(getNextNumber(sequence));
}
// Print the sequence
console.log("Sequence:", sequence.join(", "));
