function addNumber(n1: number, n2: number) { //return type is number here or we can set like this. Dont set the type its not mandatory
  return n1 + n2;
}
// function printResults(num: number): undefined { //If undefined is there we have to use return keyword. Actually both are same but typescript does this
//   console.log('Result : ' + num)
//   return ;
// }

function printResult(num: number):void { //Here Return type is void because we are not returning anything
  console.log('Result : ' + num)
  // return -- You can use empty return as well
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  const result2 = cb(result)
  return result2
}

printResult(addNumber(5, 12))

// let combineValues;
// combineValues = add;
// combineValues = 5; //Now we assign number. Typescript doesn't throw error below. But by declaring with nothing it takes any and we can assign any value
// let combineValues: Function;
// combineValues = printResult; //Here also we have one argument but it is not throwing error.This will solve the problem
let combineValues : (a: number, b: number) => number;
combineValues = addNumber;
console.log(combineValues(3, 5)) 


addAndHandle(10, 20, (result) => {
  console.log(result)
})

// console.log(addAndHandle(10, 20, (result) => { //Now it returns 31 because we are returning from anonymous function
//   console.log(result)
//   return result + 1 //Even though we have void return type but still we can pass here return value.
// }))