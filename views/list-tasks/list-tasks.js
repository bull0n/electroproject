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
    `;

    return htmlText;
  }
}

module.exports = ListTasks;
