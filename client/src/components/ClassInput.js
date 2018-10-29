import React, { Component } from 'react';
import './ClassInput.css';
import { Alert } from 'reactstrap';

class ClassInput extends Component {

  constructor(props){
    super(props);
    this.state = {
      response: '', //server response
      class: '', //class value from form
      quarter: 1, //0: fall, 1: winter, 2: spring, 3: summer
      year: '',
      classError: '',
      yearError: ''
    };

    this.changeClass = this.changeClass.bind(this);
    this.changeQuarter = this.changeQuarter.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //user enters class value
  changeClass(event){
    this.setState({class: event.target.value.trim()});
  }

  changeQuarter(event){
    this.setState({quarter: parseInt(event.target.value)});
  }

  changeYear(event){
    this.setState({year: parseInt(event.target.value)});
  }

  //form submission->post request to server
  handleSubmit(event){
    const newClass = {class: this.state.class, quarter: this.state.quarter, year: this.state.year};
    if(this.validate(newClass)){
      this.submitClass({class: this.state.class, token: this.props.token,
        quarter: this.state.quarter, year: this.state.year}) //send all form data to server
        .then(res => {
            this.setState({response: res.express, class: '', quarter: 1, year: '', yearError: '', classError:''});
            this.props.onSubmit(newClass.class, res._id, newClass.quarter, newClass.year);
        }).catch(err => console.log(err));
    }
    event.preventDefault(); //prevent default page reload
  }


  validate = (form) => {
    var bool=true;
    if(form.class.length === 0){
      bool = false;
      this.setState({classError: "CourseID can't be empty"});
    }
    if(form.year.length === 0){
      bool = false;
      this.setState({yearError: "Year can't be empty"});
    }
    if(form.class.length !== 0){
      this.setState({classError: ""});
    }
    if(form.year.length !== 0){
      this.setState({yearError: ""});
    }
    return bool;
  }

  //make post call to server
  submitClass = async (data) => {
    const response = await fetch('/api/submitClass', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({class: data.class, token: data.token, quarter: data.quarter,
        year: data.year})
    });

    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="classInput">
        <header className="classInput-header">

          <div className="input">
            <form id="classform" onSubmit = {this.handleSubmit}>
              <div className="classInfo">
                <div className="title">
                  <b>Class</b>
                </div>
                <div  className="class">
                  <input type="text" value={this.state.class} onChange={this.changeClass} placeholder="Course ID"/>
                </div>
                <div className="quarter"> 
                  <select value={this.state.quarter} onChange={this.changeQuarter} className="quarter">
                    <option value="1">Fall</option>
                    <option value="3">Winter</option>
                    <option value="2">Spring</option>
                    <option value="0">Summer</option>
                  </select>
                  <div className="year">
                    <input type="number" value={this.state.year} onChange={this.changeYear} placeholder="Year"/>
                  </div>
                </div>
              </div>
              <div className="submit">
                <input type="submit" className="submit" value="Submit" />
              </div>
            </form>
            <div className="errors">
              {this.state.classError.length!==0 && 
                <Alert color="warning">
                  <b>{this.state.classError} <br/></b>
                </Alert>}
              {this.state.yearError.length!==0 && 
                <Alert color="warning">
                  <b>{this.state.yearError}</b>
                </Alert>}
            </div>
          </div>

        </header>
      </div>
    );
  }
}

export default ClassInput;