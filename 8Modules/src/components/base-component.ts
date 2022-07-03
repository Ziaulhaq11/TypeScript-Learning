  //Component Base Class
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
    //'abstract' makes sure that it wont be instantiated. Means no instance of this class.
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    //By using this class we're taking the templateElement and its content and then inserting our element which comes from the templateElement in our hosting Element.
    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId) as T;

      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as U;
      if (newElementId) this.element.id = newElementId;
      this.attach(insertAtStart);
    }
    private attach(insertAtBeginning: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract configure(): void; //by saying abstract we are saying that any class inheriting from this component should have this method
    abstract renderContent(): void;
  }
