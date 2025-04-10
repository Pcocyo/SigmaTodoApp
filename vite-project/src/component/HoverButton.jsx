import React,{useState} from 'react'
import { Button } from 'react-bootstrap';

const HoverButton = ({ hoverStyles, defaultStyles, additionalStyles, children, onClick, textHoverStyle, defaulTextStyles,ref,type}) => {
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
        ref={ref?ref:null}
        type={type?type:'button'}
      >
        {children} {/* Button content */}
      </Button>
    );
  };

export default HoverButton