var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://whitespacetodo.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
  },
  render: function() {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          checked={this.state.done}
          onChange={this.DoneChange}
          />
      </span>
      <input type="text"
        disabled={this.state.done}
        className="form-control"
        value={this.state.text}
        onChange={this.TextChange}
        onKeyDown={this.SaveClick}
        />
      <span className="input-group-btn">
        {this.changesButtons()}
        <input type="button"
          className="btn btn-default"
          onClick={this.DeleteClick}
          value= "Delete"/>
      </span>
    </div>
  },
  changesButtons: function() {
    if(!this.state.textChanged) {
      return null
    } else {
      return [
        <input type="button"
          className="btn btn-default"
          onClick={this.SaveClick}
          value="Save"/>,
        <input type="button" 
          onClick={this.UndoClick}
          className="btn btn-default"
            value="Undo"
         />
          
        
      ]
    }
  },
    SaveClick: function (e) {
        if (e.keyCode == undefined || e.keyCode == 13) {
            this.fb.update({ text: this.state.text });
            this.setState({ textChanged: false });
        }
  },
  UndoClick: function() {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  TextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  DoneChange: function(event) {
    var update = {done: event.target.checked}
    this.setState(update);
    this.fb.update(update);
  },
  DeleteClick: function() {
    this.fb.remove();
  }
});
