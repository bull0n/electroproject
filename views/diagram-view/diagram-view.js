let AbstractView = require('../../abstract-view-class.js');

const MS_IN_DAYS = 86400000;

class DiagramView extends AbstractView
{
  constructor(element, project, prefix)
  {
    super(element);
    this.project = project;
    this.prefix = prefix;
    this.WIDTH_DAY = 30;
  }

  display()
  {
    let htmlText = `
      <h3>Gantt Diagram</h3>

      <div class="diagram-container clearfix">
        <div class="separator-container">
          ${ this.buildSeparator() }
        </div>
        <div class="row-planning title-planning task" id="${this.prefix}-taskname">
          <div class="task-name planning-label planning-title">
            Task name
          </div>
          <div class="in-charge planning-label task-name planning-title">
            Person in charge
          </div>
        </div>

        ${this.buildTasks(undefined)}

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
          <div class="btn-group btn-dropdown-planning">
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
    `;

    $(this.element).html(htmlText);
  }

  buildTasks(order)
  {
    let htmlTasks = '';

    for(let i = 0; i < this.project.tasks.length; i++)
    {
      let task = this.project.tasks[i];
      let daysFromStart = Math.floor((task.from - this.project.from()) / MS_IN_DAYS);

      htmlTasks += `<div class="row-planning task" id="${this.prefix}-${task.name.toLowerCase()}">
        <div class="task-name planning-label">
          ${task.name.toLowerCase()}
        </div>
        <div class="in-charge planning-label">
          ${task.inCharge !== undefined ? task.inCharge.name : ''}
        </div>
        <div class="period-container">
          <div class="period" style="width: ${(task.getLengthInDays()+1) * this.WIDTH_DAY}px; margin-left: ${daysFromStart * this.WIDTH_DAY}px; background-color: ${task.inCharge !== undefined ? task.inCharge.color : 'DeepSkyBlue'}"></div>
        </div>
      </div>`;
    }

    return htmlTasks;
  }

  buildSeparator()
  {
    let nDays = Math.floor((this.project.to() - this.project.from()) / MS_IN_DAYS); // transform into days

    let html = '';

    for(let i = 0; i <= nDays; i++)
    {
      html += '<div class="separator-planning" style="width: '+this.WIDTH_DAY+'px"></div>';
    }

    return html;
  }

  addEvent()
  {

  }
}

module.exports = DiagramView;
