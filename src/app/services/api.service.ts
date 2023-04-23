import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EditableTask, Task } from '../models/task';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = "887e23f9298ee74b7a89d69099420fc4cc9323e4"
  public dataSubject = new BehaviorSubject<Task[]>([]);
  public data$ = this.dataSubject.asObservable();

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.API_KEY}`,
      'Content-Type': 'application/json'
    })
  };

  getAllTasks(){
    return this.http.get<Task[]>('https://api.todoist.com/rest/v2/tasks', this.httpOptions)
    .subscribe(data=> this.dataSubject.next(data),
    error=> console.log(error));
      
  }

  createTasks(item: EditableTask): Observable<Task> {
    return this.http.post<Task>("https://api.todoist.com/rest/v2/tasks/", item, this.httpOptions);
  }
  deleteTask(taskID:string ): Observable<Task>{
    return this.http.delete<Task>(`https://api.todoist.com/rest/v2/tasks/${taskID}`, this.httpOptions);
  }
  updateTasks(item: EditableTask,taskID:string ): Observable<Task> {
    console.log(taskID);
    console.log(item);
    return this.http.post<Task>(`https://api.todoist.com/rest/v2/tasks/${taskID}`, item, this.httpOptions);
  }

}
