var PropTypes = React.PropTypes;

var Score = React.createClass({
  render: function () {

    return (
      <div>
        <li key={this.props.key}>
          Score: {this.props.score}
          Time: {this.props.time}s
          User: {this.props.user_name}
        </li>
      </div>
    );
  }
});

var Scoreboard = React.createClass({

  getInitialState: function () {
    return {scores: []};
  },

  componentDidMount: function () {
    var self = this;

    var url = '/scoreboard';

    $.getJSON(url, function (result) {

      if (!result || !result['top_games'] || !result['top_games']) {
        return;
      }

      var scores = result['top_games'].map(function (s) {

        return {
          id: s.id,
          score: s.score,
          time: s.time,
          user_name: s.user_name
        };

      });

      self.setState({scores: scores});

    });

  },

  render: function () {
    var scores = this.state.scores.map(function (s) {
      return <Score score={s.score} time={s.time} user_name={s.user_name} ref={s.id}/>
    });

    if (!scores.length) {
      scores = <p>Loading scores..</p>;
    }

    return (

      <div>
        <h1>Top scores</h1>

        <div className="scoreboard">
          <ol>
            {scores}
          </ol>
        </div>
      </div>

    );
  }
});
