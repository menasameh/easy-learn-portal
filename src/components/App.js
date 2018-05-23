import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageNotFound from './common/PageNotFound'
import Home from './landing'
import Students from './student'
import Courses from './courses'
import manageCourses from './manageCourses'
import searchStudents from './searchStudents'
import Navigation from './nav'

import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/new-age.min.css'
import Doctors from './doctor'

const App = () => {
  return (
    <div className={'backgroundImage'}>
      <Navigation />
      <script src="js/new-age.min.js" />
      <Router>
        <div className={'container'}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/doctors" component={Doctors} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/manageCourses" component={searchStudents} />
            <Route
              path="/manageCourses/:studentId?"
              component={manageCourses}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
      <footer>
        <div className="container">
          <p>&copy; Easy Learn 2018. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
