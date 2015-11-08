$(document).ready(function() {
  var knightPosition = [0, 0];
  var rootEl = document.getElementById('root');

  observe(function (knightPosition) {
    ReactDOM.render(
      <Board knightPosition={knightPosition} />,
      rootEl
    );
  });
});
