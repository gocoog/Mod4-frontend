import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import {
    withRouter
  } from 'react-router';

class Login extends Component {
    state = {
        email_address: '',
        password: ''
      }
    
      handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            login: {
                email_address: this.state.email_address,
                password: this.state.password
            }
        }
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(user => {
                if (user.error === "User not found") {
                    this.setState({
                        email_address: '',
                        password: ''
                    })
                } else {
                    localStorage.setItem('user', JSON.stringify(user))
                    this.props.handleLogin()
                    this.props.history.push('/')
                }
            })
        }

        
      render() {
        return (
            <Form style={{ height: '100vh' }} verticalAlign='middle'>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Email Address' value={this.state.email_address} placeholder='Email Address' onChange={this.handleInputChange} name='email_address'/>
                    <Form.Input type="password" fluid label='Password' placeholder='Password' value={this.state.password} onChange={this.handleInputChange} name='password' />
                </Form.Group >
                <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
            </Form>
        )}
}

export default withRouter(Login);