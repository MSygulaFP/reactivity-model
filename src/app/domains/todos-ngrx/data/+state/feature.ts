import {Todo} from "../todos";
import {createFeature, createReducer, createSelector, on} from "@ngrx/store";
import {todosActions} from "./actions";

type CallState = 'init' | 'loading' | 'loaded' | 'error';

interface TodosState {
  todos: Todo[];
  selectedId: number | null;
  callState: CallState;
  error: string | null
}

const initialState: TodosState = {
  todos: [],
  selectedId: null,
  callState: 'init',
  error: null
}

export const todosFeature = createFeature({
  name: 'todos',
  reducer: createReducer(
    initialState,

    on(todosActions.load, (state: TodosState) => ({
      ...state,
      callState: 'loading' as CallState
    })),

    on(todosActions.loadSuccess, (state: TodosState, { todos }) => ({
      ...state,
      callState: 'loaded' as CallState,
      todos
    })),

    on(todosActions.loadError, (state: TodosState, { error }) => ({
      ...state,
      callState: 'loaded' as CallState,
      error
    })),
  ),
  extraSelectors: ({ selectTodos }) => ({
    selectUncompletedTodos: createSelector(selectTodos, todos => todos.filter(todo => !todo.completed)),
    selectCompletedTodos: createSelector(selectTodos, todos => todos.filter(todo => todo.completed))
  })
})

