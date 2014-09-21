$(document).on('ready', function() {


  var firstNum;

  var recalculateAnswers = function() {
    var numRows = $('tr').length;
    var sum = 0;
    for(var i = 2; i <= numRows; i++) {
      sum = 0;
      $('table tr:nth-child(' + i + ') td.possibilities').each(function() {
        sum += parseInt($(this).text());
      });
      $('table tr:nth-child(' + i + ') td.answers').text(sum);

    }

    for(var j = 1; j < numRows; j++) {
      sum = 0;
      $('table tr td.possibilities:nth-child(' + j + ')').each(function() {
        sum += parseInt($(this).text());
      });
      $('table tr:first-child td.answers:nth-child(' + j + ')').text(sum);
    }

//    var firstColumnElements = $('table tr td.possibilities:nth-child(1)');
//    var firstElement = firstColumnElements.first();
//    var secondElement = firstColumnElements.last();
//    var firstColumnAnswer = parseInt(firstElement.text()) + parseInt(secondElement.text());
//    $('#first-column-answer').text(firstColumnAnswer);
//
//    var secondColumnElements = $('table tr td.possibilities:nth-child(2)');
//    firstElement = secondColumnElements.first();
//    secondElement = secondColumnElements.last();
//    var secondColumnAnswer = parseInt(firstElement.text()) + parseInt(secondElement.text());
//    $('#second-column-answer').text(secondColumnAnswer);
//
//
//    var firstRowElements = $('table tr:nth-child(2) td.possibilities');
//    var firstElement = firstRowElements.first();
//    var secondElement = firstRowElements.last();
//    var firstRowAnswer = parseInt(firstElement.text()) + parseInt(secondElement.text());
//    $('#first-row-answer').text(firstRowAnswer);
//
//    var secondRowElements = $('table tr:nth-child(3) td.possibilities');
//    var firstElement = secondRowElements.first();
//    var secondElement = secondRowElements.last();
//    var firstRowAnswer = parseInt(firstElement.text()) + parseInt(secondElement.text());
//    $('#second-row-answer').text(firstRowAnswer);
  };

  recalculateAnswers();

  $('.possibilities').on('click', function(){
    // Hint to Nathan: there is something called 'addClass'. Google it to figure out how to use it.
    $(this).toggleClass('red-border');
    if(!firstNum) { // This is like saying: if firstNum isn't set (or is null).
      firstNum = $(this);
    } else {
      // First Num is set, so we must be on the second number!!
      var firstNumValue = parseInt(firstNum.text());
      var secondNumValue = parseInt($(this).text());
      // What we want to do is swap the numbers here.
      // Example on how to set values:
      firstNum.text(secondNumValue);
      $(this).text(firstNumValue);
      $('.possibilities').removeClass('red-border');

      firstNum = null;
      recalculateAnswers();
    }

  });
});


