import { useState } from "react"
import ThemeToggler from "./components/ThemeToggler";


function App() {
  const [countries, setCountries] = useState([]);


  useState(() => {
    (async () => {
      const data = await fetch("https://restcountries.com/v3.1/region/europe");

      console.log(await data.json());
    })()
  }, []);

  return (
    <>
      <header>
        <h1>Where in the world?</h1>
        <ThemeToggler />
      </header>
      <section>
        <div className="search-filter">
          <div className="search-bar">
            
          </div>
        </div>
      </section>
    </>
  )
}

export default App
