import { useState } from "react";
import Search from "./components/Search";

const App = () => {

  const [seachTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Your Next Favorite <span className="text-gradient">Movie</span>, Hassle-free</h1>
        </header>

        <Search seachTerm={seachTerm} setSearchTerm={setSearchTerm}/>
        <h1 className="text-white">{seachTerm}</h1>   
      </div>

    </main>
  )
}

export default App