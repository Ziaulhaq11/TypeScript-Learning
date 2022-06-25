// class Department {
//   //private name: string;
//   //private readonly id: string;
//   //In JavaScript no Private is there.
//   private employees: string[] = []; //Now it is private . Public is by default
//   constructor(private readonly id:string,public name : string) { //These are called "Access Modifier". Shorthand for initialisation. By doing this these are initialised and can be accessed
//     // this.name = n;
//   } 
//   describe(this:Department) {
//     console.log(`Department (${this.id}) : ${this.name}`)
//   }
//   addEmployee(employee: string) {
//     // this.id = "2"; //Not changable bc its readonly.
//     this.employees.push(employee)
//   }
//   printEmployeeInfo() {
//     console.log(this.employees.length)
//     console.log(this.employees)
//   }
// }


// let account = new Department('d1', 'Accounting')
// account.addEmployee('max')
// account.addEmployee('zenskind')
// // account.employees[2] = 'Anna' Can do this but not recommended. Now with private we can't access outside class.
// account.describe()
// account.printEmployeeInfo()