class TabDiv
{
  constructor(name, prefix, icon)
  {
    this.name = name;
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
    return this.name.toLowerCase() + '-view';
  }

  getIdButton()
  {
    return this.name.toLowerCase() + '-btn';
  }
}

module.exports = TabDiv;
