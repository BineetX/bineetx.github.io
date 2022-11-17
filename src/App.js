import React from "react";
import Landing from "./pages/landing";
import { useState } from 'react'
import DetailedPage from "./pages/detailed";

import {useSelector } from 'react-redux'

function App() {

  const selected = useSelector((state) => state.selectionname.name)
  // const [selected, setSelected] = useState('')

  let selection
  if (selected === ""){
    selection = <Landing/>
  }else if(selected === "details"){
    selection = <DetailedPage/>
  }

  return (
    <div  >

        {selection}

    </div>
  );
}

export default App;
