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
        knightX = this.props.knightPosition[0],
        knightY = this.props.knightPosition[1], 
        piece = (x === knightX && y === knightY) ? <Knight /> : null;

    return (
      <div key={i} style={{ width: '12.5%', paddingBottom: '12.5%', height: '0',
                            maxWidth: '64px', float: 'left', backgroundColor: '#FFD428',
                            borderRadius: '50%' }}>
          { piece }
      </div>
    );
  },

  render: function() {
    var squares = [];
    for(var i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div style = {{ maxWidth: '512px', margin: '0 auto' }}>
        <Rules></Rules>
        { squares }
      </div>
    );
  }
});
