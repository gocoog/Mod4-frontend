import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'

 class ElectionCard extends React.Component {

     state = {
         voted: false,
         number_of_votes: this.props.election.number_of_votes
     }
     componentDidMount() {
             fetch('http://localhost:3001/votes')
             .then(res => res.json())
             .then(votes => this.grayButton(votes))
     }

     grayButton = (votes) => {
        for(const vote of votes) {
            if(vote.user_id === JSON.parse(localStorage.getItem('user')).id && vote.election_id === this.props.election.id) {
                this.setState({
                    voted: true
                })
            } 
        }
     }

     handleButtonClick = () => {
         console.log('clicked')
        this.props.handleClick(this.props.election.id)
        this.setState({
            voted: true,
            number_of_votes: this.props.election.number_of_votes + 1
        })
     }

     render() {
        return(
            <Card>
                <Image src={this.props.election.img_url} wrapped ui={false} />
                <Card.Content>
                    <Card.Header id="header">{this.props.election.election_name}</Card.Header>
                
                    <Card.Meta>
                        <span className='date'>Type of election: {this.props.election.election_type}</span>
                        <br>
                        </br>
                        <span className='date'>End Date: {this.props.election.election_end_date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.election.election_desc}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {this.state.voted ? <Button disabled>Voted!</Button>: <Button onClick={() => this.handleButtonClick()}>Vote ✅</Button> }
                  <span>
                        Number of votes: {this.state.number_of_votes}
                    </span>
                </Card.Content>
            </Card>
        )
     }
}

export default ElectionCard