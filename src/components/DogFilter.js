import React from "react";

function DogFilter({ onFilter }){
    function handleClick(){
        onFilter()
    }

    return(
        <div id="filter-div">
            <button onClick={handleClick} id="good-dog-filter">Filter good dogs: OFF</button>
        </div>
    )
}

export default DogFilter