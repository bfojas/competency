import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {withRouter} from 'react-router-dom'


class App extends Component {
  constructor(){
    super()
    this.state={
      oneName:'test',
      oneNumber:0,
      twoName:'test',
      twoNumber: 0,
    }

  }

  handleChange=(name, value)=>{
    this.setState({
      [name]: value
    })
  }

  submitOne=(name, number)=>{
    console.log('hit')
    axios.post('/api/postOne', {name, number})
    .then(res=> console.log('back'))
    .catch(err=> console.log('submit error', err))
  }

  submitTwo=(name, number)=>{
    axios.post('/api/postTwo', {name, number})
    .then(res=> console.log('back'))
    .catch(err=> console.log('submit error', err))
  }

  edit=(name, number)=>{
    axios.put('/api/put/?id=1', {name})
    .then(res=> console.log('back'))
    .catch(err=> console.log('edit error', err))
  }

  join=()=>{
    axios.get('/api/join')
    .then(res=> console.log('back'))
    .catch(err=> console.log('edit error', err))
  }

  render() {
    console.log('match', this.props.match)
    return (
      <div className="App">
      <div className="container">
        <div className="submitOne">
          <input value={this.state.oneName} name='oneName' type='text' onChange={e=>this.handleChange(e.target.name, e.target.value)}/>
          <input value={this.state.oneNumber} name='oneNumber' type='text' onChange={e=>this.handleChange(e.target.name, e.target.value)}/>
          <button onClick={()=>this.submitOne(this.state.oneName, this.state.oneNumber)}>Submit One</button>
        </div>
        <div className="submitTwo">
          <input value={this.state.twoName} name='twoName' type='text' onChange={e=>this.handleChange(e.target.name, e.target.value)}/>
          <input value={this.state.twoNumber} name='twoNumber' type='text' onChange={e=>this.handleChange(e.target.name, e.target.value)}/>
          <button onClick={()=>this.submitTwo(this.state.twoName, this.state.twoNumber)}>Submit Two</button>
          <button onClick={()=>this.edit(this.state.twoName, this.state.twoNumber)}>edit</button>
        </div>
        <div className="join">
          <button onClick={()=>this.join()}>Join</button>
        </div>
        <div>
          You are currently on '{this.props.match.path}'
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(App);
