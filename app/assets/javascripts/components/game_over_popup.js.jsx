var GameOverPopup = React.createClass({
  propTypes: {
    score: React.PropTypes.number,
    total: React.PropTypes.number,
    time: React.PropTypes.string,
    opened: React.PropTypes.bool
  },

  getInitialState: function(){
    return {opened: false};
  },

  closePopup: function(e){
    $('.gameOver').hide();
  },

  render: function() {
    var visible = this.props.opened ? 'block' : 'none';
    var title = this.props.total === this.props.score ? 'You Win!' : 'Defeat';
    return (
      <div className="gameOver" style={{display: visible}}>
        <div className="popup">
          <h3>{title}</h3>
          <p>Score: {this.props.score}</p>
          <p>Time: {this.props.time}</p>
          <a onClick={this.closePopup}>Once again!</a>
        </div>
      </div>
    );
  }
});
