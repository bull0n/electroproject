const ACTIVE_TAB_CLASS = ' active-tab';
const ACTIVE_CONTENT_CLASS = ' active-content';
const TAB_CLASS = ' tab';
const CONTENT_CLASS = ' tab-content';
const ID_TAB_PREFIX = 'tab-';
const ID_CONTENT_PREFIX = 'content-';

var listTab = [];

class TabView
{
  constructor()
  {
    this.ultTabs = document.getElementById('tabs');
    this.divsContent = document.getElementById('tab-content');
  }

  addFile(fileName)
  {
    this.createTab(fileName);
  }

  createTab(fileName)
  {
    let li = document.createElement('li');
    let textNode = document.createTextNode(fileName);
    li.appendChild(textNode);
    li.className = 'tab';
    li.id = 'tab-' + fileName;

    li.addEventListener('click', function(e) {
      makeActive(e.target.id);
    }, true);

    this.ultTabs.appendChild(li);

    let divContent = document.createElement('div');
    divContent.className = 'tab-content';
    divContent.id = 'content-' + fileName;
    divContent.appendChild(document.createTextNode(fileName));

    this.divsContent.appendChild(divContent);

    listTab.push(fileName);

    makeActive(li.id);
  }

}

function makeActive(idTab)
{
  for (i = 0; i < listTab.length; i++)
  {
    let tab = document.getElementById(ID_TAB_PREFIX + listTab[i]);
    tab.className = tab.className.replace(ACTIVE_TAB_CLASS, '');

    let content = document.getElementById(ID_CONTENT_PREFIX + listTab[i]);
    content.className = content.className.replace(ACTIVE_CONTENT_CLASS, '');
  }

  document.getElementById(idTab).className += ACTIVE_TAB_CLASS;
  let idContent = idTab.replace(ID_TAB_PREFIX, ID_CONTENT_PREFIX);
  document.getElementById(idContent).className += ACTIVE_CONTENT_CLASS;
}
