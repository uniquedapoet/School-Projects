import React, { useEffect, useState } from "react";

const CounterButton = (props) => {


    return <button onClick={props.handleClick}>{`The number of clicks: ${props.count}`}</button>
}

const CounterContainer = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <CounterButton count={count} handleClick={handleClick}/>
            <br />
            <CounterButton count={count} handleClick={handleClick}/>
        </div>
    )
}

export default CounterContainer;