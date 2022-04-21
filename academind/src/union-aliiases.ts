//LITERAL TYPES and TYPE ALIASES

type Combinable = number | string; //This is called type aliases

function combine(
  input1: Combinable,
  input2: number | string,
  // conversion: string
  conversion : 'as-number' | 'as-text'
) {
  let result;
  // result = input1 + input2; Throws an type error because strings and numbers cant add. 
  if (typeof input1 === 'number' && typeof input2 === "number" || conversion === 'as-number') { //
    result = +input1 + +input2
  } else {
    result = input1.toString() + input2.toString()
  }
  return result
  // if (conversion === 'as-number') {
  //   return +result
  // } else {
  //   return result.toString()
  // }
}

const combinedAges = combine(30, 25, 'as-number')
console.log(combinedAges)
const combinedStringAges = combine('30', '25', 'as-number')
console.log(combinedStringAges)
const combinedNames = combine('Zia', 'ulhaq','as-text')
console.log(combinedNames)


//UNIONS

// function combine(input1: number | string, input2: number | string) {
//   let result;
//   // result = input1 + input2; Throws an type error because strings and numbers cant add. 
//   if (typeof input1 === 'number' && typeof input2 === "number") { //
//     result = input1 + input2
//   } else if(typeof input1 === 'string' && typeof input2 === "string") {
//     result = input1 + input2
//   }
  
//   return result ;
// }

// console.log(combine(2, 3))
// console.log(combine('Zia', 'ulhaq'))
