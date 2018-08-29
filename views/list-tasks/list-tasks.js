let AbstractView = require('../../abstract-view-class.js');
let {Project, Task, Member} = require('../../data/project.js');

class ListTasks extends AbstractView
{
  constructor(element, project, prefix)
  {
    super(element);
    this.project = project
    this.listTasks = this.project.tasks;
    this.prefix = prefix;
  }

  display()
  {
    let htmlText = `
      <h3>Tasks</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">In charge</th>
            <th scope="col">Assigned</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Finished ?</th>
            <th scope="col">Controls</th>
          </tr>
        </thead>
        <tbody>
          ${this.getHTMLLists()}
        </tbody>
      </table>
      <div class="action-btn-list-tasks">
        <button type="button" id="${this.prefix}-add-task" class="btn btn-primary">
          <i class="fas fa-plus"></i> Add a task
        </button>
      </div>
    `;

    $(this.element).html(htmlText);
    this.addEvent();
  }

  getHTMLLists()
  {
    let htmlText = '';

    for(let i = 0; i < this.listTasks.length; i++)
    {
      let task = this.listTasks[i];
      let peopleAssigned = '';

      for(let i = 0; i < task.workingOn.length; i++)
      {
        peopleAssigned += task.workingOn[i].name;

        if(i < task.workingOn.length - 1)
        {
          peopleAssigned += ', ';
        }
      }

      htmlText += `<tr>
        <th scope="row">${task.name}</th>
        <td>${task.inCharge.name}</td>
        <td>${peopleAssigned}</td>
        <td>${task.from.toLocaleDateString()}</td>
        <td>${task.to.toLocaleDateString()}</td>
        <td>
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" ${task.finished ? 'checked' : ''} disabled>
            <label class="custom-control-label" for="customCheckDisabled">Finished</label>
          </div>
        </td>
        <td>
          <button class="btn btn-link btn-edit-task ${this.prefix}-edit" data-task-index="${i}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-link btn-delete-task ${this.prefix}-delete" data-task-index="${i}"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    }

    return htmlText;
  }

  addEvent()
  {
    let project = this.project;
    let taskView = this;

    let clickDeleteEvent = function(event)
    {
      let Modal = require('../modal/modal.js');

      let iTask = $(event.currentTarget).attr('data-task-index');

      Modal.show('Confirmation needed', `
        <p>Do you really want to delete this tasks?<p>
        <strong>${project.tasks[iTask].name}</strong>
      `, function()
      {
        project.tasks.splice(iTask, 1);
        taskView.display();
      });
    }

    $('.'+this.prefix+'-delete').click(clickDeleteEvent);

    let clickAddEditEvent = function(event)
    {
      let Modal = require('../modal/modal.js');
      let FormTask = require('../form-task/form-task.js');

      let formTask = undefined;
      let isEdit = $(event.currentTarget).hasClass('btn-edit-task');

      if(isEdit)
      {
        formTask = new FormTask(project.tasks[$(event.currentTarget).attr('data-task-index')], project);
      }
      else
      {
        formTask = new FormTask(undefined, project);
      }

      let title = isEdit ? `Edit task : ${formTask.task.name}` : 'Add a task';

      Modal.show(title, formTask.display(), function()
      {
        let task = formTask.task;
        task.name = $('#task-name-input').val();
        task.from = new Date($('#from-input').val());
        task.to = new Date($('#to-input').val());

        task.inCharge = project.team[$('#in-charge-input').val()];

        task.workingOn = [];
        let indexWorkingOn = $('#working-on-input').val();

        for(let i = 0; i < indexWorkingOn.length; i++)
        {
          task.workingOn.push(project.team[indexWorkingOn[i]]);
        }

        if(!isEdit)
        {
          project.tasks.push(task);
        }
        taskView.display();
      });
    }

    $(`#${this.prefix}-add-task, .${this.prefix}-edit`).click(clickAddEditEvent);
  }
}

module.exports = ListTasks;
