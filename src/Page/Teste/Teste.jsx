import React, { useState } from 'react';
import Input from '../../Componentes/Input/Input';
import Button from '../../Componentes/Button/Button'
const Teste = () => {
    const [n1, setN1] = useState(0)
    const [n2, setN2] = useState(0)
    const [total, setTotal] = useState(0);

    function handleCalcular(e) {
        e.preventDefault()
        setTotal(parseFloat(n1) + parseFloat(n2));
    }
    return (
        <div>

                <h1>pagina de poc</h1>
                <h2>Calcular</h2>

                <form onSubmit={handleCalcular}>
                    <input
                        type="number"
                        placeholder='primeiro numero'
                        name='n1'
                        id='n1'
                        value={n1}
                        onChange={(e) => { setN1(e.target.value) }}
                    />
                    <br />
                    <Input
                        type="number"
                        placeholder='primeiro numero'
                        name='n2'
                        id='n2'
                        value={n2}
                        onChange={(e) => { setN2(e.target.value) }}
                    />
                    <br />
                    <Button
                        textButton="Calcular"
                        type='submit'
                        onClick={handleCalcular}
                    />

                    <span>Resultado:<strong>{total}</strong></span>
                </form>
           
        </div>
    );
};

export default Teste;