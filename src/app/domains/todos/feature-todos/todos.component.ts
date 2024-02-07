import {ChangeDetectorRef, Component, computed, effect, inject, signal} from "@angular/core";
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CdkDragDrop, DragDropModule} from "@angular/cdk/drag-drop";
import {Todo} from "../../todos-ngrx/data";

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
  todos: Todo[] = [];

  completedTodos: Todo[] = [];
  uncompletedTodos: Todo[] =[];

  newTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required])
  });

  addTodo() {
    if (this.newTodoForm.invalid) {
      return;
    }

    this.todos = [
      ...this.todos,
      {
        id: this.todos.length + 1,
        completed: false,
        title: this.newTodoForm.get('title')?.value || '',
        userId: 1
      }
    ]

    this.newTodoForm.reset();
    this.updateTodos();
  }

  completeTodo(event: CdkDragDrop<any>) {
    const todoId = this.uncompletedTodos[event.previousIndex].id;
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

    this.todos[todoIndex].completed  = true;

    this.updateTodos();
  }

  removeTodoFromComplete(event: CdkDragDrop<any>) {
    const todoId = this.completedTodos[event.previousIndex].id;
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

    this.todos[todoIndex].completed  = false;

    this.updateTodos();
  }

  updateTodos() {
    this.completedTodos = this.todos.filter(todo => todo.completed);
    this.uncompletedTodos = this.todos.filter(todo => !todo.completed);
  }
}
