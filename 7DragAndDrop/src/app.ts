//Object Oriented approach

//Autobind Decorator
// function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {

//bc we're not using target and methodName getting errors. To solve this we can use _ variables which indicates typescript that we're not using these else. Or we can turn off useParameters in tsconfig.json
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true, //it means we can always change it
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor
}

//Project class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    // this.templateElement = document.getElementById('project-input')!; Here we want HTMLTemplateElement but getElementById is an HTML element so getting some errors.

    //Typecasting other method is document.getElemntById as HTMLTemplateElement
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-input');
    this.hostElement = document.getElementById('app') as HTMLDivElement

    const importedNode = document.importNode(this.templateElement.content, true)
    //importedNode is DocumentFragment Type so we've to convert it to HTML element to render
    this.element = importedNode.firstElementChild as HTMLFormElement
    this.element.id = 'user-input' //for styling purposes

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

    this.configure()
    this.attach()
  }

  private gatherInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
      alert('Invalid input')
    } else {
      return [enteredTitle,enteredDescription,+enteredPeople]
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    // Because we are executing this method via Event Listener "this" here doesn't refer to the class props. Instead it refers to events. TO solve this we're using bind method while calling this method. Or by using Autobind Decorators.
    // console.log(this.titleInputElement.value, this.descriptionInputElement.value)
    const userInput = this.gatherInput()
    //During Runtime we dont have access to typescript
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title,desc,people)
    }
    this.clearInputElements()
  }

  private clearInputElements() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  private configure() {
    // this.element.addEventListener('submit', this.submitHandler.bind(this))
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    // this.hostElement.insertAdjacentElement('afterbegin', this.element)
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const input = new ProjectInput()