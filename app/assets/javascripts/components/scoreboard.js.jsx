var PropTypes = React.PropTypes;

var Score = React.createClass({
  render: function () {

    return (
    <div>
        <li key={this.props.key}>
            <span className="truncate-name">{this.props.user_name}&nbsp;</span>
            <span className="text-accent">{this.props.score}&nbsp;</span>
            <span>{this.props.time}s</span>
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

      if (!result || !result['top_games'] || !result['top_games'].length) {
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
      return <Score score={s.score} time={s.time} user_name={s.user_name} key={s.id}/>
    });

    if (!scores.length) {
      scores = <p>Loading scores..</p>;
    }

    return (

      <div>
        <h2>Top scores</h2>

        <div className="scoreboard">
          <ol>
            {scores}
          </ol>
        </div>
      </div>

    );
  }
});
