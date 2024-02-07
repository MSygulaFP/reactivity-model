import {Routes} from "@angular/router";
import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import * as todosEffects from './data/+state/effects';
import {todosFeature} from "./data";

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature-todos/todos.component').then(c => c.TodosComponent),
    providers: [
      provideState(todosFeature),
      provideEffects(todosEffects)
    ]
  }
]
