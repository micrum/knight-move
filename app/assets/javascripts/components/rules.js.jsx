var Rules = React.createClass({
    getInitialState: function () {
        return {opened: false};
    },

    openPopup: function (e) {
        this.setState({opened: true});
        return true;
    },

    closePopup: function (e) {
        this.setState({opened: false});
        return true;
    },

    render: function () {
        var visible = this.state.opened ? 'block' : 'none';
        return (
            <div className="rules">
                <div className="rulesLinkBlock">
                    <a className="rulesLink" onClick={this.openPopup}>Rules</a>
                </div>
                <RenderInBody>
                    <div className="popup" style={{display: visible}}>
                        <h3>Rules</h3>

                        <p className="text-brand">To solve the puzzle, the user must go through the
                            horse (the letter L) in all 64 cells are usually
                            chessboard and each cell can visit only once.</p>
                        <a onClick={this.closePopup}>Got it!</a>
                    </div>
                </RenderInBody>
            </div>
        );
    }
});
