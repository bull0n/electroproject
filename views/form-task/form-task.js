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
    let htmlTeam = '';

    for(let i = 0; i < this.project.team.length; i++)
    {
      htmlTeam += `<option value="${i}">${this.project.team[i].name}</option>`;
    }

    let htmlText = `
      <form>
        <div class="form-group">
          <label for="task-name-input">Task name : </label>
          <input type="text" class="form-control" id="task-name-input" name="task-name-input" placeholder="Enter the task's name" required>
        </div>

        <div class="form-group">
          <label for="in-charge-input">Person in charge : </label>
          <select class="form-control" id="in-charge-input" name="in-charge-input">
            <option value="-1">Select someone</option>
            ${htmlTeam}
          </select>
        </div>

        <div class="form-group">
          <label for="working-on-input">Person working on the project : </label>
          <select class="form-control" name="working-on-input" id="working-on-input" multiple>
            ${htmlTeam}
          </select>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="from-input">From : </label>
            <input type="date" class="form-control" id="from-input" name="from-input" required>
          </div>
          <div class="form-group col-md-6">
            <label for="to-input">To : </label>
            <input type="date" class="form-control" id="to-input" name="to-input" required>
          </div>
        </div>
      </form>
    `;

    return htmlText;
  }
}

module.exports = FormTask;
