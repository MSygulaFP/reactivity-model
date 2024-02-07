import {Routes} from "@angular/router";

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature-todos/todos.component').then(c => c.TodosComponent)
  }
]
