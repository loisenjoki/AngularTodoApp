import { Component, OnInit } from '@angular/core';
import { Task } from './models/task';
import { ApiService } from './services/api.service';
import { FormControl, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Todo app';
  tasks: any[] | any;
  addItemInput!: string;
  editItemInput!:string;
  editable = false;




  filter: 'all' | 'uncomplete' | 'completed' = 'all';

 


  constructor(private apiconfig:ApiService){}

  ngOnInit() {
     this.getallTasks();
    // console.log(this.allTasks());
    //this.allTasks:Task[] = this.task

  }

  getallTasks() {
    this.apiconfig.getAllTasks()
      .subscribe((data) => {
        this.tasks = data;
         
        console.log(this.tasks);
      }, (error) => {
        console.error(error);
      });
  }


  addTask(form: NgForm) {
    if (form.valid) {
    }
    let items;
    for (items of this.tasks);
    console.log(items.project_id);
  
      const newTask: Task = {
        content: this.addItemInput,
        priority: 2,
        completed: false,
        id: '',
        assigner_id: items.assigner_id,
        assignee_id: items.assignee_id,
        project_id: items.project_id,
        section_id: items.section_id,
        parent_id:items.parent_id,
        order: 0,
        description: '',
        is_completed: false,
        labels: [],
        comment_count: 0,
        creator_id: '',
        created_at: '',
        due: '',
        url: ''
      };
    console.log(newTask);
    this.apiconfig.createTasks(newTask).subscribe((response: Task) => {
      console.log(response);
  })
  }
  //Deteting  Task
  remove(taskID: string) {
    this.apiconfig.deleteTask(taskID).subscribe((response: Task) => {
      console.log(response);
  })
   
  }
    //update   Task
    editTask() {      
      let items;
      for (items of this.tasks);
      console.log(items.id);
    
        const newTask: Task = {
          content: this.editItemInput,
          priority: 2,
          completed: false,
          id: '',
          assigner_id: items.assigner_id,
          assignee_id: items.assignee_id,
          project_id: items.project_id,
          section_id: items.section_id,
          parent_id:items.parent_id,
          order: 0,
          description: '',
          is_completed: false,
          labels: [],
          comment_count: 0,
          creator_id: '',
          created_at: '',
          due: '',
          url: ''
        };

      this.apiconfig.updateTasks( newTask ,items.id).subscribe((response: Task) => {
        console.log(response);
    })
     
    }


}
