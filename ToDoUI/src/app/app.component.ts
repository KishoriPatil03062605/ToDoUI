import { Component } from '@angular/core';
import { ToDoServiceService } from '../services/to-do-service.service';
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
  public isLoading: boolean;

  constructor(private toDoService: ToDoServiceService) {
    this.toDoService.observable.subscribe((todo) => {
      this.tasks = todo.tasks;
      if (!this.tasks) {
        this.tasks = [];
      }
      this.isSubmitted = true;
      this.isLoading = false;
    });
  }

  getToDoListByUserName() {
    this.isLoading = true;
    if (this.userName) {
      this.toDoService.getToDosByUserName(this.userName).subscribe((toDos) => {
        this.tasks = toDos.tasks;
        if (!this.tasks) {
          this.tasks = [];
        }
        this.isSubmitted = true;
      });
    }
  }

  logout() {
    this.isSubmitted = false;
    this.userName = '';
    this.tasks = [];
    this.isLoading = false;
  }

}
