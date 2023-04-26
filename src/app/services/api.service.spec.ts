import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { Task } from '../models/task';
import { environment } from 'src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const todoId = "6815702202";
  const token = environment.apiKey;
  const baseURL =  environment.apiUrl;
  // let task:Task;
  let task: Task = {
    id: '',
    assigner_id: '',
    assignee_id: '',
    project_id: '',
    section_id: '',
    parent_id: '',
    order: 0,
    content: '',
    description: '',
    is_completed: false,
    labels: [],
    priority: 0,
    comment_count: 0,
    creator_id: '',
    created_at: '',
    due: '',
    url: ''
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  //Testing create task
  it('should create a new task', () => {
  const newTask = {
    
    content: 'New Task',
  };

  service.createTasks(newTask).subscribe(response => {
    expect(response).toEqual(task);
  });

  const req = httpMock.expectOne(baseURL);
  expect(req.request.method).toEqual('POST');
  expect(req.request.body).toEqual(newTask);
  expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
  expect(req.request.headers.get('Content-Type')).toEqual('application/json');
  const expectedResponse = (task)


  req.flush(expectedResponse, { status: 201, statusText: 'Created', headers: { 'location': baseURL } });
});

  it('should delete a todo item', () => {

    // Test delete task
    service.deleteTask(todoId).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseURL}${todoId}`);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    const mockResponse = { success: true };
    req.flush(mockResponse);
  });

  it('should close a todo item', () => {
    service.closeTask(todoId).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`https://api.todoist.com/rest/v2/tasks/${todoId}/close`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.body).toEqual(null);
    const mockResponse = { success: true };
    req.flush(mockResponse);
  });
  it('should reopen a todo item', () => {
    service.reopenTask(todoId).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`https://api.todoist.com/rest/v2/tasks/${todoId}/reopen`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.body).toEqual(null);
    const mockResponse = { success: true };
    req.flush(mockResponse);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update a todo item', () => {
    const updatedTodo = {
      content: 'Updated Todo Item'
    };
    

    service.updateTasks(updatedTodo, todoId).subscribe(response => {
      expect(response).toEqual(task);
    });

    const req = httpMock.expectOne(`${baseURL}${todoId}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      content: 'Updated Todo Item'
    });
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    const expectedResponse = {
      id: 123,
      content: 'Updated Todo Item',
      completed: true
    };

    req.flush(task);
  });
});