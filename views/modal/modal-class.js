
class Modal
{
    static load(tagId)
    {
      $.get('./views/modal/modal.html', function(data)
      {
        $('body').append(data);
        $('#centered-modal').attr("id", tagId);
      });
    }

    static prepare(title, contentFilename)
    {
      $('.modal-title').text(title);
      $('.modal-body').load(contentFilename);
    }

    static setValues(elementsMap)
    {
      for(let entry of elementsMap)
      {
        let selector = entry[0]
        let value = entry[1];
        $(selector).val(value);
      }
    }
}

module.exports = Modal;
