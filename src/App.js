import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './pages/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import NewsItem from './components/NewsItem';

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEW_API;
  const [progress, setProgress] = useState(0)
  const [country, setCountry] = useState('in')

  //For Dark and Light Mode in Navbar.js File
  const [mode, setMode] = useState("light");

  // For Dark and Light Mode in Navbar.js File
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      // showAlert("Dark Mode has been Enabled", 'success');
      // document.title = 'NewsMonkey - Dark Mode';

    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      // showAlert("Light Mode has been Enabled", 'success')
      // document.title = 'NewsMonkey - Light Mode';

    }
  };


  const selectCountry = (country) => {
    setCountry(country)
  }

  return (
    <div>
      <Router>
        <Navbar title="NewsMonkey" mode={mode} toggleStyle={toggleMode} selectCountry={selectCountry} />
        <LoadingBar
          color='#f11946'
          progress={progress}

        />
        <Routes>
          <Route exact path="/" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country={country} category='general' />}></Route>
          <Route exact path="/business" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} country={country} category='business' />}></Route>
          <Route exact path="/science" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} country={country} category='science' />}></Route>
          <Route exact path="/entertainment" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country={country} category='entertainment' />}></Route>
          <Route exact path="/general" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country={country} category='general' />}></Route>
          <Route exact path="/health" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} country={country} category='health' />}></Route>
          <Route exact path="/sports" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country={country} category='sports' />}></Route>
          <Route exact path="/technology" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} country={country} category='technology' />}>
          </Route>
        </Routes>

      </Router>
      <NewsItem mode={mode} />
    </div>
  )

}


export default App;