let AbstractView = require('../../abstract-view-class.js');

var listTab = [];

const ACTIVE_TAB_CLASS = ' active-tab';
const ACTIVE_CONTENT_CLASS = ' active-content';
const TAB_CLASS = ' tab';
const CONTENT_CLASS = ' tab-content';
const ID_TAB_PREFIX = 'tab-';
const ID_CONTENT_PREFIX = 'content-';

class TabView extends AbstractView
{
  constructor(element)
  {
    super(element);
    this.ulTabs = undefined;
    this.divsContent = undefined;
  }

  /*
  addFile(fileName)
  {
    this.createTab(fileName);
  }
  */

  createTab(project)
  {
    let tag = project.name.toLowerCase();
    tag = tag.replace(' ', '-');
    tag += '_' + Date.now();          // Use timestamp for unique node name

    let li = document.createElement('li');
    let textNode = document.createTextNode(project.name);
    li.appendChild(textNode);

    let iconNode = document.createElement('i');
    iconNode.className = 'fas fa-times';
    li.appendChild(iconNode);

    li.className = 'tab';
    li.id = 'tab-' + tag;

    li.addEventListener('click', function(e) {
      makeActive(e.target.id);
    }, true);

    this.ulTabs.appendChild(li);

    let divContent = document.createElement('div');
    divContent.className = 'tab-content';
    divContent.id = 'content-' + tag;
    this.divsContent.appendChild(divContent);

    let TabContent = require('../tab-content/tab-content.js');

    let tabContent = new TabContent($(divContent), project, tag);
    tabContent.display();

    listTab.push(tag);

    makeActive(li.id);
  }

  // add the html to the dom
  display()
  {
    $(this.element).html(`
      <link rel="stylesheet" href="views/tab-view/tab-view.css">
      <link rel="stylesheet" href="views/tab-content/tab-content.css">
      <link rel="stylesheet" href="views/list-tasks/list-tasks.css">
      <link rel="stylesheet" href="views/diagram-view/diagram-view.css">

      <ul id="tabs">
      </ul>
      <div id="tab-content"></div>
    `);

    this.ulTabs = document.getElementById('tabs');
    this.divsContent = document.getElementById('tab-content');

    // tabView.addFile('Bonjour');

    //adapt the height of the div to the full width
    $(window).resize(function()
    {
      $('#tab-content').height($('#tab-content').parent().height() - $('#tabs').height());
    });

    $(document).ready(function()
    {
      $(window).trigger('resize');
    });
  }
}

//make the active tab
function makeActive(idTab)
{
  for (i = 0; i < listTab.length; i++)
  {
    let tab = document.getElementById((ID_TAB_PREFIX + listTab[i]).toLowerCase());
    tab.className = tab.className.replace(ACTIVE_TAB_CLASS, '');

    let content = document.getElementById((ID_CONTENT_PREFIX + listTab[i]).toLowerCase());
    content.className = content.className.replace(ACTIVE_CONTENT_CLASS, '');
  }

  document.getElementById(idTab).className += ACTIVE_TAB_CLASS;
  let idContent = idTab.replace(ID_TAB_PREFIX, ID_CONTENT_PREFIX);
  document.getElementById(idContent).className += ACTIVE_CONTENT_CLASS;
}

module.exports = TabView;
