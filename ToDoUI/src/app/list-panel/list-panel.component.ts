import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { ToDoServiceService } from '../../services/to-do-service.service';

@Component({
  selector: 'td-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.css']
})
export class ListPanelComponent implements OnInit {

  @Input('filter')
  filter: string;

  @Input('heading')
  heading: string;

  @Input('tasks')
  tasks: Task[];

  @Input('isSelectable')
  isSelectable;

  taskName: string;

  error: string;

  // isError: boolean;

  constructor(private todoService: ToDoServiceService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.isTaskPresent(this.taskName)) {
      this.taskName = '';
      this.error = 'Task already added...';
      setTimeout( () => {
        this.error = '';
      }, 1000 );
    } else {
      this.error = '';
      this.todoService.addTask(this.taskName);
      this.taskName = '';
    }
  }

  isTaskPresent(taskName): boolean {
    let flag = false;
    if (this.tasks) {
      this.tasks.forEach((task) => {
        if (task.value === taskName && task.status === 'PENDING') {
          flag = true;
        }
      });
    }
    return flag;
  }

  onChange(isCompleted, taskNm) {
    if (isCompleted) {
      this.todoService.setTaskCompleted(taskNm);
    }
  }

  deleteTask(task) {
    this.todoService.deleteTask(task);
  }

  isPending() {
    return this.isSelectable === 'true';
  }
}
