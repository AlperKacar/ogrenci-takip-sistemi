import React, { useState } from 'react'
import "./devamsizlik.css"
function Devamsizlik({tarihler,devamsizlikSayisi}) {
 
  return (
    <div className='new-main'>
        <div className="ortala">
        <h3 className='gelmedigin'>Gelmediğiniz Günler</h3></div>
        <div className="baslangic">
         
          
          {tarihler.map((tarih, index) => (
        <div key={index} className="devamsizliklar">{tarih}</div> ))}
         
         <div className='toplamsayi'>Toplam Devamsızlık Sayısı: {devamsizlikSayisi}</div>
   </div>
   </div>
   
  )
}

export default Devamsizlik