"use strict";
//Project State management
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, numOfPeople) {
        const newProject = {
            id: Date.now().toString(),
            title: title,
            description: description,
            people: numOfPeople
        };
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
function validate(validateInput) {
    let isValid = true;
    if (validateInput.required) {
        //in js after && if the condition is false then isValid will be false.
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    if (validateInput.minLength != null && //To allow 0 as well for min length
        typeof validateInput.value === "string") {
        isValid = isValid && validateInput.value.length >= validateInput.minLength;
    }
    if (validateInput.maxLength != null &&
        typeof validateInput.value === "string") {
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
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
//ProjectList Class
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = (document.getElementById("project-list"));
        this.hostElement = document.getElementById("app");
        this.assignedProjects = [];
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        //it will contain all the lists
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
//Project class
class ProjectInput {
    constructor() {
        // this.templateElement = document.getElementById('project-input')!; Here we want HTMLTemplateElement but getElementById is an HTML element so getting some errors.
        //Typecasting other method is document.getElemntById as HTMLTemplateElement
        this.templateElement = (document.getElementById("project-input"));
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        // console.log(importedNode.firstElementChild)
        //importedNode is DocumentFragment Type so we've to convert it to HTML element to render
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input"; //for styling purposes
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
        this.attach();
    }
    gatherInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 6,
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid input");
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        // Because we are executing this method via Event Listener "this" here doesn't refer to the class props. Instead it refers to events. TO solve this we're using bind method while calling this method. Or by using Autobind Decorators.
        // console.log(this.titleInputElement.value, this.descriptionInputElement.value)
        const userInput = this.gatherInput();
        //During Runtime we dont have access to typescript
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputElements();
        }
    }
    clearInputElements() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    configure() {
        // this.element.addEventListener('submit', this.submitHandler.bind(this))
        this.element.addEventListener("submit", this.submitHandler);
    }
    attach() {
        // this.hostElement.insertAdjacentElement('afterbegin', this.element)
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const input = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
