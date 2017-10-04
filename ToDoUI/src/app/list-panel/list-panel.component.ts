import { Component, OnInit, Input} from '@angular/core';
import { Task } from "../../models/Task";
import { ToDoServiceService } from "../../services/to-do-service.service";

@Component({
  selector: 'td-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.css']
})
export class ListPanelComponent implements OnInit {

  @Input('filter')
  private filter: string;

  @Input('heading')
  private heading: string;

  @Input('tasks')
  private tasks: Task[];
  
  @Input('isSelectable')
  private isSelectable: boolean;

  taskName: string;

  constructor(private todoService: ToDoServiceService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.todoService.addTask(this.taskName);
    this.taskName = '';
  }

  onChange(isCompleted, taskNm) {
    if(isCompleted) {
      this.todoService.setTaskCompleted(taskNm);
    }
  }

  deleteTask(task) {
    this.todoService.deleteTask(task);
  }
}
