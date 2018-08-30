let AbstractTabContentView = require('../../abstract-tab-content-view.js');

const MS_IN_DAYS = 86400000;

class DiagramView extends AbstractTabContentView
{
  constructor(element, project, prefix, icon)
  {
    super(element, project, prefix, icon);
    this.WIDTH_DAY = 30; // in pixels
  }

  display(filter = undefined)
  {
    let htmlText = `
      <h3>Gantt</h3>

      <div class="diagram-container clearfix" id="${this.prefix}-diagram-container">
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

        ${this.buildTasks(filter)}

        <div class="row-planning">
          <button class="btn btn-primary btn-action-diagram" id="${this.prefix}-add-task-diagram"><i class="fas fa-plus"></i> Add a task</button>
        </div>
        <div class="row-planning">
          <button class="btn btn-primary btn-action-diagram" id="${this.prefix}-no-sort">No sort and filter</button>
        </div>
        <div class="row-planning">
          <button class="btn btn-primary btn-action-diagram" id="${this.prefix}-member-sort">Sort by member</button>
        </div>
        <div class="row-planning">
          <div class="btn-group btn-dropdown-planning">
            <button type="button" class="btn btn-primary dropdown-toggle btn-action-diagram" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Member to show
            </button>
            <div class="dropdown-menu dropdown-filter-member">
              ${this.buildTeam()}
            </div>
          </div>
        </div>
      </div>
    `;

    $('#'+this.getIdContentDiv()).html(htmlText);

    this.addEvent();
  }

  buildTasks(filter)
  {
    let htmlTasks = '';

    let tasks = this.getSortedTasks(filter);

    for(let i = 0; i < tasks.length; i++)
    {
      let task = tasks[i];
      let daysFromStart = Math.floor((task.from - this.project.from()) / MS_IN_DAYS);

      htmlTasks += `
      <div class="row-planning task" id="${this.prefix}-${task.name.toLowerCase()}">
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
    let project = this.project;
    let diagramView = this;

    let addEventFunction = function()
    {
      let Modal = require('../modal/modal.js');
      let FormTask = require('../form-task/form-task.js');

      let formTask = undefined;

      formTask = new FormTask(undefined, project);

      let title = 'Add a task';

      Modal.show(title, formTask.display(), function()
      {
        FormTask.save(formTask, false);
        diagramView.display();
      });
    }

    $(`#${this.prefix}-add-task-diagram`).click(addEventFunction);

    $(`#${this.prefix}-member-sort`).click(() =>
    {
      this.display('sort-member');
    });

    $(`#${this.prefix}-no-sort`).click(() =>
    {
      this.display();
    });

    let filterMemberClick = function(event)
    {

      let iMember = parseInt($(event.currentTarget).attr('data-index-member'));
      let member = diagramView.project.team[iMember];

      diagramView.display({member: member});
    };

    filterMemberClick.bind(this);

    $(`.${this.prefix}-filter-member`).click(filterMemberClick);

    $(document).ready(() =>
    {
      this.setSeparatorHeight();
    });

    $(`#${this.prefix}-${this.constructor.name.toLowerCase()}-btn`).click(() =>
    {
      this.setSeparatorHeight();
    });
  }

  buildTeam() {
    let htmlText = '';
    for(let i = 0; i < this.project.team.length; i++)
    {
      htmlText += `<a class="dropdown-item ${this.prefix}-filter-member" style="color: ${this.project.team[i].color};" data-index-member="${i}" href="#">${ this.project.team[i].name }</a>`;
    }

    return htmlText;
  }

  getSortedTasks(filter)
  {
    if(filter === undefined)
    {
      return this.project.tasks;
    }
    else if(filter === 'sort-member')
    {
      return this.project.getTasksSortedByMember();
    }
    else if(filter.hasOwnProperty('member'))
    {
      return this.project.getTasksOfMember(filter.member);
    }
  }

  setSeparatorHeight()
  {
    const BORDER_THICKNESS = 2;
    let height = $(`#${this.prefix}-diagram-container`).height() - $(`#${this.prefix}-diagram-container .row-planning:nth-child(2)`).height() - BORDER_THICKNESS;

    $(`#${this.prefix}-diagram-container .separator-container, #${this.prefix}-diagram.container .separator-planning`).height(height);
  }
}

module.exports = DiagramView;
