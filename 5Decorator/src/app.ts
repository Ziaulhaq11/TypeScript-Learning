//Decorator
// function Logger(constructor:Function) { //Start with Capital Letters not mandatory.
//   console.log('Logging...');
//   console.log(constructor)
// }
// //Decorators executes when classes defined. Not executed or instantiated.
// @Logger

//Decorator Factories
function Logger(logString:string) {
  return function (constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

// This will execute once class is defined not on instantiation.

// function WithTemplate(template: string, hookId: string) {
//   return function (originalConstructor: any) {
//   // return function (_: Function) { //_means we're saying I wont use this param but I have one
//     const hookEl = document.getElementById(hookId)
//     const p = new originalConstructor();
//     if (hookEl) {
//       hookEl.innerHTML = template;
//       hookEl.querySelector('h1')!.textContent = p.name
//     }
//   }
// }

//But because we are returning from decorators so it will execute on instantiation. So now if we remove the instance below which is "pers" this decorator wont run.
function WithTemplate(template: string, hookId: string) {
  return function <T extends {new (...args : any[]): {name :string}}> (originalConstructor: T) {
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super();
        console.log('Rendering Template')
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}
//Function runs from top to bottom but Decorators run from bottom to top.
@Logger('LOGGING-PERSON') //Just customising the value here 
@WithTemplate('<h1>My Person Object </h1>', 'app')
class Person {
  name = "Max";

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers)
// ---

function Log(target: any, propertyName: string) {//Because we're running Decorator on properties of class which will be like Prototype. Not the class itself so we've these two params now "target,propertyName". 
  console.log("Property Decorator !!!")
  console.log(target,propertyName)
}

//Accessor and Method Decorators returns something. But Property and param decorator returns but that return doesn't do anything.

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor Decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Metthod Decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

function Log4(target: any, name: string, position: number) { //not the name of parameter but name of method in which it was called
  console.log('Parameter Decorator')
  console.log(target)
  console.log(name)
  console.log(position)
}

class Product {
  @Log 
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}

const p1 = new Product('b1', 10)
const p2 = new Product('b2', 20)

//Autobind Decorator for solving this issue
function Autobind(target: any, methodName : string,descriptor : PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this) //Now this will be referred to klj
    }
  }
}
class Printer {
  message = "This works";
  
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer()
// p.showMessage() 
const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage.bind(p)) //Here bc its an event listener so this. is not the same now. Now its the target of the Event.To solve this we added bind method