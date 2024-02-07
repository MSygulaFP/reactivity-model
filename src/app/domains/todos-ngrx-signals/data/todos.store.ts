import {TodosState} from ".";
import {signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {withCallState} from "./call-state";
import {computed} from "@angular/core";
import {todosMethods} from "./methods";

const initialState: TodosState = {
  todos: [],
  selectedId: null,
}

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCallState(),
  withMethods(todosMethods),
  withComputed(({ todos }) => ({
    completedTodos: computed(() => todos().filter(todo => todo.completed)),
    uncompletedTodos: computed(() => todos().filter(todo => !todo.completed)),
  })),
  withHooks({
    onInit({ load }) {
      load()
    },
  }),
)
