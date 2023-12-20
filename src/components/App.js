import React, { useEffect, useState } from "react";
import DogBar from "./DogBar";
import DogInfo from "./DogInfo";
import DogFilter from "./DogFilter";

function App() {
  const [dogs, setDogs] = useState([]);
  const [dogName, setDogName] = useState("");
  const [dogImage, setDogImage] = useState("");
  const [dogStatus, setDogStatus] = useState(true);
  const [dogId, setDogId] = useState(null);
  const [dogFilter, setDogFilter] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3001/pups")
      .then((res) => res.json())
      .then((resData) => setDogs(resData));
  }, []);

  function handleClickDog(clickedDog) {
    setDogName(clickedDog.name);
    setDogImage(clickedDog.image);
    setDogStatus(clickedDog.isGoodDog);
    setDogId(clickedDog.id); // Set the dog id
  }

  function changeStatus(newStatus) {
    setDogStatus(newStatus);

    // Send a PATCH request to update the server
    fetch(`http://localhost:3001/pups/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isGoodDog: newStatus,
      }),
    })
      .then((res) => res.json())
      .then((updatedDog) => {
        console.log("Dog status updated on the server:", updatedDog);
      })
      .catch((error) => {
        console.error("Error updating dog status:", error);
        // Revert the local state in case of an error
        setDogStatus(!newStatus);
      });
  }

  function handleFilter(){
    setDogFilter(!dogFilter)
  }

  const filteredDogs = dogFilter ? dogs.filter(dog => dog.isGoodDog === true) : dogs

  return (
    <div className="App">
      <DogFilter onFilter={handleFilter} />
      <DogBar onClickDog={handleClickDog} dogs={filteredDogs} />
      <DogInfo
        changeStatus={changeStatus}
        name={dogName}
        image={dogImage}
        status={dogStatus}
        id={dogId} // Pass the dog id to DogInfo
      />
    </div>
  );
}

export default App;
