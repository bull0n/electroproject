class View
{
  constructor(name, prefix, icon, content)
  {
    this.name = name;
    this.prefix = prefix;
    this.icon = icon;
    this.content = content
  }

  getButtonDisplay()
  {
    return `<div id="${this.getIdButton()}" class="btn-content btn-view" data-prefix="${this.prefix}"><p>${this.icon}</p></div>`;
  }

  getContentDiv()
  {
    return `<div id="${this.getIdContentDiv()}" class="view">${this.content}</div>`;
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

module.exports = View;
