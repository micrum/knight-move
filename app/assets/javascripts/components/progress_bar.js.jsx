var ProgressBar = React.createClass({
  propTypes: {
    currentScore: React.PropTypes.number.isRequired,
    currentTime: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired
  },

  componentDidMount: function () {
    this.moveProgressBar();
  },

  moveProgressBar: function() {
    var getPercent = this.props.currentScore / this.props.total;
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
            <div className="progress-bar-score-item text-accent">Score: <span className="text-important">{this.props.currentScore}</span></div>
            <div className="progress-bar-score-item text-brand">Time: <span className="text-important">{this.props.currentTime}</span> </div>
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
