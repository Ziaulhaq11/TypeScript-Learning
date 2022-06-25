"use strict";
//Interface is like to describe how the object should look like.
// interface Person {
//   readonly name: string; //can be used in Type as well
//   age: number;
//   greet(phrase : string):void
// }
class Person {
    constructor(n, age) {
        this.name = n;
        this.age = age;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
    warn(phrase) {
        console.log(phrase + " " + this.name);
    }
}
let user1;
user1 = new Person('max', 34);
user1.greet('Hello');
// user1.name = 'manu'// Throws an error bc its interface is Greetable and there we declared its REadonly . But we have explicity put interface before declaration.
// user1.warn('Last warning for')
console.log(user1);
let add;
add = (n1, n2) => n1 + n2;
