import React, { Component } from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

const Form = () => {
  return <form> <input id="ButtonFilterFemale" value={"female"}/></form>
}
}

export default Form