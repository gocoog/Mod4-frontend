import React, { Component } from 'react';
import ElectionCard from './ElectionCard';
import Search from '../components/Search'
export default class ProfileContainer extends Component {
    state = {
        elections: [],
        allElections: []
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/elections')
        .then(res => res.json())
        .then(elections => {
          this.setState({ elections: elections, allElections: elections })
        })
      }

      handleChange = (e) => {
        this.setState({
            elections: this.state.allElections.filter(p => p.election_name.toLowerCase().includes(e.target.value.toLowerCase()) )
          })
      }
      handleClick = (electionId) => {
        this.state.elections.map(e => {
            let moreVotes = e.number_of_votes + 1
            let patchData = {
                "number_of_votes": moreVotes
            }
            if (electionId === e.id) {
                fetch(`http://localhost:3001/elections/${electionId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(patchData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                      }
                }).then(res => res.json())
                .then(json => console.log(json))

                let voteData = {
                    "user_id": JSON.parse(localStorage.getItem('user')).id,
                    "election_id": e.id
                }

                fetch('http://localhost:3001/votes', {
                    method: 'POST',
                    body: JSON.stringify(voteData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                      }
                }).then(res => res.json())
            }
            
        })
      }
    render() {
        return (
            <>
            <Search election={this.state.elections} handleChange={this.handleChange} />
            <div className='ui centered cards'>
            {this.state.elections.map(election => 
                <ElectionCard className='ui card' key={election.id} election={election} handleClick={this.handleClick} />
                )
                }
            </div>
            </>

        )
    }
}
