import React, { useState, useRef, useEffect } from 'react'
import { Col, Button, Overlay } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import HoverButton from './HoverButton'

// redux imports
import { useDispatch } from 'react-redux'
import { clearData } from '../reducer/userReducer'
const Navigation = ({ setUserLogin }) => {
  const [wide, setWide] = useState(false)
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate()
  const [show, setShow] = useState(false);


  const buttonRef = useRef(null);

  //redux logic
  const dispatch = useDispatch()
  function handleLogout() {
    dispatch(clearData())
    setUserLogin(false)
    navigate('/')
  }

  //Viewport logic
  useEffect(() => {
    // Function to check the viewport width
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Adjust breakpoint as needed (e.g., 768px for tablets/phones)
    };

    // Check on component mount
    checkViewport();

    // Add event listener to handle viewport resize
    window.addEventListener('resize', checkViewport);

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <>
      <div className="mt-2">
        <HoverButton
          hoverStyles='#c39edb'
          defaultStyles='transparent'
          textHoverStyle='#151515'
          defaulTextStyles='#c39edb'
          onClick={() => setWide(!wide)}>
          <i className="bi bi-book-half" style={{ fontSize: '20px' }}></i>
        </HoverButton>
        {isMobile && !wide &&
          <>
            <HoverButton
              hoverStyles='#c39edb'
              defaultStyles='#222222'
              textHoverStyle='#222222'
              onClick={handleLogout}
              additionalStyles={{ border: '1px solid #c39edb' }}

            >
              <i className="bi bi-person-x-fill" style={{ fontSize: '20px' }}></i>
            </HoverButton>
            <HoverButton
              hoverStyles='#c39edb'
              defaultStyles='#222222'
              textHoverStyle='#222222'
              additionalStyles={{ border: '1px solid #c39edb', marginRight: '7px' }}>
              <i className="bi bi-plus-circle" style={{ fontSize: '20px' }}></i>
            </HoverButton>
          </>
        }
      </div>

      <div
        style={{
          position: 'absolute',
          display:`${isMobile?'none':'block'}`,
          backgroundColor: '#000000', color: '#e3e3e3',
          zIndex: '10',
          top: '0%',
          x: '-100%',
          height: '100%',
          width: '20%',
          transform: `translateX(${ wide ? '55%' : '-100%'})`,
          transition: 'transform 0.3s ease-in-out',

        }}
      >
        <div className="m-3  d-flex justify-content-between align-items-center">
          <p className='h6 align-center p-0 mb-0' style={{ height: '100%' }}>Exercise</p>
          <div className="">
            <HoverButton
              hoverStyles='#c39edb'
              defaultStyles='#222222'
              textHoverStyle='#222222'
              additionalStyles={{ border: '1px solid #c39edb', marginRight: '7px' }}>
              <i className="bi bi-plus-circle" style={{ fontSize: '20px' }}></i>
            </HoverButton>
            <HoverButton
              hoverStyles='#c39edb'
              defaultStyles='#222222'
              textHoverStyle='#222222'
              onClick={() => setShow(!show)}
              ref={buttonRef}
              additionalStyles={{ border: '1px solid #c39edb' }}
            >
              <i className="bi  bi-three-dots" style={{ fontSize: '20px' }}></i>
            </HoverButton>
            {show && (
              <div
                style={{
                  position: "absolute",
                  top: buttonRef.current?.offsetTop || 0,
                  left: buttonRef.current?.offsetLeft + 4 + buttonRef.current?.offsetWidth || 0,
                  padding: "10px",
                  borderRadius: "5px",
                  zIndex: 1000,
                  boxShadow: "0 4px 6px #252525",
                  backgroundColor: '#252525'
                }}
              >

                <HoverButton
                  hoverStyles='#c39edb'
                  defaultStyles='#222222'
                  textHoverStyle='#222222'
                  onClick={() => setShow(!show)}
                  additionalStyles={{ border: '1px solid #c39edb', marginRight: '4px' }}
                >
                  <i className="bi bi-x-circle" style={{ fontSize: '20px' }}></i>
                </HoverButton>
                <HoverButton
                  hoverStyles='#c39edb'
                  defaultStyles='#222222'
                  textHoverStyle='#222222'
                  onClick={handleLogout}
                  additionalStyles={{ border: '1px solid #c39edb' }}
                >
                  <i className="bi bi-person-x-fill" style={{ fontSize: '20px' }}></i>
                </HoverButton>
              </div>
            )}
          </div>
        </div>
        <div className="">
          today task
        </div>
      </div>

      {/* {wide && !isMobile &&
   
      } */}
    </>
  )
}


export default Navigation