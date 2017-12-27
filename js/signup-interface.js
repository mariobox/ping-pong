// Let's create a new form to capture and email address, to that we can demonstrate concatenationin gulp
// We will concatenate this file with our main pingpong-interface.js file
$(document).ready(function(){
    $('#signup').submit(function(event){
      event.preventDefault();
      var email = $('#email').val();
      $('#signup').hide();
      $('#solution').prepend('<p>Thank you, ' + email + ' has been added to our list!</p>');
    });
  });