var PropTypes = React.PropTypes;

var CurrentPosition = React.createClass({

  getInitialState: function () {
    return {position: '> 9999'};
  },

  componentDidMount: function () {
    var self = this;

    this.getPosition().done(function (position) {
      self.setState({position: position});
    });

  },

  getPosition: function () {
    var deferred = $.Deferred();
    // TODO Use uuid of current game
    var url = '/position?game_uuid=' + 'd52822fa-f012-4d95-af91-4a27ccded167';

    $.getJSON(url, function (result) {

      if (!result || !result['position']) {
        return;
      }

      deferred.resolve(result['position']);
    });

    return deferred.promise();
  },

  render: function () {

    return (
        <div className="progress-bar-score-item"> Your rank: {this.state.position}</div>
    );
  }
});
