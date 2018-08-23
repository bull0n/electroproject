class ButtonAction
{
  constructor(name, icon)
  {
    this.name = name;
    this.icon = icon;
  }

  getButtonDisplay()
  {
    return `<div id="${this.getIdButton()}" class="btn-content btn-action"><p>${this.icon}</p></div>`;
  }

  getIdButton()
  {
    return this.name.toLowerCase() + '-btn';
  }
}
