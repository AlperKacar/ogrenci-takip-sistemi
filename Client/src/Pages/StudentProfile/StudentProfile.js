import React, { useState } from 'react'
import HeaderAuth from '../../Components/HeaderAuth'
import StudentProfileSideMenuCopy from './StudentProfileSideMenucopy'
import "./studentprofile.css"
import Duyurular from './duyurular.js'
import Notbilgisi from './notbilgisi'
import Devamsizlik from './devamsizlik'
function StudentProfile() {
  const [selected,setSelected]=useState("2");
  
  const renderElement = (secili) => {
    if (secili === "1") {
      return <Devamsizlik/>
    } else if (secili === "2") {
      return  <Notbilgisi/>
    } 
    else
      return <Duyurular/>
  };

  
  return (
    <div className='container'>
     
    <HeaderAuth tur={"Ogrenci"}/>

    
    <div className='yana-al'>
    <StudentProfileSideMenuCopy setSelected={setSelected}/>
    <div className='main-body'>
      {renderElement(selected)}
      </div>
    </div>
    </div>
  )
}

export default StudentProfile