import { Project, ProjectStatus } from '../models/project.js';
import { Component } from './base-component.js';
import {DragTarget} from '../models/drag-drop.js'
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project.js';
import { ProjectItem } from './project-item.js';


//ProjectList Class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    console.log("dragOverHandler");
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul");
      listEl?.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    console.log("dropHandler");
    const prjId = event.dataTransfer!.getData("text/plain");
    console.log(prjId);
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
    console.log(projectState.projects);
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    console.log("dragLeaveHandler");
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    listEl.innerHTML = ""; //because checking entries in DOM which has rendered will be costly so emptying all of that and then rendering via that. To avoid duplication
    //it will contain all the lists
    for (const prjItem of this.assignedProjects) {
      // const listItem = document.createElement('li')
      // listItem.textContent = prjItem.title;
      // listEl.appendChild(listItem)
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
}
