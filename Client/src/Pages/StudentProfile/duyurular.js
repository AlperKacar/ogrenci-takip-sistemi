import React from 'react'
import "./duyurular.css"
function Duyurular({duyurular}) {
  console.log(duyurular)
 
    return (
        <div className="duyurular-container">
      <table className="duyurular-table">
        <thead>
          <tr>
            <th>Hoca Adı</th>
            <th>Baslik</th>
            <th>Duyuru</th>
          </tr>
        </thead>
      
        <tbody>
          
           
        {duyurular.map((duyuru) => (
            <tr key={duyuru._id}>
              <td>{duyuru.teacher_adı}</td>
              <td>{duyuru.title}</td>
              <td>{duyuru.content}</td>
              
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
      );
}

export default Duyurular