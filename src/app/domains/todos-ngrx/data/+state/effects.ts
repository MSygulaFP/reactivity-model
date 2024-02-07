import { Actions, createEffect, ofType } from '@ngrx/effects';
import {inject} from "@angular/core";
import {TodosService} from "../todos.service";
import {todosActions} from "./actions";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";

export const init$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(todosActions.init),
      mergeMap(() => [
        todosActions.load()
      ])
    )
  },
  { functional: true }
);

export const load$ = createEffect(
  (actions$ = inject(Actions), todosService = inject(TodosService)) => {
    return actions$.pipe(
      ofType(todosActions.load),
      switchMap(() => todosService.getTodos().pipe(
        map((todos) => todosActions.loadSuccess({ todos })),
        catchError((error: { message: string }) => of(todosActions.loadError({ error: error.message })))
      ))
    )
  },
  { functional: true }
);

export const addTodo$ = createEffect(
  (actions$ = inject(Actions), todosService = inject(TodosService)) => {
    return actions$.pipe(
      ofType(todosActions.addTodo),
      switchMap(({ title }) => todosService.addTodo(title).pipe(
        map(() => todosActions.addTodoSuccess()),
        catchError(() => of(todosActions.addTodoError()))
      ))
    )
  },
  { functional: true }
)

export const addTodoSuccess$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(todosActions.addTodoSuccess),
      map(() => todosActions.load())
    )
  },
  { functional: true }
)

export const completeTodo$ = createEffect(
  (actions$ = inject(Actions), todosService = inject(TodosService)) => {
    return actions$.pipe(
      ofType(todosActions.completeTodo),
      switchMap(({ todoId }) => todosService.completeTodo(todoId).pipe(
        map(() => todosActions.completeTodoSuccess()),
        catchError(() => of(todosActions.completeTodoFailure()))
      ))
    )
  },
  { functional: true }
)

export const removeTodoFromComplete$ = createEffect(
  (actions$ = inject(Actions), todosService = inject(TodosService)) => {
    return actions$.pipe(
      ofType(todosActions.removeTodoFromComplete),
      switchMap(({ todoId }) => todosService.removeTodoFromComplete(todoId).pipe(
        map(() => todosActions.removeTodoFromCompleteSuccess()),
        catchError(() => of(todosActions.removeTodoFromCompleteFailure()))
      ))
    )
  },
  { functional: true }
)
