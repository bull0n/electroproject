let AbstractView = require('./abstract-view-class.js');

class AbstractTabContentView extends AbstractView
{
  constructor(element, project, prefix, icon)
  {
    super(element)
    this.project = project;
    this.prefix = prefix;
    this.icon = icon;
  }

  getButtonDisplay()
  {
    return `<div id="${this.getIdButton()}" class="btn-content btn-view" data-prefix="${this.prefix}"><p>${this.icon}</p></div>`;
  }

  getContentDiv()
  {
    return `<div id="${this.getIdContentDiv()}" class="view"></div>`;
  }

  getIdContentDiv()
  {
    return this.prefix + '-' + this.constructor.name.toLowerCase() + '-view';
  }

  getIdButton()
  {
    return this.prefix + '-' + this.constructor.name.toLowerCase() + '-btn';
  }
}

module.exports = AbstractTabContentView;
