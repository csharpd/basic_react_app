var React = require('react');
var Prompt = require('../components/Prompt');

var PromptContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      username: ''
    }
  },
  handleSubmitUser: function (e) {
    e.preventDefault();
    // cache user name
    var username = this.state.username;
    // reset it in case user hits back button
    this.setState({
      username: ''
    });

    // go to battle if this.props.routeParamas.playerOne - has a route param on it
    // context allows you to pass items to your components
    // we are passing info to our battle route - will be able to query player One from route param and player two from our state.
    if (this.props.routeParams.playerOne) {
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username,
        }
      })
    } else {
      // now route param so we must be on player one
      this.context.router.push('/playerTwo/' + this.state.username)
    }
  },
  handleUpdateUser: function (event) {
    this.setState({
      username: event.target.value
    });
  },
  render: function () {
    return (
      <Prompt
        onSubmitUser={this.handleSubmitUser}
        onUpdateUser={this.handleUpdateUser}
        header={this.props.route.header}
        username={this.state.username} />
    )
  }
});

module.exports = PromptContainer;