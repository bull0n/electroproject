let {Project, Task, Member} = require('../../data/project.js');

class ListTasks
{
  constructor(project)
  {
    this.project = project;
    this.listTasks = project.tasks;
  }

  getView()
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
          </tr>
        </thead>
        <tbody>
          ${this.getHTMLLists()}
        </tbody>
      </table>
    `;

    return htmlText;
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
      </tr>`;
    }

    return htmlText;
  }
}

module.exports = ListTasks;
