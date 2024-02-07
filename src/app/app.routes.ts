import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'plain',
    pathMatch: 'full'
  },
  {
    path: 'plain',
    loadChildren: () => import('./domains/todos/todos.routes').then(m => m.TODOS_ROUTES)
  },
  {
    path: 'signals',
    loadChildren: () => import('./domains/todos-signals/todos.routes').then(m => m.TODOS_ROUTES)
  },
  {
    path: 'ngrx',
    loadChildren: () => import('./domains/todos-ngrx/todos.routes').then(m => m.TODOS_ROUTES)
  },
  {
    path: 'ngrx-signals',
    loadChildren: () => import('./domains/todos-ngrx-signals/todos.routes').then(m => m.TODOS_ROUTES)
  },
];
