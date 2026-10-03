"use client";

import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0)
    let clickCount = 0

    return (<>
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount((previousCount) => previousCount + 1)}>
                Click me
            </button>
        </div>

    </>)


}