import React, { useEffect, useState } from "react"

const Teste = () => {
    const [count, setCount] = useState(0);
    const [Calculation, setCalculation] = useState(0);

    useEffect(() => {
        setCalculation(count * 2);

    }, [count]);
    return (
        <>
            <p>count:{count}</p>
            <button onClick={() => setCount((c) => c + 1)}>+</button>
            <p>Calculation: {Calculation}</p>
        </>
    );
};

export default Teste;