"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private employees: string[] = []; 
        this.employees = []; //It means it is private but accessible by extended Classes
    }
    addEmployee(employee) {
        // this.id = "2"; //Not changable bc its readonly.
        this.employees.push(employee);
    }
    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
    static createEmployee(name) {
        return { name: name };
    }
}
Department.fiscalYear = 2022;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT'); //Whenever we have sub Class we have to call this super function to pass parmas to base class
        this.admins = admins;
    }
    describe() {
        console.log('IT Department: ', this.id);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get recentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No Report found');
    }
    set recentReport(value) {
        if (!value) {
            throw new Error('Please pass a valid value');
        }
        this.addReport(value);
    }
    static getInstance() {
        console.log(this.instance);
        //So here what we are doing is checking whether there is a instance or not. If it is then passing the same instance not creating new Instance. But if we dont have then we're creating the instance in else block.
        if (this.instance) { //In Static method 'This' refers to Class Itself or you can use ClassName instead of this.
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        console.log(this.instance);
        return this.instance;
    }
    describe() {
        console.log('reports', this.id);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    addEmployee(employee) {
        if (employee === 'max') {
            return;
        }
        this.employees.push(employee);
    }
}
let it = new ITDepartment('d1', ['admin1', 'admin2']);
it.addEmployee('max');
it.addEmployee('zenskind');
it.describe();
console.log(it);
// let accounting = new AccountingDepartment('b1', [])
const accounting = AccountingDepartment.getInstance(); //Because we make tis class private by above method we cant create the instance of this hence this will be the way to go.
// const accounting2 = AccountingDepartment.getInstance() //Both will be same 
accounting.addReport('sale report');
accounting.addEmployee('max'); //this shouldnt work
accounting.addEmployee('manu');
accounting.recentReport = 'mani';
let employee = Department.createEmployee('raju');
console.log(employee, Department.fiscalYear);
console.log(accounting);
// class AccountingDepartment extends Department {
//   lastReport: string; //these variables should use in constructor.
//   get recentReport() { //It should hhave return keyword.Getters are used to access the private outside;
//     if (this.lastReport) {
//       return this.lastReport
//     }
//     throw new Error('No Report found')
//   }
//   set recentReport(value: string) {
//     if (!value) {
//       throw new Error('Please pass a valid value')
//     }
//     this.addReport(value)
//   }
//   constructor(id: string, private reports: string[]) {
//     super(id, 'Accounting')
//     this.lastReport = reports[0]
//   }
//   describe(){
//     console.log('reports',this.id)
//   }
//   addReport(text: string) {
//     this.reports.push(text);
//     this.lastReport = text;
//   }
//   addEmployee(employee: string) { //we can overwrite methods
//     if (employee === 'max') {
//       return;
//     }
//     this.employees.push(employee)
//   }
// }
// let account = new ITDepartment('d1', 'Accounting')//Even though this class is empty still it stores these valeus. Bc We dont have constructor here so base class constructor works here.
