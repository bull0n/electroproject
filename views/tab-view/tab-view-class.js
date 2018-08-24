var listTab = [];



class TabView
{
  constructor()
  {
    this.ulTabs = document.getElementById('tabs');
    this.divsContent = document.getElementById('tab-content');
  }

  addFile(fileName)
  {
    this.createTab(fileName);
  }

  createTab(fileName)
  {
    let fileNameLower = fileName.toLowerCase();

    let li = document.createElement('li');
    let textNode = document.createTextNode(fileName);
    li.appendChild(textNode);
    li.className = 'tab';
    li.id = 'tab-' + fileNameLower;

    li.addEventListener('click', function(e) {
      makeActive(e.target.id);
    }, true);

    this.ulTabs.appendChild(li);

    let divContent = document.createElement('div');
    divContent.className = 'tab-content';
    divContent.id = 'content-' + fileNameLower;
    this.divsContent.appendChild(divContent);

    let createTabContent = require('./views/tab-view/tab-content/tab-content.js');
    createTabContent(fileNameLower, divContent.id);

    listTab.push(fileName);

    makeActive(li.id);
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
