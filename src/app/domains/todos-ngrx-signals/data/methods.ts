import {inject} from "@angular/core";
import {TodosService} from "../../todos-ngrx/data";
import {patchState} from "@ngrx/signals";
import {setLoaded, setLoading} from "./call-state";
import {TodosState} from "./todos";
import {StateSignal} from "@ngrx/signals/src/state-signal";

export const todosMethods = (state: StateSignal<any>, todosService = inject(TodosService)) => {
  const load = async () => {
    patchState(state, setLoading());

    const todos = await todosService.getTodos().toPromise();

    patchState(state, setLoaded(), { todos })
  }

  const add = async (title: string) => {
    patchState(state, setLoading());

    await todosService.addTodo(title).toPromise();

    await load()
  };

  const complete = async (todoId: number) => {
    patchState(state, setLoading());

    await todosService.completeTodo(todoId).toPromise();

    await load()
  }

  const removeTodoFromComplete = async (todoId: number) => {
    patchState(state, setLoading());

    await todosService.removeTodoFromComplete(todoId).toPromise();

    await load()
  }

  return {
    load,
    add,
    complete,
    removeTodoFromComplete
  }
}
