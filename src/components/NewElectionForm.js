import React, { useState } from 'react'
import { withRouter } from "react-router";
import { Form } from 'semantic-ui-react'

class NewElectionForm extends React.Component {
    initialState = {
        election_name: '',
        election_type: 'popular',
        img_url: '',
        election_desc: '',
        election_end_date: '',
        number_of_votes: 0,
        user_id: JSON.parse(localStorage.getItem('user')).id
      }
    
      state = this.initialState

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            election: {
                election_name: this.state.election_name,
                election_type: 'popular',
                img_url: this.state.img_url,
                election_desc: this.state.election_desc,
                election_end_date: this.state.election_end_date,
                number_of_votes: this.state.number_of_votes,
                user_id: this.state.user_id
            }
        }
        fetch('http://localhost:3001/elections', {
            method: 'POST',
            headers: {
                "Content-Type":'application/json'
              },
              body: JSON.stringify(data)
        }).then(res => res.json())
        .then(newElection => {
            console.log(newElection)
            this.props.handleElectionSubmit(newElection)
            this.setState(this.initialState,() => {
            this.props.history.push('/')})
        })
      }

    render() {

        return (
            <Form className="form" style={{ height: '100vh' }} verticalAlign='middle'>
                <Form.Group widths='equal' className="form">
                    <Form.Input fluid label='Election Name' value={this.state.election_name} placeholder='Election Name' onChange={this.handleChange} name='election_name'/>
                    <Form.Input fluid label='Image Url' placeholder='Image Url' value={this.state.img_url} onChange={this.handleChange} name='img_url' />
                </Form.Group >
                    <Form.TextArea label='Description' value={this.state.election_desc}  placeholder='Tell us more about your election' onChange={this.handleChange} name='election_desc' />
                    <input fluid label='Image Url' type="date" onChange={this.handleChange} name='election_end_date' value={this.state.election_end_date}></input>
                <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
            </Form>
        )
    }
}

export default withRouter(NewElectionForm);