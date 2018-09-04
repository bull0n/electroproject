class DragNDropManager
{
  constructor(prefix, viewname, project, widthDay)
  {
    this.elementPushed = undefined;
    this.prefix = prefix;
    this.viewname = viewname;
    this.project = project;
    this.widthDay = widthDay;
    this.xCoordinates = 0;
    this.originalWidth = 0;
    this.originalMargin = 0;
  }

  display()
  {
    $(`.${this.prefix}-task .period`).append(`
      <div class="left-handle ${this.prefix}-left-handle"></div>
      <div class="right-handle ${this.prefix}-left-handle"></div>
    `);

    this.addEvent();
  }

  addEvent()
  {

    $(`#${this.prefix}-${this.viewname}-view`).mouseup(() => this.mouseUp(event));
    $(`.${this.prefix}-left-handle, .${this.prefix}-right-handle`).mousedown(() => this.mouseDown(event));
    $(`#${this.prefix}-${this.viewname}-view`).mousemove(() => this.mouseMove(event));
  }

  mouseDown(event)
  {
    this.elementPushed = event.currentTarget;
    this.xCoordinates = event.pageX;
    this.originalWidth = $(this.elementPushed).parent().width();
    this.originalMargin = parseInt($(this.elementPushed).parent().css('marginLeft'));

  }

  mouseUp(event)
  {
    if(this.elementPushed !== undefined)
    {
      let mouseMovedPixels = event.pageX - this.xCoordinates;
      let daysMovement = Math.floor(mouseMovedPixels / this.widthDay);

      let keyTask = $(this.elementPushed).parent().parent().parent().attr('data-key-task');
      let task = this.project.findTask(keyTask);

      if($(this.elementPushed).hasClass('left-handle'))
      {
        let newDate = new Date(task.from.getTime());
        newDate.setDate(task.from.getDate() + daysMovement);

        if(newDate <= task.to)
        {
          task.from = newDate;
        }
        else
        {
          task.from = new Date(task.to.getTime());
        }
      }
      else if($(this.elementPushed).hasClass('right-handle'))
      {
        let newDate = new Date(task.to.getTime());
        newDate.setDate(task.to.getDate() + daysMovement);

        if(newDate >= task.from)
        {
          task.to = newDate;
        }
        else
        {
          task.to = new Date(task.from.getTime());
        }
      }

      refreshTabContent(this.prefix);
    }

    this.elementPushed = undefined;
    this.originalWidth = 0;
    this.originalMargin = 0;
    $('.tooltip').tooltip('dispose');
  }

  mouseMove(event)
  {
    if(this.elementPushed !== undefined)
    {
      let periodDiv = $(this.elementPushed).parent();
      let growth = this.xCoordinates - event.pageX;

      if($(this.elementPushed).hasClass('right-handle'))
      {
        growth *= -1;
      }

      if(this.widthDay < this.originalWidth + growth)
      {
        $(periodDiv).width(this.originalWidth + growth);

        if($(this.elementPushed).hasClass('left-handle'))
        {
          $(periodDiv).css('marginLeft', (this.originalMargin - growth).toString() + 'px');
        }
      }
    }
  }
}

module.exports = DragNDropManager;
