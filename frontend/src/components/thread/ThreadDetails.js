import React from "react";

function ThreadDetails(props) {
    return(
        <p className="card-text">Asked by {props.author} on {props.createdDate}</p>
    )
}

export default ThreadDetails