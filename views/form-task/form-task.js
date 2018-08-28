let AbstractView = require('../../abstract-view-class.js');
let Task = require('../../data/project.js').Task;

class FormTask extends AbstractView
{
  constructor(task, project)
  {
    super(undefined);

    this.project = project;

    if(task === undefined)
    {
      this.task = new Task();
    }
    else
    {
      this.task = task;
    }
  }

  display()
  {
    let htmlWorkingOn = '';

    for(let i = 0; i < this.project.team.length; i++)
    {
      htmlWorkingOn += `<option value="${i}" ${this.task.isWorkingOn(this.project.team[i]) ? 'selected' : ''}>${this.project.team[i].name}</option>`;
    }

    let htmlInCharge = '';
    for(let i = 0; i < this.project.team.length; i++)
    {
      htmlInCharge += `<option value="${i}" ${this.task.inCharge !== undefined && this.task.inCharge.equals(this.project.team[i]) ? 'selected' : ''}>${this.project.team[i].name}</option>`;
    }

    let htmlText = `
      <form action="javascript:0" id="form-add-task">
        <div class="form-group">
          <label for="task-name-input">Task name : </label>
          <input type="text" class="form-control" id="task-name-input" name="task-name-input" placeholder="Enter the task's name" value="${this.task.name}" required>
        </div>

        <div class="form-group">
          <label for="in-charge-input">Person in charge : </label>
          <select class="form-control" id="in-charge-input" name="in-charge-input">
            <option value="-1">Select someone</option>
            ${htmlInCharge}
          </select>
        </div>

        <div class="form-group">
          <label for="working-on-input">Person working on the project : </label>
          <select class="form-control" name="working-on-input" id="working-on-input" multiple>
            ${htmlWorkingOn}
          </select>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="from-input">From : </label>
            <input type="date" class="form-control" id="from-input" name="from-input" value="${this.task.from.toISOString().substr(0, 10)}" required>
          </div>
          <div class="form-group col-md-6">
            <label for="to-input">To : </label>
            <input type="date" class="form-control" id="to-input" name="to-input" value="${this.task.to.toISOString().substr(0, 10)}" required>
          </div>
        </div>
      </form>
    `;

    return htmlText;
  }
}

module.exports = FormTask;
