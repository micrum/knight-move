var NameInput = React.createClass({
  getInitialState: function () {
    return {name: 'Your Name'};
  },

  componentDidMount: function () {
    var self = this;
    getUserName($.cookie('user_uuid')).done(function (data) {
      self.setState({name: data});
    });
  },

  handleChange: function (event) {
    var new_name = event.target.value;

    setUserName($.cookie('user_uuid'), new_name);
    this.setState({name: new_name});
  },

  render: function () {
    return (
      <div className="name-input-container">
        <input type="text" value={this.state.name} onChange={this.handleChange}/>
      </div>
    )
  }
});