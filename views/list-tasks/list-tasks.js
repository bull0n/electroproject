let AbstractView = require('../../abstract-view-class.js');
let {Project, Task, Member} = require('../../data/project.js');

class ListTasks extends AbstractView
{
  constructor(element, project)
  {
    super(element);
    this.project = project
    this.listTasks = this.project.tasks;
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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          ${this.getHTMLLists()}
        </tbody>
      </table>

      <div class="action-btn-list-tasks">
        <button type="button" id="${this.project.name.toLowerCase()}-add-task" class="btn btn-primary">
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
          <button class="btn btn-link btn-delete-task" data-task-id=""><i class="fas fa-trash" data-task=""></i></button>
        </td>
      </tr>`;
    }

    return htmlText;
  }

  addEvent()
  {
    $('.btn-delete-task').click(function(event)
    {
      console.log('test');
    });

    $(`#${this.project.name.toLowerCase()}-add-task`).click(function(event)
    {
      console.log('test2');
    });
  }
}

module.exports = ListTasks;
