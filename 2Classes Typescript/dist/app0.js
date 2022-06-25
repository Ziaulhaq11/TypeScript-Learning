"use strict";
class Departments {
    constructor(n) {
        this.name = n;
    }
    describe() {
        console.log('Department : ' + this.name);
    }
}
let accounts = new Departments('zia');
accounts.describe();
// let accountingCopy = { describe: account.describe }
// accountingCopy.describe()// It will be Undefined. Because "this" refers to this Object like Account Or AccountCopy. So here we called describe method on accountingCopy instance but this doesn't have THIS.name that's why getting Undefined;
// let accountingCopy = { describe: account.name }
// console.log(accountingCopy.describe)Here we will get the name
let accountingCopy = { name: 'DUMMY', describe: accounts.describe };
accountingCopy.describe();
