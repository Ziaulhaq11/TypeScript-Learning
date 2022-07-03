import { autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project.js";
import { validate,Validatable } from "../utils/project-validate.js";
import { Component } from "./base-component.js";

//Project class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    // this.templateElement = document.getElementById('project-input')!; Here we want HTMLTemplateElement but getElementById is an HTML element so getting some errors.
    super("project-input", "app", true, "user-input");
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

  renderContent(): void {}

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
      projectState.addProject(title, desc, people);
      this.clearInputElements();
    }
  }

  private clearInputElements() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
}
