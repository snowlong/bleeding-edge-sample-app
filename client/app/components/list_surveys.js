/** @jsx React.DOM */

var React = require("react");
var Promise = require('es6-promise').Promise;
var AsyncState = require('react-router').AsyncState;

var SurveyTable = require('./survey_table');

var SurveyStore = require("../flux/SurveyStore");

var ListSurveys = React.createClass({
  mixins:[AsyncState],

  statics:{
    getInitialAsyncState: function(params, query, setState){
      console.log(arguments);
      return new Promise(function(resolve, reject){
        SurveyStore.listSurveys(function (surveys) {
          setState({surveys: surveys});
          resolve();
        });
      });
    }
  },

  componentDidMount: function () {
    console.log("mount");
    SurveyStore.addChangeListener(this.constructor.getInitialAsyncState);
  },
  componentWillUnmount: function () {
    console.log("unmount");
    SurveyStore.removeChangeListener(this.constructor.getInitialAsyncState);
  },

  render: function(){
    if(!this.state.surveys){
      return <div>Loading ... </div>
    }

    return (
      <div className='list-surveys'>
        <h1>Active Surveys</h1>
        <SurveyTable surveys={this.state.surveys}/>
      </div>
    );
  }
});

module.exports = ListSurveys;
