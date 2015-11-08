var ProgressBar = React.createClass({
  propTypes: {
    current: React.PropTypes.node,
    total: React.PropTypes.node
  },

  componentDidMount: function () {
    this.moveProgressBar();
  },

  moveProgressBar: function() {
    var getPercent = this.props.current / this.props.total;
    var getProgressWrapWidth = $('.progress-wrap').width();
    var progressTotal = getPercent * getProgressWrapWidth;
    var animationLength = 400;

    $('.progress-bar').stop().animate({
      left: progressTotal
    }, animationLength);
  },

  render: function() {
    this.moveProgressBar();
    return (
      <div className="progress-bar-container">
        <div className="progress-bar-score">
            <div className="progress-bar-score-item">Score: {this.props.currentScore} </div>
            <div className="progress-bar-score-item">Time: {this.props.currentTime} </div>
            <CurrentPosition></CurrentPosition>
        </div>
        <div className="progress-bar-wrapper">
          <div className="progress-wrap progress">
            <div className="progress-bar progress"></div>
          </div>
        </div>
      </div>
    );
  }
});
