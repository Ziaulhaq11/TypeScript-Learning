"use strict";
var _a;
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
let universal = 5;
function printEmployee(emp) {
    console.log('Name : ' + emp.name);
    // if(typeof emp === 'obj')doesn't work here
    // if(emp.privileges)also throws error it works in javascript but not in typescript
    if ('privileges' in emp) {
        console.log('Privileges : ' + emp.privileges); //Now we're getting error bc Name we have in both but privilege exists in only one.
    }
}
//instanceof,typeof -- typeguards
const e2 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
printEmployee(e2);
class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving teh truck...');
    }
    loadCargo(amount) {
        console.log('Loading Cargo...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    // if('loadCargo' in vehicle) Should also works
    if (vehicle instanceof Truck) { //its javascript only
        vehicle.loadCargo(100);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving at speed: ' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 20 });
//TypeCasting
// const paragraph = document.querySelector('p') //HTMLParagraphElement 
// const paragraph = document.getElementById('output') //HTMLElement bc TypeScript doesn't know on what tag this output is. Its not a problem when we have a "P" but when we have input element and want to access the value then its become a problem
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')
const userInputElement = document.getElementById('user-input'); //By Providing typeCast we're saying its not gonna be null
userInputElement.value = "Hi There!"; //now it is throwing err bc HTML element type doesn't contain value objects
const errorBag = {
    email: "Not a valid email",
    userName: 'Must start with a capital Ccharacter'
}; //empty object will also fine
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
// const result = add('Max', 'Schwarz') as string;
const result = add('Max', 'Schwarz'); //result type should be string but it is showing as Combinable 
result.split(' ');
//Optional Chaining.
const fetchedUserData = {
    id: 'u1',
    name: "Max",
    job: { title: "CEO", description: "My Own Business" }
};
//So while fetching data from backend with multiple chains like this we dont know whether sub chains exist or not..
// console.log(fetchedUserData.job && fetchedUserData.job.title); WE can avoid this error like this in JS. By checking if first one exists then move to second one
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title); //But this actually works when we set Types of object and pass ? this to the field which might not exist.
//Nullish Coalescing..
const userInput = '';
// const storedData = userInput || 'DEFAULT'; //Bc its empty its treated as falsy value. And we store Default value. what if we want to set Default only if it is NUL OR UNDEFINED
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'DEFAULT'; //This solves the problem.
console.log(storedData);
