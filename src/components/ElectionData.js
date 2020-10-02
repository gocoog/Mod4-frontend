import React from 'react';
import {
    PieChart, Pie, Sector, Cell, Label
  } from 'recharts';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';

  const renderCustomLabel = function(entry) {
      return `${entry.name}, ${entry.value}`
  }

  const renderCustomLabel2 = function(entry) {
    return `Age: ${entry.name}, ${entry.value}`
}

class ElectionData extends React.Component {
    state = {
        candidate: this.props.location.state.candidate,
        voterData: [],
        myVoters: [],
        genderData: [],
        locationData: [],
        ageData: []
    }

    componentDidMount() {
        fetch('http://localhost:3001/votes')
        .then(res => res.json())
        .then(votes => {
            this.setState({
                voterData: votes
            })
            this.handleData()
        })
    }

    handleData = () => {
        let votes = this.state.voterData
        if (votes.length > 0 ) {
            for (let i of votes) {
                if (i.election_id === this.state.candidate.id) {
                    fetch(`http://localhost:3001/users/${i.user_id}`)
                    .then(res => res.json())
                    .then(user => {
                        this.setState({
                            ...this.state,
                            myVoters: [...this.state.myVoters, user]
                        })
                        this.handleGenderData()
                    })
                }
            }
        }
        
    }

    handleGenderData= () => {
        let femaleSum = 0
        let maleSum = 0
        let locationArray = []
        let ageArray = []
        let a1 = []
        let a2 = []

        for(const i of this.state.myVoters) {
            if(i.gender === 'female') {
                femaleSum += 1
            }
        }
        
        for(const i of this.state.myVoters) {
            if(i.gender === 'male') {
                maleSum += 1
            }
        }

        for( const i of this.state.myVoters) {
            locationArray.push(i.location)
            ageArray.push(i.age)
        }
        let ageCount = ageArray.reduce(function (c, p) {
            c[p] = (c[p] || 0) + 1;
            return c;
        }, Object.create(null));

       let locationCount = locationArray.reduce(function (c, p) {
            c[p] = (c[p] || 0) + 1;
            return c;
        }, Object.create(null));

        for (const location in locationCount){
            a1.push({name: location, value: locationCount[location]})
        }

        
        for (const age in ageCount){
            a2.push({name: age, value: ageCount[age]})
        }

        this.setState({
            ...this.state,
            genderData: [{ name: "male", value: maleSum }, {name: "female", value: femaleSum}],
            locationData: a1,
            ageData: a2
        })
    }



    
    render() {
        return (
            <div >
                <img src={this.state.candidate.img_url} alt="Avatar" class="avatar" ></img>
                <h2>
                    {this.state.candidate.election_name}
                </h2>
            <PieChart className="chart-container" width={1600} height={1100} label>
            <Pie data={this.state.ageData} dataKey="value" innerRadius={275} outerRadius={470} fill="#000c80" label={renderCustomLabel2}/>
            <Pie data={this.state.locationData} dataKey="value" innerRadius={90} outerRadius={265} fill="#800200" label={renderCustomLabel}/>
                <Pie className="font" data={this.state.genderData} dataKey="value" outerRadius={80} fill="#000000" label={renderCustomLabel} />
                
                
            </PieChart>
      </div>
        )
    }
}

export default ElectionData

