export const code = `// Simple demo of Monaco Editor using SvelteKit
// Nice isn't it? I hope you like it and find it useful.
// See you at https://github.com/sonyarianto/sveltekit-monaco-editor

function getFullName(first, last) {
    return first + " " + last;
}

getFullName("Sony", "AK"); // Sony AK

// Demo of Closure as Factory Function

function makeAdder(x) {
    return function (y) {
        return x + y;
    };
}

const add5 = makeAdder(5); // 5 is x
const add10 = makeAdder(10); // 10 is x

console.log(add5(2)); // 7
console.log(add10(2)); // 12`;
