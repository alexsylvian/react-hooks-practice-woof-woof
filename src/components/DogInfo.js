import React from "react";

function DogInfo({ name, image, status, changeStatus }){

    function handleClick(){
        changeStatus(status)
    }
    
    return(
        <div>
            {name ? (
                <div id="dog-summary-container">
                <h1>DOGGO:</h1>
                <div id="dog-info">
                    <img src={image} alt={name} />
                    <h2>{name}</h2>
                     <button onClick={handleClick}>{status ? "Good Dog!" : "Bad Dog!"}</button>
                </div>
            </div>
            ) : <></>}
        </div>
    )
}

export default DogInfo;