import countdown from 'countdown';

var timerId = countdown(
  new Date(2016, 8, 23),
  function(ts) {
    document.getElementById('timer').innerHTML = ts.toHTML("strong");
  },
  countdown.ALL
);
