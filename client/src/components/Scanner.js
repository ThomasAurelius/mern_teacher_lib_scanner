import './App.css';

import React from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import Lookup from './components/Lookup'


export default function App(props) {
 

  const [decodedResults, setDecodedResults] = React.useState(9781408810552)
   
    return (
      <div className="App">
        <section className="App-section">
          <div className="App-section-title"> Teacher Library Scanner 1.1</div>
          <br />
          <br />
          <br />
          <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}/>          
          
          <Lookup results={decodedResults} />
          
        </section>
       
      </div>
    );

  function onNewScanResult(decodedText, decodedResult)  {
    console.log(
      "App [result]", decodedResult);


    setDecodedResults(decodedText)     
  }
  
}
