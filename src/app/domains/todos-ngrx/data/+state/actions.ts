import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Todo} from "../todos";

export const todosActions = createActionGroup({
  source: 'Todos',
  events: {
    init: emptyProps(),

    load: emptyProps(),
    loadSuccess: props<{ todos: Todo[] }>(),
    loadError: props<{ error: string }>(),

    addTodo: props<{ title: string }>(),
    addTodoSuccess: emptyProps(),
    addTodoError: emptyProps(),

    completeTodo: props<{ todoId: number }>(),
    completeTodoSuccess: emptyProps(),
    completeTodoFailure: emptyProps(),

    removeTodoFromComplete: props<{ todoId: number }>(),
    removeTodoFromCompleteSuccess: emptyProps(),
    removeTodoFromCompleteFailure: emptyProps(),
  }
})
