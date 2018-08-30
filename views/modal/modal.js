class Modal
{
  // add the html in elementTarget
  // only one modal can exist
  static display(elementTarget)
  {
    if($('#main-modal') === undefined)
    {
      let htmlContent = `
      <div class="modal fade" tabindex="-1" role="dialog" id="main-modal" aria-labelledby="main-modal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="confirm-btn">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      `;

      $(elementTarget).append(htmlContent);
    }
  }

  // show the moddle with title and content in parameter
  // confirmAction is what will happen when the button validate is pushed
  static show(title, content, confirmAction)
  {
    $('#main-modal .modal-title').html(title);
    $('#main-modal .modal-body').html(content);

    $('#confirm-btn').click(function(event)
    {
      if(confirmAction() !== false)
      {
        $('#main-modal').modal('hide');
      }
    });

    $('#main-modal').on('hidden.bs.modal', function (event) {
      $('#main-modal .modal-title').html('');
      $('#main-modal .modal-body').html('');
      $('#confirm-btn').unbind('click');
    });

    $('#main-modal').modal('show');
  }
}

module.exports = Modal;
