import { useEffect, useState } from 'react'

import './App.css'
import type { Cipok } from './types/cipok'

function App() {
  const [cipok, setCipok] = useState<Cipok[]>([])
  const [nev, setNev] = useState("")
  const [ar, setAr] = useState(0)
  const [raktaron, setRaktaron] = useState(false)
  const [vasarlasDatuma, setVasarlasDatuma] = useState<Date>(new Date())

  useEffect(() => {
    async function FetchCipok() {
      try {
        const response = await fetch("http://localhost:3000/cipok")
        const data: Cipok[] = await response.json();
        setCipok(data)
      } catch (err) {
        console.log("hiba történt:" + err.message)

      }

    }
    FetchCipok();
  }, [])



  async function handleCipok(e) {
    e.preventDefault()
    const ujCipo = {
      nev: nev,
      ar: Number(ar),
      raktaron: raktaron,
      vasarlasDatuma: new Date().toISOString()
    }
    if(nev.length===0){
      console.error("kell név legyen megadva");
      
    }
    if(!ar){
      console.error("kell ár legyen megadva");
      
    }

    try {
      const response = await fetch("http://localhost:3000/cipok", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(ujCipo),
      });

      const cipo: Cipok = await response.json();
      setCipok((elozo) => [...elozo, cipo])

      setNev("")
      setAr(0)
      setRaktaron(false)
      setVasarlasDatuma(new Date())


    } catch (err) {
      console.log("hiba történt:" + err.message)
    }
  }



  return (
    <>
      <h1>Cipők</h1>
      <h2>Cipők listázása</h2>
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th>Név</th>
            <th>Osztály</th>
            <th>Raktáron</th>
            <th>Vásárlásdátuma</th>
          </tr>
        </thead>
        <tbody>
          {cipok.map((cipo) => (
            <tr key={cipo.id}>
              <td>{cipo.nev}</td>
              <td>{cipo.ar}</td>
              <td>{cipo.raktaron?"Raktáron":"Nincs raktáron"}</td>
              <td>{ new Date(cipo.vasarlasDatuma).toISOString()}</td>
            </tr>
          ))}

        </tbody>
      </table>

      <h2>Cipők Felvétele</h2>

      <form onSubmit={handleCipok}>
        <label >Neve</label>
        <input className="form-control" type="text" value={nev} onChange={(e)=>setNev(e.target.value)} required />
        <label >Ára</label>
        <input  className="form-control" type="number" value={ar} onChange={(e)=>setAr(Number(e.target.value))} required/>
        <label htmlFor="raktaron">Raktáron</label>
        <input  className="form-check" type="checkbox" checked={raktaron} onChange={(e)=>{
          setRaktaron(Boolean(e.target.checked))
          }} />
        {/* <input type="date" value={vasarlasDatuma.toISOString()} onChange={(e)=>setVasarlasDatuma(new Date( e.target.value))} /> */}
        <button className='btn btn-success'> Felvétel</button>
      </form>
    </>
  )
}

export default App
