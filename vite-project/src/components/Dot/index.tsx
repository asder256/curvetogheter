import React from 'react';
import './Dot.css'; // Importing styles for the dot

interface DotProps {
    style: React.CSSProperties;
  }

const Dot: React.FC<DotProps> = ({ style }) => {
    return <div className="dot" style={style}></div>;
};

export default Dot;