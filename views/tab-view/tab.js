/**
 * @author : Malik Fleury, Bulloni Lucas
 * @description : Class that represent a tab in the tab-view
 */
const TAB_CLASS = ' tab';
const CONTENT_CLASS = ' tab-content';
const ID_TAB_PREFIX = 'tab-';
const ID_CONTENT_PREFIX = 'content-';

class Tab
{
  constructor(ul, divContainer, project)
  {
    this.ul = ul;
    this.divContainer = divContainer;
    this.project = project;
    this.tag = '';
  }

  display()
  {
    let tag = this.project.name.toLowerCase();
    tag = tag.replace(' ', '-');
    tag += '_' + Date.now();          // Use timestamp for unique node name
    this.tag = tag;

    $(this.ul).append(`<li class="${TAB_CLASS}" id="${this.getIdTab()}">${this.project.name} <i class="fas fa-times"></i></li>`);

    $(this.divContainer).append(`<div class="${CONTENT_CLASS}" id="${this.getIdContent()}"></div>`);

    let TabContent = require('../tab-content/tab-content.js');

    let tabContent = new TabContent($('#'+this.getIdContent()), this.project, this.tag);
    tabContent.display();
  }

  getIdTab()
  {
    return ID_TAB_PREFIX + this.tag;
  }

  getIdContent()
  {
    return ID_CONTENT_PREFIX + this.tag;
  }
}

module.exports = Tab;
