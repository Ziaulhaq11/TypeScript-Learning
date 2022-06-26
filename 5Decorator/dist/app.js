"use strict";
//Decorator
// function Logger(constructor:Function) { //Start with Capital Letters not mandatory.
//   console.log('Logging...');
//   console.log(constructor)
// }
// //Decorators executes when classes defined. Not executed or instantiated.
// @Logger
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//Decorator Factories
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
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
function WithTemplate(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(...args) {
                super();
                console.log('Rendering Template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
//Function runs from top to bottom but Decorators run from bottom to top.
let Person = class Person {
    constructor() {
        this.name = "Max";
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger('LOGGING-PERSON') //Just customising the value here 
    ,
    WithTemplate('<h1>My Person Object </h1>', 'app')
], Person);
const pers = new Person();
console.log(pers);
// ---
function Log(target, propertyName) {
    console.log("Property Decorator !!!");
    console.log(target, propertyName);
}
//Accessor and Method Decorators returns something. But Property and param decorator returns but that return doesn't do anything.
function Log2(target, name, descriptor) {
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Metthod Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Parameter Decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product('b1', 10);
const p2 = new Product('b2', 20);
//Autobind Decorator for solving this issue
function Autobind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this); //Now this will be referred to klj
        }
    };
}
class Printer {
    constructor() {
        this.message = "This works";
    }
    showMessage() {
        console.log(this.message);
    }
}
const p = new Printer();
// p.showMessage() 
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage.bind(p)); //Here bc its an event listener so this. is not the same now. Now its the target of the Event.To solve this we added bind method
