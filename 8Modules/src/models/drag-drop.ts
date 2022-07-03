//Without namespace I was able to access these.
//Drag and Drop Interfaces
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void; //is it a valid target otherwise drop will not work
  dropHandler(event: DragEvent): void; //then drop will handle
  dragLeaveHandler(event: DragEvent): void; //do something if drop happens or not
}
