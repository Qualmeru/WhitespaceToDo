var React = require('react');
var ReactDOM = require('react-dom');
module.exports = React.createClass({
    getInitialState: function () {
        return {
            text: ''

        }

    },
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.nameInput).focus();

    },
    render: function () {
        return <div className="input-group">
      <input value={this.state.text}
             onChange={this.InputChange}
             onKeyDown={this.AddClick}
             type="text"
             className="form-control" ref="nameInput" />
      <span className="input-group-btn">
        <input onClick={this.AddClick}
                className="btn btn-default"
                type="button" value="Add" />
      </span>
        </div>
    },
    AddClick: function (e) {
        if (e.keyCode == undefined || e.keyCode == 13) {
            this.props.itemsStore.push({
                text: this.state.text,
                done: false
            });

            this.setState({ text: '' });
        }
    },
    InputChange: function (event) {
        this.setState({ text: event.target.value });
    }
});
