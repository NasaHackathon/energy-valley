//tempoary keyword bank 
const keywords = ['earth', 'sun', 'moon'];



function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var items = document.getElementsByTagName('*');
  for (var i = 0; i < items.length; i++) {
    var item = items[i].toLowerCase();
    if (keywords.indexOf(item) !== -1) {
      $(item.addClass('nasaDefinition'));
    }
  }
  
  //Disregard the bottom
  // var divs = document.querySelectorAll('div');
  // for (var i = 0; i < divs.length; i++) {
  //   divs[i].addEventListener('click', click);
  // }
});

