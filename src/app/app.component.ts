import { Component, OnInit } from '@angular/core';
import { EditableTask, Task } from './models/task';
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
  editingIndex = -1;
  editText = '';
  isChecked = 0;
  selectedItems: Task[] = [];

  constructor(private apiconfig:ApiService){}

  ngOnInit() {
     this.getallTasks();

  }

  getallTasks() {
    this.apiconfig.getAllTasks();
    this.apiconfig.data$.subscribe((
      data)=> {
         this.tasks = data;
           console.log(this.tasks);
    },
      error => console.error(error)
    );  
  }


  addTask(form: NgForm) {
  
    const newTask = new EditableTask (
      this.addItemInput
    )
    console.log(newTask);
    this.apiconfig.createTasks(newTask).subscribe((response: Task) => {
      this.tasks.push(response);
      console.log(this.tasks);
  })
  }

      //edit task
    editItem(index: number) {
      this.editingIndex = index;
      this.editText = this.tasks[index].content;
    }
  
    saveEditing(taskID: string) {
      this.tasks[this.editingIndex].content = this.editText;
      this.editingIndex = -1;
      const editData = new EditableTask (
        this.editText
      )
      this.apiconfig.updateTasks( editData ,taskID)
      .subscribe((response: Task) => {
            console.log(response);
        })
      
      
    }
    cancelEditing() {
      this.editingIndex = -1;
      this.editText = '';
    }

      //Deteting  Task
      remove(taskID: string) {
        this.apiconfig.deleteTask(taskID).subscribe((response: Task) => {
          this.getallTasks();

          console.log(response);
      })
      }
      //close reopen task
      selectItem(item: Task, event: Event) {
        const checkbox = event.target as HTMLInputElement
        if(checkbox.checked){
          this.apiconfig.closeTask(item.id).subscribe((response: Task) => {
            this.getallTasks();
            console.log(response);
        })
          //close task

        }else{
          //reopen task
        }

      }
}
