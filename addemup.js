$(document).on('ready', function() {

  var $selected;

  var answersCellTmpl = Handlebars.compile($('#tmpl-answers-cell').html());
  var possibilitiesCellTmpl = Handlebars.compile($('#tmpl-possibilities-cell').html());

  var MAX_NUMBER = 10;

  var generateGame = function(num) {
    num = num || 3;
    var $table = $('#main-table');

    var possibilities = [];
    _.times(num, function() {
      var row = [];
      _.times(num, function() {
        row.push(_.random(1, MAX_NUMBER));
      });
      possibilities.push(row);
    });

    console.log(possibilities);
    var sum = function(arr) {
      return _.reduce(arr, function(memo, num){ return memo + num; }, 0);
    };

    // Calculate the end rows.
    var rowSums = [];
    _.each(possibilities, function(el) {
      rowSums.push(sum(el));
    });

    var colSums = [];
    // Transpose matrix, and then reverse it, because I think you need to.
    _.each(_.zip.apply(_, possibilities), function(el) {
      colSums.push(sum(el));
      colSums.reverse();
    });


    // Generate the header row, with the goals.
    var $headerRow = $('<tr></tr>');
    _.each(colSums, function(el) {
      var generatedTemplate = answersCellTmpl({goal: el});
      $headerRow.append(generatedTemplate);
    });
    $headerRow.append('<td></td>');
    $table.append($headerRow);


    // Generate body.
    var randomizedPossibilities = _.shuffle(_.flatten(possibilities));
    var $el;
    _.each(randomizedPossibilities, function(el, i) {
      if(i % num == 0) {
        if($el) {
          $table.append($el);
        }
        $el = $('<tr></tr>');
      }
      $el.append(possibilitiesCellTmpl({possibility: el}));
    });
    $table.append($el);

    // Now generate the right hand goal.

    _.each(rowSums, function(el, i) {
      $('tr', $table).eq(i + 1).append(answersCellTmpl({goal: el}));
    });




  };
  generateGame(2);


  var recalculateAnswers = function() {
    var numRows = $('tr').length;
    var sum = 0;
    // Sum up rows.
    for(var i = 2; i <= numRows; i++) {
      sum = 0;
      $('table tr:nth-child(' + i + ') td.possibilities').each(function() {
        sum += parseInt($(this).text());
      });
      var $colHeaderCell = $('table tr:nth-child(' + i + ') td.answers-cell');
      $('.current-val', $colHeaderCell).text(sum);
    }
    // Sum up columns.
    for(var j = 1; j < numRows; j++) {
      sum = 0;
      $('table tr td.possibilities:nth-child(' + j + ')').each(function() {
        sum += parseInt($(this).text());
      });
      var $rowEndCell = $('table tr:first-child td.answers-cell:nth-child(' + j + ')');
      $('.current-val', $rowEndCell).text(sum);
    }
  };

  $('.possibilities').on('click', function(){
    $(this).toggleClass('red-border');
    if(!$selected) {
      $selected = $(this);
    } else {
      // Execute the swap.
      var $selectedValue = parseInt($selected.text());
      var secondNumValue = parseInt($(this).text());
      $selected.text(secondNumValue);
      $(this).text($selectedValue);
      $('.possibilities').removeClass('red-border');
      $selected = null;
      recalculateAnswers();
    }

  });

  recalculateAnswers();


});


