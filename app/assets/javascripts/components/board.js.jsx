var PropTypes = React.PropTypes;
var CELL_COUNT = 100;

var Board = React.createClass({
  getInitialState: function() {
    return {currentScore: 0, currentTime: 0};
  },

  propTypes: {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  },

  scoreUp: function(e){
    this.setState({currentScore: this.state.currentScore + 1});
    return true;
  },

  startTime: function() {
    var self = this;

    setInterval(function() {
      self.setState({currentTime: self.state.currentTime + 1});
    }, 1000);

    return true;
  },

  renderSquare: function(i) {
    var x = i % 10,
        y = Math.floor(i / 10),
        knightX = this.props.knightPosition[0],
        knightY = this.props.knightPosition[1],
        piece = (x === knightX && y === knightY) ? <Knight /> : null;

    return (
      <div key={i} onClick={ this.handleSquareClick.bind(this, x, y) }
           style={{ width: '10%', paddingBottom: '10%', height: '0',
                            maxWidth: '64px', float: 'left', backgroundColor: '#FFD428',
                            borderRadius: '50%' }}>
          { piece }
      </div>
    );
  },

  render: function() {
    var squares = [];

    for(var i = 0; i < CELL_COUNT; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
        <div>
            <ProgressBar total={ CELL_COUNT }
                         currentScore={ this.state.currentScore }
                         currentTime={ this.state.currentTime }>
            </ProgressBar>
            <div style = {{ maxWidth: '640px', margin: '30px auto', padding: '15px' }}>
                { squares }
            </div>
        </div>
    );
  },

  handleSquareClick: function(x, y) {
    if (canMoveKnight(x, y)) {
      this.scoreUp();
      moveKnight(x, y);
    }
  }
});
