import React,{useState} from 'react'
import { Button } from 'react-bootstrap';


const HoverButton = ({ hoverStyles, defaultStyles, additionalStyles, children, onClick, textHoverStyle, defaulTextStyles }) => {
    const [hovered, setHovered] = useState(false); // Internal hover state for the button
  
    const handleMouseEnter = () => {
      setHovered(true); // Activate hover state
    };
  
    const handleMouseLeave = () => {
      setHovered(false); // Deactivate hover state
    };
    const styles = {
      backgroundColor: hovered ? hoverStyles : defaultStyles,
      color: hovered ? textHoverStyle : defaulTextStyles,
      border: '0px',
      ...additionalStyles
    }
    return (
      <Button
        style={{ ...styles }} // Apply styles dynamically
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children} {/* Button content */}
      </Button>
    );
  };

export default HoverButton