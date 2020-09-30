import React from 'react'
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


    render() {
        return (
            <List className="list">
                {this.state.candidates.map((el) => (
                <List.Item className="list">
                    <Image avatar src={el.img_url} />
                    {console.log(el.img_url)}
                <List.Content className="list">
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

export default Results