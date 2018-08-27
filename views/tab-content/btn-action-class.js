class ButtonAction
{
  constructor(name, prefix, icon)
  {
    this.name = name;
    this.prefix = prefix
    this.icon = icon;
  }

  getButtonDisplay()
  {
    return `<div id="${this.getIdButton()}" class="btn-content btn-action" data-prefix="${this.prefix}"><p>${this.icon}</p></div>`;
  }

  getIdButton()
  {
    return this.name.toLowerCase() + '-btn';
  }
}

module.exports = ButtonAction;
