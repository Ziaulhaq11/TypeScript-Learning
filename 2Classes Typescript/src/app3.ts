//Interface is like to describe how the object should look like.
// interface Person {
//   readonly name: string; //can be used in Type as well
//   age: number;
//   greet(phrase : string):void
// }

// let user1: Person;
// user1 = {
//   name: 'Max',
//   age: 23,
//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name)
//   }
// }

// user1.greet('Hi there I am ')
// user1.name = 'mehul' Now it throws error bc we said Its READONLY
// console.log(user1)

//Extending Interface

interface Named {
  readonly name: string;
  outputName?: string; //makes optional field.
}

interface Greetable extends Named { //extends many by ","
  // readonly name: string;      
  greet(phrase: string): void
}

interface Warning {
  warn(phrase:string):void
}

class Person implements Greetable,Warning { //You can implement multiple interfaces not like Inheritance which was only 1. , annd other instance.
  name: string;
  age: number;
  constructor(n: string, age: number) { //Noww we have to follow the types of interface.
    this.name = n;
    this.age = age;
  }
  greet(phrase: string): void {
    console.log(phrase + " " + this.name) 
  }
  warn(phrase: string): void {
    console.log(phrase +  " " + this.name)
  }
}
let user1: Greetable;
user1 = new Person('max', 34)
user1.greet('Hello')
// user1.name = 'manu'// Throws an error bc its interface is Greetable and there we declared its REadonly . But we have explicity put interface before declaration.
// user1.warn('Last warning for')
console.log(user1)

// type Addfn = (a:number,b:number) => number
interface Addfn {
  (a:number,b:number):number
}

let add: Addfn;
add = (n1:number,n2:number) => n1+n2
