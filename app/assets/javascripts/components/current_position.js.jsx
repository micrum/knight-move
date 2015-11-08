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
    var url = '/position?game_uuid=' + 'e1705d66-49f8-432f-a14b-4aaa8f9594af';

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

      <div class="progress-bar-score">
        <div className="text-center text-brand"> Your position: </div>
        <div className="text-center text-brand"> {this.state.position} </div>
      </div>

    );
  }
});
