import React from "react";

function DogInfo({ name, image, status, changeStatus, id }) {

  function handleClick() {
    // Toggle the local state first
    changeStatus(!status);

    // Send a PATCH request to update the server
    fetch(`http://localhost:3001/pups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isGoodDog: !status,
      }),
    })
      .then((res) => res.json())
      .then((updatedDog) => {
        // You may want to handle the response from the server if needed
        console.log("Dog status updated on the server:", updatedDog);
      })
      .catch((error) => {
        console.error("Error updating dog status:", error);
        // Revert the local state in case of an error
        changeStatus(status);
      });
  }

  return (
    <div>
      {name ? (
        <div id="dog-summary-container">
          <h1>DOGGO:</h1>
          <div id="dog-info">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <button onClick={handleClick}>
              {status ? "Good Dog!" : "Bad Dog!"}
            </button>
          </div>
        </div>
      ) : <></>}
    </div>
  );
}

export default DogInfo;
