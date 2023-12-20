import React, { useEffect, useState } from "react";
import DogBar from "./DogBar";
import DogInfo from "./DogInfo";

function App() {
  const [dogs, setDogs] = useState([])
  const [dogName, setDogName] = useState("")
  const [dogImage, setDogImage] = useState("")
  const [dogStatus, setDogStatus] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3001/pups")
    .then(res => res.json())
    .then(resData => setDogs(resData))
  }, [])

  function handleClickDog(clickedDog){
    setDogName(clickedDog.name)
    setDogImage(clickedDog.image)
    setDogStatus(clickedDog.isGoodDog)
  }

  function changeStatus(){
    if (!dogStatus) {
      setDogStatus(true)
    } else {
      setDogStatus(false)
    }
  }

  return (
    <div className="App">
      <DogBar onClickDog={handleClickDog} dogs={dogs} />
      <DogInfo changeStatus={changeStatus} name={dogName} image={dogImage} status={dogStatus}  />
    </div>
  );
}

export default App;
