import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar';
import Home from './Home';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import GiveAnswer from './GiveAnswer';
import Poll from './Poll';
import Login from './Login';
import ErrorPage from './ErrorPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { handleInitialData } from '../Actions/shared';
import { LoadingBar } from 'react-redux-loading-bar'

const  mapDispatchToProps = dispatch => ({
  LoadData: () => dispatch(handleInitialData())
});

class App extends Component {

  componentDidMount() {
    this.props.LoadData();
  }
  
  render(){
 
    return (
      <BrowserRouter>
        <LoadingBar />
          <div className="App">
           
              <NavBar />
  
              {this.props.authedUser === null
              ? <Login />
              : <div>
                <Routes>
                  <Route exact path='/' render={()=>( //This uses react router dom element to navigate our page with url instead of state variable. it also ensures each selected page is displayed
                    <Home/>
                  )}/>
                  <Route path='/view-pool/:id' render={() => (
                    <Poll/>
                  )}/>
                  <Route path='/give-answer/:id' render={() => (
                    <GiveAnswer/>
                  )}/>
                  <Route path='/add' render={() => (
                    <NewQuestion/>
                  )}/>
                  <Route path='/leaderboard' render={() => (
                    <LeaderBoard/>
                  )}/>
                  <Route path='/login' render={() => (
                    <Login/>
                  )}/>
                  <Route path='/not-found' render={() => (
                    <ErrorPage/>
                  )}/>
                </Routes>
                {/* <Switch>  
                   <Route exact path='/view-pool/:id'  component={Poll} />           
                   <Route exact path='/give-answer/:id' component={GiveAnswer} />
                   <Route exact path='/add' component={NewQuestion} />
                   <Route exact path='/leaderboard' component={LeaderBoard} />           
                   <Route exact path='/login' component={Login} />  
                   <Route exact path='/notfound' component={ErrorPage} />  
                   <Route  path='/'  component={Home} />  
                 </Switch> */}
                </div>}
                   
  
          </div>
      </BrowserRouter>
    )

  }
  
}


  const mapStateToProps = state => {
    const question_id = Object.keys(state.questions).sort((a, b) => state.questions[b].timestamp - state.questions[a].timestamp)
    const user = state.authedUser ? state.users[state.authedUser] : null
    const answerq = user ? user.answers : null
    let answered_quesion_id = answerq ? Object.keys(answerq) : []
    answered_quesion_id = question_id.filter((qid) => answered_quesion_id.includes(qid))
       
    return {
      authedUser: state.authedUser,
      users: state.users,
      questions: state.questions,
      answered_questions:answered_quesion_id
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)