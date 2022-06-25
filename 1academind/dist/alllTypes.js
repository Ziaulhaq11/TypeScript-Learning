"use strict";
// const person:object //person.name gives error. So not recommended
// const person: { //Not recommended this because typescript automatically dooes this
//   name: string;
//   age: number
// }
const person = {
    name: 'Zia',
    age: 25,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};
// person.role.push('admin') Now we want only two values to be there but we can insert additional values like this
// person.role[1] = 10 //and can modify the type because we have this type already
// person.role[0] = false //This wont work bc its boolean
// let favouriteActivities :(string | number )[]; //string[] for just strings
// favouriteActivities = ['ssports', 'swimming',4]
for (let i of person.hobbies) {
    console.log(i.toUpperCase());
    console.log(i.charAt(0));
}
//TUPLES
const person2 = {
    name: "Zia",
    age: 23,
    hobbies: ['Sports', "cooking"],
    role: [2, 'developer']
};
// person2.role[0] = 'hir'  Now this wont work since we said it will be a number data type
person2.role.push('ljk'); //but this is working
// person2.role = [0, 'admin', 'user']  Now this wont work as the length but not for push
console.log(person2);
//ENUMS
// const ADMIN = 0;
// const AUTHOR = 1;
// const READ_ONLY = 2;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
; //starts with Capital letter {0, 1, 2}
// enum Role { ADMIN = "ADMIN", READ_ONLY = 100, AUTHOR = 200 };//starts with Capital letter {0, 1, 2}
var Role2;
(function (Role2) {
    Role2[Role2["ADMIN"] = 5] = "ADMIN";
    Role2[Role2["READ_ONLY"] = 6] = "READ_ONLY";
    Role2[Role2["AUTHOR"] = 7] = "AUTHOR";
})(Role2 || (Role2 = {})); //{5,6,7}
const person3 = {
    name: "Zzia",
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    // role : ADMIN
    role: Role.ADMIN //Role[1] both works
};
if (person3.role === Role.ADMIN) {
    console.log(person3);
}
//# sourceMappingURL=alllTypes.js.map