import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageNotFound from './common/PageNotFound'
import Home from './landing'
import Students from './student'
import Courses from './courses'
import manageCourses from './manageCourses'

import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div>
      <Router>
        <div className={'container'}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/manageCourses" component={manageCourses} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
