class Modal
{
  static display(elementTarget)
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

  static show(title, content, confirmAction)
  {
    $('#main-modal .modal-title').html(title);
    $('#main-modal .modal-body').html(content);

    $('#confirm-btn').click(function(event)
    {
      confirmAction();
      $('#main-modal').modal('hide');
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
