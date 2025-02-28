import { useState } from "react";

function Counter() {
    // Initialize state with useState
    const [count, setCount] = useState(0);

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h2>Counter App</h2>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>Current Count: {count}</p>
            <button
                onClick={() => setCount(count + 1)}
                style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
            >
                Increment
            </button>
            <button
                onClick={() => setCount(count - 1)}
                style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
            >
                Decrement
            </button>
            <button
                onClick={() => setCount(0)}
                style={{ margin: "5px", padding: "10px", fontSize: "16px", backgroundColor: "red", color: "white" }}
            >
                Reset
            </button>
        </div>
    );
}

export default Counter;
