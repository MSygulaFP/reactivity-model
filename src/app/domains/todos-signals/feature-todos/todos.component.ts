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
  todos = signal<Todo[]>([]);

  loggingEffect = effect(() => {
    console.log('--------------------------');
    console.log(`Current todos count ${this.todos().length}`);
    console.log(`Todo ${this.uncompletedTodos().length}`);
    console.log(`Finished ${this.completedTodos().length}`);
    console.log('--------------------------');
  })

  completedTodos = computed(() => {
    console.log('> Update value of completedTodos because todos() was changed');

    return this.todos().filter(todo => todo.completed);
  });

  uncompletedTodos = computed(() => {
    console.log('> Update value of uncompletedTodos because todos() was changed');

    return this.todos().filter(todo => !todo.completed);
  })

  newTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required])
  });

  addTodo() {
    if (this.newTodoForm.invalid) {
      return;
    }

    this.todos.update((todos) => {
      return [
        ...todos,
        {
          id: todos.length + 1,
          completed: false,
          title: this.newTodoForm.get('title')?.value || '',
          userId: 1
        }
      ]
    })

    this.newTodoForm.reset()
  }

  completeTodo(event: CdkDragDrop<any>) {
    const todoId = this.uncompletedTodos()[event.previousIndex].id;
    const todoIndex = this.todos().findIndex(todo => todo.id === todoId);

    this.todos.update(todos => {
      todos[todoIndex].completed  = true;

      return [...todos];
    });
  }

  removeTodoFromComplete(event: CdkDragDrop<any>) {
    const todoId = this.uncompletedTodos()[event.previousIndex].id;
    const todoIndex = this.todos().findIndex(todo => todo.id === todoId);

    this.todos.update(todos => {
      todos[todoIndex].completed  = false;

      return [...todos];
    });
  }
}
