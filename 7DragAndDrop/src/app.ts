enum ProjectStatus {Active, Finished}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people : number, 
    public status : ProjectStatus
  ) {}
}

//Project State Management

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = []; 

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }
}

class ProjectState extends State<Project> {
  
  private projects: Project[] = [];
  private static instance: ProjectState;
  
  private constructor() {
    super()
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState();
    return this.instance
  }

  addProject(title : string, description : string, numOfPeople: number) {
    const newProject = new Project(Math.random.toString(), title, description, numOfPeople,ProjectStatus.Active )
    this.projects.push(newProject)
    for (const listenerFn of this.listeners) {
      console.log(listenerFn)
      listenerFn(this.projects.slice())
    }
  }
}

const projectState = ProjectState.getInstance()

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validateInput: Validatable): boolean {
  let isValid = true;
  if (validateInput.required) {
    //in js after && if the condition is false then isValid will be false.
    isValid = isValid && validateInput.value.toString().trim().length !== 0;
  }
  if (
    validateInput.minLength != null && //To allow 0 as well for min length
    typeof validateInput.value === "string"
  ) {
    isValid = isValid && validateInput.value.length >= validateInput.minLength;
  }
  if (
    validateInput.maxLength != null &&
    typeof validateInput.value === "string"
  ) {
    isValid = isValid && validateInput.value.length <= validateInput.maxLength;
  }
  if (validateInput.min != null && typeof validateInput.value === "number") {
    isValid = isValid && validateInput.value >= validateInput.min;
  }
  if (validateInput.max != null && typeof validateInput.value === "number") {
    isValid = isValid && validateInput.value <= validateInput.max;
  }
  console.log(isValid);
  return isValid;
}

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
    },
  };
  return adjDescriptor;
}
//Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> { //'abstract' makes sure that it wont be instantiated. Means no instance of this class.
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart : boolean,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) this.element.id = newElementId
    this.attach(insertAtStart)
  }
  private attach(insertAtBeginning:boolean) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
  }

  abstract configure(): void ; //by saying abstract we are saying that any class inheriting from this component should have this method
  abstract renderContent(): void;
}

//ProjectList Class
class ProjectList extends Component<HTMLDivElement,HTMLElement> {

  assignedProjects : Project[]

  constructor(private type: 'active' | 'finished') { 
    super('project-list', 'app',false,`${type}-projects`, )
    this.assignedProjects = []
    
    this.configure()
    this.renderContent()
  }

  configure(): void {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active
        }
        return prj.status === ProjectStatus.Finished
      })
      this.assignedProjects = relevantProjects;
      this.renderProjects()
    })
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'

  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
    listEl.innerHTML = '' //because checking entries in DOM which has rendered will be costly so emptying all of that and then rendering via that. To avoid duplication
    //it will contain all the lists
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li')
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem)
    }
  }
}


//Project class
class ProjectInput extends Component<HTMLDivElement,HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    // this.templateElement = document.getElementById('project-input')!; Here we want HTMLTemplateElement but getElementById is an HTML element so getting some errors.
    super('project-input', 'app', true, 'user-input') 
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    // this.element.addEventListener('submit', this.submitHandler.bind(this))
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {
    
  }

  private gatherInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 6,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input");
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    // Because we are executing this method via Event Listener "this" here doesn't refer to the class props. Instead it refers to events. TO solve this we're using bind method while calling this method. Or by using Autobind Decorators.
    // console.log(this.titleInputElement.value, this.descriptionInputElement.value)
    const userInput = this.gatherInput();
    //During Runtime we dont have access to typescript
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title,desc,people)
      this.clearInputElements();
    }
  }

  private clearInputElements() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  
}

const input = new ProjectInput();
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')