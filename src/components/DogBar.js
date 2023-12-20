import React from "react";

function DogBar({ dogs, onClickDog }){
    // const [goodDogViewer, setGoodDogViewer] = useState(false)

    const displayedDogs = dogs.map(dog => (
        <span id={dog.id} onClick={handleClick} value={dog} key={dog.id}>{dog.name}</span>
    ))

    function handleClick(e){
        const id = e.target.id
        console.log(e.target.id)
        fetch(`http://localhost:3001/pups/${id}`)
        .then(res => res.json())
        .then(resData => {
            onClickDog(resData)
        })
    }

    return (
        <div>
            <div id="filter-div">
                <button id="good-dog-filter">Filter good dogs: OFF</button>
            </div>
            <div id="dog-bar">
                {displayedDogs}
            </div>
        </div>
    ) 
}

export default DogBar;