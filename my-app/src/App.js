import navimg from './navimg.png';
import linkedin from './linkedin.png';
import twitter from './twitter.png';
import pfp from './pfp.png';

import './App.css';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function App() {

  const [ articles, setArticles ] = useState("");
  const [ table, setTable ] = useState("");
  const [ graphData, setGraphData ] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let response = await axios.get("https://website-nodejs-olive.vercel.app/");
    console.log("response: ", response);
    setArticles(response.data.articles);
    setTable(response.data.cited_by.table);
    formatGraphData(response.data.cited_by.graph);
  }

  const formatGraphData = (data) => {
    let output = [];
    data.forEach(addToArray);
    function addToArray(item, index) {
      output.push({
        year: item.year,
        citations: item.citations
      });
    }
    setGraphData(output);
  }

  // idea: cut off at a certain point and have "display more" button
  const displayArticles = () => {
    return (<div className="articles">
      {articles.map((article,index)=>{
        return (<div className="article">
          <a href={article.link}>
            <h4>{article.title}</h4>
            <p>{article.publication}</p>
          </a>
        </div>)
      })}
    </div>);
  }

  const displayTable = () => {
    return (<div id="table">
      <div>
        <h4>Citations:</h4>
        <p>{table[0].citations.all}</p>
      </div>
      <div>
        <h4>h-index:</h4>
        <p>{table[1].h_index.all}</p>
      </div>
      <div>
        <h4>i10-index:</h4>
        <p>{table[2].i10_index.all}</p>
      </div>
  </div>);
  }

  return (
    <div className="App">
      <div id="Navbar">
        {/* todo: get rid of image after a certain width scale */}
        <img src={navimg} style={{height: '70px', padding: '10px', marginLeft: '30px'}}></img>
        <a href="#patientCare" id="first">Patient Care</a>
        <a href="#research">Research</a>
        <a href="#videos">Videos</a>
      </div>
      <div className="Header">
        <div className="Intro">
        <div style={{display: "flex", flexDirection: "row"}}>
          <img src={pfp} id="pfp"></img>
            <h1 style={{flexDirection: "column"}}>Dr. Jason Rubenstein, MD, FACC, FHRS</h1>
            <h2 style={{flexDirection: "column"}}>Cardiologist, Electrophysiologist, 
    Associate Professor</h2>
          </div>
          <p>Director, Cardiac MRI</p>
          <p>Director, Electrophysiology Fellowship</p>
          <p>Vice-Chair, Section of Electrophysiology</p>

          <p>Academic Electrophysiologist focusing on patient-centric management of
            cardiac arrhythmias. Located in Milwaukee, Wisconsin. Specializing in treatment of atrial fibrillation utilizing modern
            catheter and hybrid ablation techniques. Implantation and management of pacemakers,
            implantable defibrillators, cardiac resynchronization devices, leadless pacemakers.
            Performing and interpretation of cardiac MRI, including stress CMR and MRI in
            patients with pacemakers.
          </p>

        </div>
      </div>
      <div className="Body">
        <h2 id="patientCare">Patient care </h2>
        <h4 style={{display: "inline", marginRight: "10px"}}>Find a doctor site:</h4>
        <a href="https://www.froedtert.com/doctors/jason-rubenstein-1063603975" id="fad">Jason C. Rubenstein, MD, FACC, FHRS</a>
        <p>Practice locations include Froedtert Hospital and Froedtert Menomonee Falls Hospital.</p> 
        <p>Welcoming referrals and second opinion requests, in-person or virtual.</p>
        <p>Click to request an appointment:</p>
          <p>
          <a href="https://www.froedtert.com/appointment/request?clinic_or_provider_or_specialty_if_any_=Jason%20C%20Rubenstein%20MD-FACC-FHRS" target="_blank"><button>Book an Appointment</button></a>
          </p>

          <h2 id="research" style={{marginTop: "70px"}}>Research</h2>
          <a href="https://fcd.mcw.edu/?faculty/view/name/Jason_C._Rubenstein_MD/id/3697" target="_blank">Faculity collaborative database</a>

          <br></br>
          <br></br>
          <h3>Statistics</h3>
          
          <BarChart width={730} height={250} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="citations" fill="#096481" />
        </BarChart>
          {table && displayTable()}
          <br></br>
          <h3>Articles</h3>
          {articles && displayArticles()}
          <h2 id="videos" style={{marginTop: "70px"}}>Videos</h2>
          <div class='row'>
            <div class='column'>
              <div className="video">
                <h3>Dr. Jason Rubenstein, cardiologist, electrophysiologist</h3>
                <p>Jason Rubenstein, MD, is a cardiologist and electrophysiologist with Froedtert & the Medical College of Wisconsin health network. 
                  Dr. Rubenstein sees patients at Froedtert Hospital in Milwaukee and Froedtert Menomonee Falls Hospital in Menomonee Falls, Wis.</p>
                  <a href="https://www.youtube.com/watch?v=l1WAY6dEsR4&t=1s" target="_blank"><button>Watch Video</button></a>
              </div>
              <div className="video">
                <h3>What are the different types of ablation treatment? (Jason Rubenstein, MD)</h3>
                <p>Jason Rubenstein, MD, Medical College of Wisconsin electrophysiologist, describes the different types of ablation and how they are used to treat arrhythmia, 
                  or irregular heartbeat, at Froedtert & The Medical College of Wisconsin</p>
                <a href="https://www.youtube.com/watch?v=X_T3NZmARvs&pp=ygUQamFzb24gcnViZW5zdGVpbg%3D%3D" target="_blank"><button>Watch Video</button></a>
              </div>
            </div>
            <div class='column'>
              <div className="video">
                <h3>Once an arrhythmia is treated, how often will it reoccur? (Jason Rubenstein, MD, FACC)</h3>
                <p>Jason Rubenstein, MD, Medical College of Wisconsin electrophysiologist, discusses the reoccurence rate for arrhythmia based on the treatment method. Dr. Rubenstein is part of the Arrhythmia Program team at Froedtert & The Medical College of Wisconsin</p>
                <a href="https://www.youtube.com/watch?v=nVPKCxhBlrE" target="_blank"><button>Watch Video</button></a>
              </div>
              <div className="video">
                <h3>What is bradycardia? (Jason Rubenstein, MD)</h3>
                <p>Jason Rubenstein, MD, Medical College of Wisconsin electrophysiologist, discusses the symptoms and causes of bradycardia. He also describes bradycardia treatment. Dr. Rubenstein is part of the Arrhythmia Program team at Froedtert & The Medical College of Wisconsin. </p>
                <a href="https://www.youtube.com/watch?v=YITcMk3xmJw" target="_blank"><button>Watch Video</button></a>
              </div>
            </div>
          </div>
      </div>
      <div className="footer">
        <p style={{marginBottom: '0px'}}>@2023 Jason Rubenstein</p>
        <div id="icons">
        <a href="https://www.linkedin.com/in/rubenstein/" target="_blank"><img src={linkedin} className="icon"></img></a>
        <a href="https://twitter.com/JasonEPMD" target="_blank"><img src={twitter} className="icon"></img></a>
      </div>
      </div>
    </div>
  );
}

export default App;
