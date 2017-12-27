var Calculator = require('./../js/pingpong.js').calculatorModule;
// we specify which property of exports we are interested in by saying require('./../js/pingpong.js').calculatorModule. 
// Since we stored Calculator in the calculatorModule property, it is pulled out using dot notation and stored in a new 
// variable that we also call Calculator. This line is what allows us to instantiate the new Calculator object below and 
// store it in a variable called simpleCalculator. 

$(document).ready(function() {
    $('#ping-pong-form').submit(function(event) {
      event.preventDefault();
      var goal = $('#goal').val();
      var simpleCalculator = new Calculator('hot pink');
      var output = simpleCalculator.pingPong(goal);
      output.forEach(function(element) {
        $('#solution').append("<li>" + element + "</li>");
      });
    });
  });

