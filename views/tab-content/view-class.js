class View
{
  constructor(name, icon)
  {
    this.name = name;
    this.icon = icon;
  }

  getButtonDisplay()
  {
    return `<div id="${this.getIdButton()}" class="btn-content btn-view"><p>${this.icon}</p></div>`;
  }

  getContentDiv()
  {
    return `<div id="${this.getIdContentDiv()}" class="view"></div>`;
  }

  getIdContentDiv()
  {
    return this.name.toLowerCase() + '-view';
  }

  getIdButton()
  {
    return this.name.toLowerCase() + '-btn';
  }
}
