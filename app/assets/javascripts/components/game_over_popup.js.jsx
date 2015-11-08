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
  
  isWinner: function(){
    return this.props.score === this.props.total;
  },

  getTwitterOptions: function(){
    var winMsg = 'Hey! I won The Knight Move! You must to try it';
    var defeatMsg = 'Hey! I got ' + this.props.score + ' point at Knight Move. ';
    var text = this.isWinner() ? winMsg : defeatMsg;
    var url = 'http://knightmove.r15.railsrumble.com/'
    var options = {
      text: text,
      url: url,
      hashtags: 'railsrumbie'
    };
    var result = Object.keys(options).map(function(item){
      return item + '=' + encodeURI(options[item]);
    }).join('&');
    return result;
  },

  shareFacebook: function(){
    FB.ui({
      method: 'share',
      href: 'http://knightmove.r15.railsrumble.com/',
    }, function(response){});
  },

  render: function() {
    var visible = this.props.opened ? 'block' : 'none';
    var title = this.props.total === this.props.score ? 'You Win!' : 'Defeat';
    var twitterLink = "https://twitter.com/intent/tweet?" + this.getTwitterOptions();
    return (
      <div className="gameOver">
        <RenderInBody>
          <div className="popup" style={{display: visible}}>
              <h3>{title}</h3>
              <p>Score: {this.props.score}</p>
              <p>Time: {this.props.time}</p>
              <a className="main-button" onClick={this.closePopup}>Once again!</a>
              <div className="social-buttons">
                <a className="twitter-share-button social-button"
                  href={twitterLink}>
                  T</a>
                <a className="facebook-share-button social-button"
                  onClick={this.shareFacebook}>
                  F</a>
              </div>
          </div>
        </RenderInBody>
      </div>
    );
  }
});
