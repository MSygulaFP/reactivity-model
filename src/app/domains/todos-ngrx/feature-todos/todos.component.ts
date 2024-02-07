import {Component, inject, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Todo, todosActions, todosFeature} from "../data";
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CdkDragDrop, CdkDropList, DragDropModule} from "@angular/cdk/drag-drop";

@Component({
  standalone: true,
  selector: 'app-todos',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    DragDropModule
  ],
  templateUrl: './todos.component.html',
  styles: `
    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }
  `
})
export class TodosComponent implements OnInit {
  private store = inject(Store);

  newTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required])
  });

  completedTodos$ = this.store.select(todosFeature.selectCompletedTodos);
  uncompletedTodos$ = this.store.select(todosFeature.selectUncompletedTodos);

  ngOnInit() {
    this.store.dispatch(todosActions.init());
  }

  addTodo() {
    if (this.newTodoForm.invalid) {
      return;
    }

    this.store.dispatch(todosActions.addTodo({
      title: this.newTodoForm.get('title')?.value || ''
    }));

    this.newTodoForm.reset()
  }

  completeTodo(element: Todo | undefined) {
    if (element) {
      this.store.dispatch(todosActions.completeTodo({ todoId: element.id }))
    }
  }

  removeTodoFromComplete(element: Todo | undefined) {
    if (element) {
      this.store.dispatch(todosActions.removeTodoFromComplete({ todoId: element.id }))
    }
  }
}
