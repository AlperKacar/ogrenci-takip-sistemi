import React from "react";
import "./notbilgisi.css"
function Notbilgisi() {
    function calculateAverage(sinavlar) {
        const toplam = sinavlar.reduce((acc, curr) => acc + curr, 0);
        return (toplam / sinavlar.length).toFixed(2);
      }
  const dersler = [
    {
      dersAdi: "Matematik",
      sinavlar: [80, 85, 90]
    },
    {
      dersAdi: "Hayat Bilgisi",
      sinavlar: [70, 75, 80]
    },
    {
      dersAdi: "Fen Bilgisi",
      sinavlar: [90, 85, 95]
    }
  ];

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
          {dersler.map((ders, index) => (
            <tr key={index}>
              <td>{ders.dersAdi}</td>
              {ders.sinavlar.map((sinav, sinavIndex) => (
                <td key={sinavIndex}>{sinav}</td>
              ))}
              <td>{calculateAverage(ders.sinavlar)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Sinav notlarının ortalamasını hesaplayan yardımcı fonksiyon


export default Notbilgisi;