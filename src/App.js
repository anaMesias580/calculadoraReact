import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(false);

    const handleNumber = (number) => {
        if (display === '0') {
            setDisplay(number);
        } else {
            setDisplay(display + number);
        }
        setError(false);
    };

    const handleOperator = (operator) => {
        if (display !== '0') {
            setEquation(display + ' ' + operator + ' ');
            setDisplay('0');
            setError(false);
        }
    };

    const handleDecimal = () => {
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setEquation('');
        setError(false);
    };

    const handleDelete = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    };

    const handleEquals = () => {
        try {

            if (equation.includes('/') && display === '0') {
                setError(true);
                setDisplay('Error');
            } else {
                const result = eval(equation + display).toString();
                const operation = `${equation}${display} = ${result}`;
                setHistory([...history, operation]);
                setDisplay(result);
                setEquation('');
            }
        } catch (error) {
            setError(true);
            setDisplay('Error');
        }
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return ( <
            div className = "max-w-xs mx-auto p-4" >
            <
            div className = "bg-gray-100 p-4 rounded-lg shadow-lg" > <
            div className = "mb-4 p-2 bg-white rounded" >
            <
            div className = "text-sm text-gray-600 max-h-32 overflow-y-auto" > {
                history.map((item, index) => ( <
                    div key = { index }
                    className = "mb-1" > { item } < /div>
                ))
            } <
            /div> {
            history.length > 0 && ( <
                button onClick = { clearHistory }
                className = "text-sm text-red-500 mt-2" >
                Eliminar Historial <
                /button>
            )
        } <
        /div>

    <
    div className = "Calculadora" >
        <
        div className = "Pantalla bg-white p-4 text-right text-xl mb-4 rounded" >
        <
        div className = "text-sm text-gray-500" > { equation } < /div> { error ? 'Error' : display } < /
    div >

        <
        button onClick = { handleClear }
    id = "limpiar"
    className = "boton bg-red-400" > C < /button> <
    button onClick = { handleDelete }
    id = "borrar"
    className = "boton bg-orange-400" > ← < /button> <
    button onClick = {
        () => handleOperator('/')
    }
    className = "boton bg-blue-400" > /</button >
        <
        button onClick = {
            () => handleOperator('*')
        }
    className = "boton bg-blue-400" > * < /button>

    <
    button onClick = {
        () => handleNumber('7')
    }
    className = "boton" > 7 < /button> <
    button onClick = {
        () => handleNumber('8')
    }
    className = "boton" > 8 < /button> <
    button onClick = {
        () => handleNumber('9')
    }
    className = "boton" > 9 < /button> <
    button onClick = {
        () => handleOperator('-')
    }
    className = "boton bg-blue-400" > - < /button>

    <
    button onClick = {
        () => handleNumber('4')
    }
    className = "boton" > 4 < /button> <
    button onClick = {
        () => handleNumber('5')
    }
    className = "boton" > 5 < /button> <
    button onClick = {
        () => handleNumber('6')
    }
    className = "boton" > 6 < /button> <
    button onClick = {
        () => handleOperator('+')
    }
    className = "boton bg-blue-400" > + < /button>

    <
    button onClick = {
        () => handleNumber('1')
    }
    className = "boton" > 1 < /button> <
    button onClick = {
        () => handleNumber('2')
    }
    className = "boton" > 2 < /button> <
    button onClick = {
        () => handleNumber('3')
    }
    className = "boton" > 3 < /button> <
    button onClick = { handleEquals }
    id = "igual"
    className = "boton bg-green-400" >= < /button>

    <
    button onClick = {
        () => handleNumber('0')
    }
    id = "cero"
    className = "boton" > 0 < /button> <
    button onClick = { handleDecimal }
    className = "boton" > . < /button> < /
    div > <
        /div> < /
    div >
);
};

export default App;