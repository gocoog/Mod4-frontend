import React from 'react'
import ElectionData from './ElectionData'
import { withRouter } from 'react-router-dom'
import { Header, Image, List } from 'semantic-ui-react'

class Results extends React.Component {
    state= {
        candidates: []
    }

    componentDidMount() {
        this.getCandidates()
        
    }

    getCandidates = () => {
        fetch('http://localhost:3001/elections')
        .then(res => res.json())
        .then(elections => {
          this.setState({ candidates: elections})
          this.handleCandidates()
        })
      }

      handleCandidates = () => {
          this.setState({
              candidates: this.state.candidates.sort((a,b) => b.number_of_votes - a.number_of_votes)
          })
      }

      handleClick = (candidate) => {
        console.log(candidate.election_name)
        this.props.history.push({
            pathname: '/candidate_data',
            state: {
                candidate: candidate
            }
          });
    }


    render() {
        return (
            <List className="list">
                {this.state.candidates.map((el) => (
                <List.Item key={el.id} className="list" onClick={() => this.handleClick(el)}>
                    <Image avatar src={el.img_url} />
                <List.Content className="list" >
                    <List.Header className="list" >
                    {el.election_name}
                    </List.Header>
                    <List.Description className="list">
                    {el.number_of_votes}
                    </List.Description>
                </List.Content>
                </List.Item>
                ))}
            </List>
        )
    }
    
}

export default withRouter(Results)