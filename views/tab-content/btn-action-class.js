/**
 * @author : Malik Fleury, Bulloni Lucas
 * @description : Class for a button to trigger an action (without view)
 */
class ButtonAction
{
  constructor(name, prefix, icon)
  {
    this.name = name;
    this.prefix = prefix
    this.icon = icon;
  }

  // get the html of the button
  getButtonDisplay()
  {
    return `<div id="${this.getIdButton()}" class="btn-content btn-action" data-prefix="${this.prefix}"><p>${this.icon}</p></div>`;
  }

  // get the id of the button
  getIdButton()
  {
    return this.name.toLowerCase() + '-btn';
  }
}

module.exports = ButtonAction;
