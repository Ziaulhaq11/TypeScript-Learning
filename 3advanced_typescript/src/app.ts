//Intersection types 
type Admin = { //We can use interface as well
  name: string;
  privileges : string[]
}

type Employee = {
  name: string;
  startDate: Date;
}
// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate : new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;
//This we can't do with interface;
// interface Universal2 extends Combinable,Numeric
type Universal = Combinable & Numeric; //Now this is number type bc in both cases we have number type .For & it should take if values are existing in both. For | it will take any values which are existed
let universal: Universal = 5
type UnknownEmployee = Employee | Admin
function printEmployee (emp: UnknownEmployee) {
  console.log('Name : ' + emp.name)
  // if(typeof emp === 'obj')doesn't work here
  // if(emp.privileges)also throws error it works in javascript but not in typescript
  if ('privileges' in emp) {
    console.log('Privileges : ' + emp.privileges) //Now we're getting error bc Name we have in both but privilege exists in only one.
  }
}
//instanceof,typeof -- typeguards
const e2: UnknownEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
}
printEmployee(e2)

class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving teh truck...')
  }
  loadCargo(amount: number) {
    console.log('Loading Cargo...' + amount)
  }
}

type Vehicle = Car | Truck;
const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if('loadCargo' in vehicle) Should also works
  if (vehicle instanceof Truck) { //its javascript only
    vehicle.loadCargo(100)
  }
}

useVehicle(v1)
useVehicle(v2)

//Discriminated Union
interface Bird {
  type : 'bird'
  flyingSpeed : number
}

interface Horse {
  type : 'horse'
  runningSpeed : number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed
      break;
    case 'horse':
      speed = animal.runningSpeed
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 20 })

//TypeCasting
// const paragraph = document.querySelector('p') //HTMLParagraphElement 
// const paragraph = document.getElementById('output') //HTMLElement bc TypeScript doesn't know on what tag this output is. Its not a problem when we have a "P" but when we have input element and want to access the value then its become a problem
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')
const userInputElement = document.getElementById('user-input') as HTMLInputElement;//By Providing typeCast we're saying its not gonna be null
userInputElement.value = "Hi There!"//now it is throwing err bc HTML element type doesn't contain value objects

//Index Properties
interface ErrorContainer { //{email:'not a valid email', username : 'Must start with a character'}
  // id: string; //not a number because below index is only string..
  [prop: string]: string; //not booleans
}

const errorBag: ErrorContainer = {
  email: "Not a valid email", //bc we set to string we can set property as number type as well. But not string when set to number type..
  userName : 'Must start with a capital Ccharacter'
} //empty object will also fine

//Function Overloads
function add(a:number,b:number):number;
function add(a:string,b:string):string;
function add(a:Combinable, b:Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }  
  return a + b;
}

// const result = add('Max', 'Schwarz') as string;
const result = add('Max', 'Schwarz') ; //result type should be string but it is showing as Combinable 
result.split(' ')

//Optional Chaining.
const fetchedUserData = {
  id: 'u1',
  name: "Max",
  job : {title : "CEO", description: "My Own Business"}
}
//So while fetching data from backend with multiple chains like this we dont know whether sub chains exist or not..
// console.log(fetchedUserData.job && fetchedUserData.job.title); WE can avoid this error like this in JS. By checking if first one exists then move to second one
console.log(fetchedUserData?.job?.title) //But this actually works when we set Types of object and pass ? this to the field which might not exist.

//Nullish Coalescing..
const userInput = ''; 
// const storedData = userInput || 'DEFAULT'; //Bc its empty its treated as falsy value. And we store Default value. what if we want to set Default only if it is NUL OR UNDEFINED
const storedData = userInput ?? 'DEFAULT'; //This solves the problem.
console.log(storedData)