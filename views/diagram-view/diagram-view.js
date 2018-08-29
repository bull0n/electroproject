let AbstractView = require('../../abstract-view-class.js');

class DiagramView extends AbstractView
{
  constructor(element, project, prefix)
  {
    super(element);
    this.project = project;
    this.prefix = prefix;
  }

  display()
  {
    let htmlText = `
      <h3>Gantt Diagram</h3>

      <div class="diagram-container clearfix">
        <div class="separator-container">
          ${ this.buildSeparator() }
        </div>
        <div class="row-container">
          <div class="row-planning title-planning" id="${this.prefix}-taskname">
            <div class="task-name planning-label">
              Task name
            </div>
            <div class="working-on planning-label">
              People working on it
            </div>
          </div>
          <div class="row-planning" id="${this.prefix}-taskname">
            <div class="task-name planning-label">
              Tâche 1
            </div>
            <div class="working-on planning-label">
              lucas, malik
            </div>
            <div class="period-container"><div class="period"></div></div>
          </div>

          <div class="row-planning">
            <button class="btn btn-primary btn-action-diagram" id="${this.prefix}-add-task-diagram"><i class="fas fa-plus"></i> Add a task</button>
          </div>
          <div class="row-planning">
            <button class="btn btn-primary btn-action-diagram" id="${this.prefix}-no-sort">Original order</button>
          </div>
          <div class="row-planning">
            <button class="btn btn-primary btn-action-diagram" id="${this.prefix}-member-sort">Sort by member</button>
          </div>
          <div class="row-planning">
            <div class="btn-group">
              <button type="button" class="btn btn-primary dropdown-toggle btn-action-diagram" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Member to show
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    $(this.element).html(htmlText);
    this.buildTasks();
  }

  buildTasks(order)
  {
    for(let i = 0; i < this.project.tasks.length; i++)
    {
      let task = this.project.tasks[i];

      $(`${this.prefix}-list-tasks`).append(`<li class="list-group-item">Cras justo odio</li>`)
    }
  }

  buildSeparator()
  {
    let nDays = Math.floor((this.project.to() - this.project.from())/86400000); // transform into days

    let html = '';

    for(let i = 0; i < nDays; i++)
    {
      html += '<div class="separator-planning"></div>';
    }

    return html;
  }

  addEvent()
  {

  }
}

module.exports = DiagramView;
