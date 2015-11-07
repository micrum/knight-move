var PropTypes = React.PropTypes;

var Board = React.createClass({

  propTypes: {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  },

  renderSquare: function(i) {
    var x = i % 8,
        y = Math.floor(i / 8),
        black = (x + y) % 2 === 1,
        knightX = this.props.knightPosition[0],
        knightY = this.props.knightPosition[1], 
        piece = (x === knightX && y === knightY) ? <Knight /> : null;

    return (
      <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
        <Square black = { black }>
          { piece }
        </Square>
      </div>
    );
  },

  render: function() {
    var squares = [];
    for(var i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div style = {{
                    width: '700px',
                    height: '700px',
                    display: 'flex',
                    flexWrap: 'wrap'
                   }}>
        <Rules></Rules>
        { squares }
      </div>
    );
  }
});
