// const promise = new Promise((res) => res(1));
// promise.then((res) => res + 1).then((res) => console.log(res));

//El hoisting (traducido como elevación) es un comportamiento en JavaScript donde las declaraciones de variables, funciones y clases parecen "moverse" a la parte superior de su ámbito (scope) antes de que el código se ejecute.
//
const arr = [1, 2, 3];
arr[10] = 11;
console.log(arr.length);
