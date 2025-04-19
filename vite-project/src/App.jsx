import React, { useState,useEffect} from 'react'
import { predefinedCalendar } from './calender'
import { BrowserRouter, Routes, Route, Navigate,useLocation } from 'react-router-dom'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Navigation from './component/Navigation'
import YearView from './component/YearView'
import WeekView from './component/WeekView'
import LoginPage from './component/LoginPage'

const App = () => {
  const [userLogin, setUserLogin] = useState(false)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(()=>{
    function checkView(){
      setIsMobile(window.innerWidth <= 768)
    }
    checkView();
    window.addEventListener('resize',checkView)
    return ()=> window.removeEventListener('resize',checkView)
  },[])
  return (
    <BrowserRouter>
      <Container
        fluid
        className="w-100"
        style={{ padding: '0', margin:'0', width: '100%', overflowX: 'hidden', maxHeight: "100vh", backgroundColor: '#F9F9F9' }}
      >
        <Row className="w-100 " style={{ height: '100vh', padding:'0', margin:'0' }}>
          <Col
            style={{
              maxWidth: '50px',
              backgroundColor: '#151515',
            }}
            className="min-vh-100 m-0 p-0 d-flex flex-column flex-wrap align-items-center"
            xs={2} md={3} lg={1}> 
              <Navigation setUserLogin={setUserLogin} userLogin={userLogin} />
            </Col>
            <Col
              className="m-0 p-0 border border-warning" style={{padding:'0', margin:'0' }}
              xs={10} md={9} lg={11}
            >
              <Routes>
                <>
                  <Route path="/" element={<LoginPage setUserLogin={setUserLogin} />} />
                  <Route path="/year" element={userLogin ? <YearView /> : <Navigate to='/' />} />
                  <Route path="/week" element={userLogin ? <WeekView isMobile={isMobile}/> : <Navigate to='/' />} />
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