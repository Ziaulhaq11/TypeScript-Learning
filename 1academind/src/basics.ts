function adds(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2
  if (showResult) {
    // console.log(phrase + n1 + n2);// now result will be 5 + 2.8 = 52.8 which is wrong
    console.log(phrase + result)
    console.log(`${phrase} ${n1 + n2}`)
  } else {
    return n1 + n2 ;
  }
}

let number = 5;
let number1; //Now assign the type for other variables if values are assigned no need to give type
// number1 = "5" //This is not throwing error even though it is wrong thats because it has "any" ttype BUT after config file it is throwing eror
number1 = 5
const number2 = 2.8;
const printResults = true;
let resultPhrase = "Result is : "
// number1 = "asd".Throws err. Even though I didn't specify what type is TypeScript detects that based on the assigned values.

adds(number1, number2, printResults, resultPhrase) //throws err bc only 2 args are there.