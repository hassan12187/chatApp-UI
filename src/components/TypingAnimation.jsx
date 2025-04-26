import React from 'react'
import "../assets/AnimationStyles.modules.css";

const TypingAnimation = () => {
  return (
    <div class="box">
        <span class="dot" style={{"--i":1}}></span>
        <span class="dot" style={{"--i":2}}></span>
        <span class="dot" style={{"--i":3}}></span>
    </div>
  )
}

export default TypingAnimation