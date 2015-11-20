var GameOverPopup = React.createClass({
    propTypes: {
        score: React.PropTypes.number,
        total: React.PropTypes.number,
        time: React.PropTypes.number,
        opened: React.PropTypes.bool
    },

    getInitialState: function () {
        return {
            opened: false,
            email: ''
        };
    },

    handleChange: function(event) {
        this.setState({email: event.target.value});
    },

    closePopup: function (e) {
        $('.gameOver').hide();
    },

    isWinner: function () {
        return this.props.score === this.props.total;
    },

    getTwitterOptions: function () {
        var winMsg = 'Hey! I won The Knight Move! You must to try it';
        var defeatMsg = 'Hey! I got ' + this.props.score + ' point at Knight Move. ';
        var text = this.isWinner() ? winMsg : defeatMsg;
        var url = 'http://knightmove.r15.railsrumble.com/';
        var options = {
            text: text,
            url: url,
            hashtags: 'railsrumble'
        };
        var result = Object.keys(options).map(function (item) {
            return item + '=' + encodeURI(options[item]);
        }).join('&');
        return result;
    },

    getFacebookOptions: function(){
        var winMsg = 'Hey! I won The Knight Move! You must try it now';
        var defeatMsg = 'Hey! I got ' + this.props.score + ' points at Knight Move. ';
        var text = this.isWinner() ? winMsg : defeatMsg;
        var url = 'http://knightmove.r15.railsrumble.com/';
        var options = {
            display: 'popup',
            caption: text,
            href: url,
            app_id: facebookID,
            redirect_uri: url
        };
        var result = Object.keys(options).map(function (item) {
            return item + '=' + encodeURI(options[item]);
        }).join('&');
        return result;
    },

    render: function () {
        var visible = this.props.opened ? 'block' : 'none';
        var title = this.props.total === this.props.score ? 'You Win!' : 'Defeat';
        var twitterLink = "https://twitter.com/intent/tweet?" + this.getTwitterOptions();
        var facebookLink = "https://www.facebook.com/dialog/share?" + this.getFacebookOptions();
        var email = this.state.email;
        var renderMailchimpForm = function () {
            return {__html: "<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>"};
        };

        return (
            <div className="gameOver">
                <RenderInBody>
                    <div className="popup" style={{display: visible}}>
                        <h3>{title}</h3>

                        <p>Score: {this.props.score}</p>

                        <p>Time: {this.props.time}</p>

                        <p>Rank: {this.props.currentRank}</p>

                        <div id="mc_embed_signup" style={{marginBottom: '20px'}}>
                            <form action="//micrum.us12.list-manage.com/subscribe/post?u=6266df75bc9f56f1a5fa96f21&amp;id=d9874d18a5" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                                <div id="mc_embed_signup_scroll">
                                    <p>Subscribe to get notified on updates and releases. Be first who get Knight's Move mobile app!</p>
                                    <div className="mc-field-group" style={{display: 'inline-block'}}>
                                        <label htmlFor="mce-EMAIL">Email Address</label>
                                        <input style={{height: '30px', marginRight: '5px', textAlign: 'center'}} type="email" value={email} onChange={this.handleChange}  name="EMAIL" className="required email" placeholder="your email" id="mce-EMAIL"/>
                                    </div>
                                    <div className="clear" style={{display: 'inline-block'}}>
                                        <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button main-button"/>
                                    </div>
                                    <div id="mce-responses" className="clear">
                                        <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                                        <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                                    </div>
                                    <div style={{ position: 'absolute', left: '-5000px'}}><input type="text" name="b_6266df75bc9f56f1a5fa96f21_d9874d18a5" tabIndex="-1" value=""/></div>
                                </div>
                            </form>
                            <div dangerouslySetInnerHTML={renderMailchimpForm()}/>
                        </div>

                        <a className="main-button" onClick={ startNewGame }>Once
                            again!</a>

                        <div className="social-buttons">
                            <a className="twitter-share-button social-button"
                               href={twitterLink}></a>
                            <a className="facebook-share-button social-button"
                               href={facebookLink}></a>
                        </div>
                    </div>
                </RenderInBody>
            </div>
        );
    }
});
