import { Component } from '@angular/core';
import {ToDoServiceService} from '../services/to-do-service.service';
import { Task } from '../models/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userName: string;
  isSubmitted = false;
  tasks: Task[];

  constructor(private toDoService: ToDoServiceService){
    this.toDoService.observable.subscribe((todo) => {
      this.tasks = todo.tasks;
    });
  }

  getToDoListByUserName() {
    if (this.userName) {
      this.toDoService.getToDosByUserName(this.userName).subscribe((toDos) => {
        this.tasks = toDos.tasks;
      });
      this.isSubmitted = true;
    }
  }

}
