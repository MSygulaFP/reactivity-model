import {Component, inject} from "@angular/core";
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {Todo, TodosStore} from "../data";

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
export class TodosComponent {
  private store = inject(TodosStore);

  newTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required])
  });

  completedTodos = this.store.completedTodos;
  uncompletedTodos = this.store.uncompletedTodos;

  addTodo() {
    if (this.newTodoForm.invalid) {
      return;
    }

    this.store.add(this.newTodoForm.get('title')?.value || '');

    this.newTodoForm.reset()
  }

  completeTodo(element: Todo | undefined) {
    if (element) {
      this.store.complete(element.id);
    }
  }

  removeTodoFromComplete(element: Todo | undefined) {
    if (element) {
      this.store.removeTodoFromComplete(element.id);
    }
  }
}
