import { useEffect, useState } from 'react'

import './App.css'
import type { Cipok } from './types/cipok'

function App() {
  const [cipok, setCipok] = useState<Cipok[]>([])
  const [nev, setNev] = useState("")
  const [ar, setAr] = useState(0)
  const [raktaron, setRaktaron] = useState<boolean>(false)
  const [vasarlasDatuma, setVasarlasDatuma] = useState<Date>(new Date())

  useEffect(() => {
    async function FetchCipok() {
      try {
        const response = await fetch("http://localhost:3000/users")
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
      raktaron: Boolean(raktaron),
      vasarlasDatuma: new Date().toISOString()
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
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
          </tr>
        </thead>
        <tbody>
          {cipok.map((cipo) => (
            <tr key={cipo.}>
              <td>{cipo.nev}</td>
              <td>{cipo.ar}</td>
            </tr>
          ))}

        </tbody>
      </table>

      <h2>Cipők Felvétele</h2>
    </>
  )
}

export default App
