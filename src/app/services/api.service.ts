import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from '../models/task';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = "887e23f9298ee74b7a89d69099420fc4cc9323e4"
  handleError: any;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.API_KEY}`,
      'Content-Type': 'application/json'
    })
  };

  getAllTasks(){
    return this.http.get<Task[]>('https://api.todoist.com/rest/v2/tasks', this.httpOptions)
  }

  createTasks(item: Task): Observable<Task> {
    return this.http.post<Task>("https://api.todoist.com/rest/v2/tasks/", item, this.httpOptions);
  }
  deleteTask(taskID:string ): Observable<Task>{
    return this.http.delete<Task>(`https://api.todoist.com/rest/v2/tasks/${taskID}`, this.httpOptions);
  }
  updateTasks(item: Task,taskID:string ): Observable<Task> {
    console.log(taskID);
    
    
    return this.http.post<Task>(`https://api.todoist.com/rest/v2/tasks/${taskID}`, item, this.httpOptions);
  }

}
