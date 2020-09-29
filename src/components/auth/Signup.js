import React from 'react';
import { Form } from 'semantic-ui-react'
import {
    withRouter
  } from 'react-router';

class Signup extends React.Component {

    state = {
      name: '',
      email_address: '',
      password: '',
      location: '',
      age: '',
      gender: ''
    }
  
    handleInputChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  
    handleSubmit = (e) => {
      e.preventDefault()
      const newUser = {
        user: {
            name: this.state.name,
            email_address: this.state.email_address,
            password: this.state.password,
            location: this.state.location,
            age: this.state.age,
            gender: this.state.gender
        }
      }
      fetch('http://localhost:3001/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      }).then(res => res.json())
      .then(user => 
        {localStorage.setItem('user', JSON.stringify(user))
        this.props.handleLogin()
        this.props.history.push('/')})
    }
  
    render(){
      return (
        <Form style={{ height: '100vh' }} verticalAlign='middle' className="form">
            <Form.Group widths='equal'>
                <Form.Input className="input" fluid label='Name' value={this.state.name} placeholder='Name' onChange={this.handleInputChange} name='name'/>
                <Form.Input fluid label='Email Address' value={this.state.email_address} placeholder='Email Address' onChange={this.handleInputChange} name='email_address'/>
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input type="password" fluid label='Password' placeholder='Password' value={this.state.password} onChange={this.handleInputChange} name='password' />
                <Form.Input fluid label='Location' value={this.state.location} placeholder='Location' onChange={this.handleInputChange} name='location'/>
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input fluid label='Age' value={this.state.age} placeholder='Age' onChange={this.handleInputChange} name='age'/>
                <Form.Input fluid label='Gender' value={this.state.gender} placeholder='Gender' onChange={this.handleInputChange} name='gender'/>
            </Form.Group >
            <Form.Button disabled={!this.state.name || !this.state.email_address || !this.state.password || !this.state.location || !this.state.age || !this.state.gender} class="button" onClick={this.handleSubmit}>Submit</Form.Button>
        </Form>
      )
    }
  }

export default withRouter(Signup)