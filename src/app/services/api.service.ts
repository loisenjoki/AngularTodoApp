import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EditableTask, Task } from '../models/task';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})

export class ApiService {

private readonly apiUrl = environment.apiUrl;
  private readonly apiKey = environment.apiKey;

  private dataSubject = new BehaviorSubject<Task[]>([]);
  public data$ = this.dataSubject.asObservable();
  snackBar: any;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    })
  };

  getAllTasks(){
    
    return this.http.get<Task[]>(this.apiUrl, this.httpOptions)
    .subscribe(data=> this.dataSubject.next(data),
    error=> console.log(error));
      
  }

  createTasks(item: EditableTask): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, item, this.httpOptions);
  }
  deleteTask(taskID:string ): Observable<Task>{
    return this.http.delete<Task>(this.apiUrl+taskID, this.httpOptions);
  }
  updateTasks(item: EditableTask,taskID:string ): Observable<Task> {

    return this.http.post<Task>(this.apiUrl+taskID, item, this.httpOptions);
  }
  closeTask(taskID:string ): Observable<Task>{    
    
    return this.http.post<Task>(this.apiUrl+taskID+`/close`, null, this.httpOptions);
  }
  reopenTask(taskID:string ){
    return this.http.post<Task>(this.apiUrl+taskID+`/reopen`, null, this.httpOptions);
  }
}