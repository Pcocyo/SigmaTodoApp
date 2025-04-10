import React, { useState } from 'react'
import { predefinedCalendar } from './calender'
import { BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Navigation from './component/Navigation'
import YearView from './component/YearView'
import WeekView from './component/WeekView'
import LoginPage from './component/LoginPage'
const App = () => {
  const [userLogin, setUserLogin] = useState(false)
  const [user, setUser] = useState({ username: '', password: '', data: '' })

  console.log(userLogin)
  return (
    <BrowserRouter>
      <Container
        fluid
        className="w-100  m-0 p-0"
        style={{ padding: '0', minWidth: '100vw', overflowX: 'hidden', maxHeight: "100vh" }}
      >
        <Row className="w-100" style={{ maxHeight: '100vh' }}>
          <Navigation setUserLogin={setUserLogin}/>
          <Col
            className="m-0 p-0"
            style={{ backgroundColor: '#f9f9f9' }}
          >
            <Routes>
                <>
                  <Route path="/" element={<LoginPage setUser={setUser} setUserLogin={setUserLogin}/>} /> 
                  <Route path="/year" element={ userLogin? <YearView />: <Navigate to='/'/> } />
                  <Route path="/week" element={userLogin? <WeekView />: <Navigate to='/'/>} />
                </>
            </Routes>
          </Col>
        </Row>
      </Container>

    </BrowserRouter>

  )
}
// this is for a test
export default App