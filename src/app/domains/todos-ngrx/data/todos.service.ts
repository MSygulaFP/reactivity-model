import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Todo} from "./todos";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>(`${environment.apiUrl}todos`);
  }

  addTodo(title: string) {
    return this.http.post(`${environment.apiUrl}todos`, { title })
  }

  completeTodo(todoId: number) {
    return this.http.patch(`${environment.apiUrl}todos/${todoId}`, {
      completed: true
    })
  }

  removeTodoFromComplete(todoId: number) {
    return this.http.patch(`${environment.apiUrl}todos/${todoId}`, {
      completed: false
    })
  }
}
