import React from 'react';
import bgImage from './assets/blackhole.png'; // Imports your image

export default function Background() {
  // All the CSS styles are kept right here in one place
  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1, // Pushes the image behind your app content
  };

  return <div style={containerStyle} />;
}
