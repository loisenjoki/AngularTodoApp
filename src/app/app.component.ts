import { Component } from '@angular/core';
import { Task } from './modules/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Todo app';

  filter: 'all' | 'uncomplete' | 'completed' = 'all';

  allTasks = [
    { description: 'eat', completed: true },
    { description: 'sleep', completed: false },
    { description: 'play', completed: false },
    { description: 'laugh', completed: false },
  ];


  get tasks() {
    if (this.filter === 'all') {
      return this.allTasks;
    }
    return this.allTasks.filter((task) => this.filter === 'completed' ? task.completed : !task.completed);
  }

  addTask(description: string) {
    this.allTasks.unshift({
      description,
      completed: false
    });
  }

  remove(item: Task) {
    this.allTasks.splice(this.allTasks.indexOf(item), 1);
  }
}
