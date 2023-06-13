import React from "react";
import "./notbilgisi.css"
function Notbilgisi(props) {
    function calculateAverage(x,y,z) {
       const toplam=parseInt(x)+parseInt(y)+parseInt(z);
       
       const ortalama=toplam/3
       return ortalama.toFixed(2)
      }
      
     
  return (
    <div className="not-bilgisi-container">
      <table className="not-bilgisi-table">
        <thead>
          <tr>
            <th>Ders Adı</th>
            <th>Sınav 1</th>
            <th>Sınav 2</th>
            <th>Sınav 3</th>
            <th>Ortalama</th>
          </tr>
        </thead>
        <tbody>
         
            <tr>
              <td>Matematik</td>
                <td >{props.mat1}</td>
                <td >{props.mat2}</td>
                <td >{props.mat3}</td>
                <td >{calculateAverage(props.mat1,props.mat2,props.mat3)}</td>
              <td></td>
            </tr>
            <tr>
              <td>Hayat Bilgisi</td>
                <td >{props.hb1}</td>
                <td >{props.hb2}</td>
                <td >{props.hb3}</td>
                <td >{calculateAverage(props.hb1,props.hb2,90)}</td>
              <td></td>
            </tr>
            <tr>
              <td>Fen Bilgisi</td>
                <td >{props.f1}</td>
                <td >{props.f2}</td>
                <td >{props.f3}</td>
                <td >{calculateAverage(props.f1,props.f2,90)}</td>
              <td></td>
            </tr>
          
          
          
        </tbody>
      </table>
    </div>
  );
}

// Sinav notlarının ortalamasını hesaplayan yardımcı fonksiyon


export default Notbilgisi;