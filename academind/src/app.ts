// const button = document.querySelector('.button')! this means we are saying this is not null.
const button = document.querySelector('.button')
let appId = 'abc' //NoUnused Locals will not throw error. BC maybe we can use this outside. But throws err also  for inside function variables.

function add(n1: number, n2: number) {
  if (n1 > 0) {
    return n1 + n2 //noImplicit Returns if set to true. So it will throw error bc we are not returning outside anything. If we dont mention return keyword this shouldn't be a problem
  }
}
add(2,4)

function clickHandler(message : string) {
  console.log('Clikced : '  + message)
}

if (button) {
  button.addEventListener('click', clickHandler.bind(null,'button'))//No need to set 'this' as well .we will not get error if bindcallapplystrict check set to false
}









// //UNKNOWN
// let userInput: unknown;
// let userName: string;
// userName = "string"
// userInput = 5;
// userInput = "max";
// console.log(userInput)
// // userName = userInput //Error UNKNOWN type is not assignable to string. Any is different we can assign value.
// if (typeof userInput === 'string') {
//   userName = userInput
// }
// console.log(userName)

// function generateError(message: string, code: number):never { //it has NEVER type because it is throwing error and CRASHING so the next code doesn't run like below console
//   throw { message: message, errorCode: code }
//   // while(true) {} Same it also never returns
// } +


// console.log('result')
// const result = generateError('Error Occured', 500)
// console.log(result)
// throw new Error("Erro");