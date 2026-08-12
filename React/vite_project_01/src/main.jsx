import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Removed the accidental trailing space
import News from './News.jsx';


const fisrtElement = (
  <a href="https://google.com" target='_blank'>click to vist google</a>   // custom render
)

const secElement = React.createElement(
  'a',
 { href : 'https://google.com',
   target : '_blank'
 },
 'click me to visit google'
)

createRoot(document.getElementById('root')).render(
  

  <StrictMode>
        <>
          <App />
          <News/>
        </>   
   </StrictMode>
);

createRoot(document.getElementById('root')).render(
   
  fisrtElement 

);
 






// notes :
// must use a closing tag for two or more components  : <> </>
// Call createRoot directly since it was imported explicitly