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
    `;

    $(this.element).html(htmlText);
    this.addEvent();
  }

  addEvent()
  {

  }
}

module.exports = DiagramView;
