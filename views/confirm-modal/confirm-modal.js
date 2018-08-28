class ConfirmModal
{
  constructor()
  {
    this.title = title;
    this.text = text;
    this.confirm = confirmAction;
    this.cancel = cancelAction;
  }

  static display(elementTarget)
  {
    let htmlContent = `
      <div class="modal fade" tabindex="-1" role="dialog" id="confirm-modal" aria-labelledby="confirm-modal" aria-hidden="true">
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
              <button type="button" class="btn btn-primary" id="confirm-btn-confirm-modal">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    `;

    $(elementTarget).append(htmlContent);
  }

  static show(title, content, confirmAction)
  {
    $('#confirm-modal .modal-title').html(title);
    $('#confirm-modal .modal-body').html(content);

    $('#confirm-btn-confirm-modal').click(function(event)
    {
      confirmAction();
      $('#confirm-modal').modal('hide');
    });

    $('#confirm-modal').on('hidden.bs.modal', function (event) {
      $('#confirm-modal .modal-title').html('');
      $('#confirm-modal .modal-body').html('');
      $('#confirm-btn-confirm-modal').unbind('click');
    });

    $('#confirm-modal').modal('show');
  }
}

module.exports = ConfirmModal;
