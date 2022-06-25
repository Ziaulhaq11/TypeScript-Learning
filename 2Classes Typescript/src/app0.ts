class Departments {
  //This refers to the instance of the class.
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  describe(this: Departments) { //By Doing this we're saying Instance should be a instance of Class only by having all the params. Otherwise it will throw an error.Like DUMMY name which was mentioned before.Its TypeScript Specific
    console.log('Department : ' + this.name)
  }
}

let accounts = new Departments('zia')
accounts.describe()
// let accountingCopy = { describe: account.describe }
// accountingCopy.describe()// It will be Undefined. Because "this" refers to this Object like Account Or AccountCopy. So here we called describe method on accountingCopy instance but this doesn't have THIS.name that's why getting Undefined;
// let accountingCopy = { describe: account.name }
// console.log(accountingCopy.describe)Here we will get the name
let accountingCopy = { name: 'DUMMY', describe: accounts.describe }
accountingCopy.describe()