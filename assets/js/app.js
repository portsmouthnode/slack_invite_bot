(function($){
  "use strict";

  //create a UI, stupid!
  const errorHandler = (errorText, $node) => $node.text('Error! Something went wrong: '+ errorText).removeClass('bg-success').addClass('bg-danger');
  const successHandler = $node => $node.text('Success! You will be sent an email invite shortly!').removeClass('bg-danger').addClass('bg-success');
  const submitEmail = $form => {
    const $response = $("#response");

    $.post('/api/invitations', $form.serialize())
      .done(data => {
        if (data.ok){
          successHandler($response);
        } else {
          let errorText;
          switch (data.error){
            case 'already_in_team':
              errorText = "You're already in the Slack Team! You can't be in there twice!<br>...unless you're a clone.";
              break;
            case 'already_invited':
              errorText = "You've already been invited! Check your spam. And your attitude.";
              break;
            default:
              errorText = "Um...I don't know what happened, but that totally didn't work. You probably broke the internet.";
              break;
          }
          errorHandler(errorText, $response);
        }
      })
      .fail((jqxhr, text, err) => {
        let errorText = (jqxhr.responseJSON && jqxhr.responseJSON.err) || text || "Error";
        errorHandler(errorText, $response);
      });
  }

  const init = () => {
    const $form = $("#emailForm");
    $form.submit(e => {
      e.preventDefault();
      submitEmail($form);
    });
  }

  init();
})(jQuery);