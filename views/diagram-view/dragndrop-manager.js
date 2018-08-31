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
  }

  mouseDown(event)
  {
    this.elementPushed = event.currentTarget;
    this.xCoordinates = event.pageX;
  }

  mouseUp(event)
  {
    if(this.elementPushed !== undefined)
    {
      let mouseMovedPixels = event.pageX - this.xCoordinates;
      let daysMovement = mouseMovedPixels / this.widthDay;
    }

    this.elementPushed = undefined;
  }
}

module.exports = DragNDropManager;
