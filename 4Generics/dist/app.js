"use strict";
const names = []; //:string[] same
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});
promise.then(data => {
    console.log(data);
    data.split(' '); //You will get the string methods bc you explicitly said it will be string.
});
// function merge(objA: object, objB: object) {
//   return Object.assign(objA,objB)
// }//It will just return the Unknown object 
//These are generics
//Bc previously we're passing unknown objects. So the result will also be unknown object. 
// function merge<T ,U>(objA: T, objB: U) {
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
// const mergedObj = merge({ name: 'zia', hobbies : ['Spoorts'] }, { age: 23 }) //now we cant access Object properties. To solve this we've used Generics above.
// const mergedObj = merge({ name: 'zia', hobbies: ['Spoorts'] }, 30) //now there is a problem if I pass number instead of Object it is not throwing an error.
const mergedObj = merge({ name: 'zia', hobbies: ['Spoorts'] }, { age: 24 });
// function countAndPrint<T extends number[]>(element: T) {
function countAndPrint(element) {
    let descriptionText = 'Got no value.';
    if (element.length > 0) {
        descriptionText = 'Got ' + element.length + " elements.";
    }
    return [element, descriptionText];
}
// console.log(countAndPrint(['John', 'Simen']))
// function extractAndConvert(obj: object, key: string) {
//   return 'Value : ' + obj[key] //Now this is throwing the error bc Object might not have the "name" key in object.
// }
function extractAndConvert(obj, key) {
    return 'Value : ' + obj[key];
}
function createCourseGoal(title, description, date) {
    // return { title: title, description: description, completeUntil : date }
    // let courseGoal:CourseGoal = {} Throws error bc its an empty not full
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
// console.log(createCourseGoal('Induction', 'Induction training', new Date()))
const stringName = ["Max", 'Anna']; //work for Objects as well
// stringName.push('Manu') Now Typescript throws error if we add , remove items from this. But still values will be modified
// console.log(stringName)
//Generic Class
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
// textStorage.addItem(10) Error bc we mentiond string
textStorage.addItem('hele');
// textStorage.addItem(2) You cant add number now because we initially defined as String . "Where as in Unions you can "
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(2);
// const objStorage = new DataStorage<object>()
// objStorage.addItem({name : "Max"})  
// objStorage.addItem({ name: "Manu" })
// objStorage.removeItem({ name: "Max" }) //Here bc its an object when we pass this we're passing new Reference. So then removeItem doesnt find index of this and then it removes the last element.
// console.log(objStorage.getItems()); //It should return Manu but we got Max bc objects are reference based
// Generic Types or Unions
// Now here this will work but there are some problems here.
//1. We cant specifically insert only one type per Instance.
//2. And then we get Error in AddItem or Remove item because item may be number or boolean. So types doesnt match
// class DatsaStorage {
//   private data: string[] | number[] | boolean [] = [];
//   addItem(item: (string | number | boolean)) {
//     this.data.push(item)
//   }
//   removeItem(item: (string | number | boolean)) {
//     this.data.splice(this.data.indexOf(item), 1)
//   }
//   getItems() {
//     return [...this.data]
//   }
// }
