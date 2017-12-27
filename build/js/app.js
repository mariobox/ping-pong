(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Calculator {
    constructor(skinName) {
        this.skin = skinName;
    }

    pingPong(goal) {
        var output = [];
        for (var i = 1; i <= goal; i++) {
            if (i % 15 === 0) {
                output.push("ping-pong");
            } else if (i % 3 === 0) {
                output.push("ping");
            } else if (i % 5 === 0) {
                output.push("pong");
            } else {
                output.push(i);
            }
        }
        return output;
    }
}

exports.calculatorModule = Calculator;
// we attach the whole Calculator declaration to a property on the exports global object called calculatorModule.
},{}],2:[function(require,module,exports){
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
},{"./../js/pingpong.js":1}]},{},[2]);
