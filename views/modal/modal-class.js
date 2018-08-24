
class Modal
{
    static load(modalIdTag, title, contentFilename)
    {
      $.get('./views/modal/modal.html', function(data){
        $('body').append(data);
        $('#centered-modal').attr("id", modalIdTag);
        $('.modal-title').text(title);
        $('.modal-body').load(contentFilename);

        $('#' + modalIdTag).modal('show');
      });

      //$(divTag).load('./views/modal/modal.html');
      //$('.modal-title').text(title);
      //$('.modal-body').load(contentFilename);
    }
}

module.exports = Modal;
