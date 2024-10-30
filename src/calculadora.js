import React, { useState } from 'react';
import './App.css';

const Calculadora = () => {
    const [display, setDisplay] = useState('0');
    const [history, setHistory] = useState([]);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [prevValue, setPrevValue] = useState(null);
    const [operation, setOperation] = useState(null);

    const clearAll = () => {
        setDisplay('0');
        setHistory([]);
        setPrevValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
            return;
        }

        if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (prevValue == null) {
            setPrevValue(inputValue);
        } else if (operation) {
            const currentValue = prevValue || 0;
            const newValue = calculateOperation(currentValue, inputValue, operation);

            setPrevValue(newValue);
            setDisplay(String(newValue));
            setHistory([...history, `${currentValue} ${operation} ${inputValue} = ${newValue}`]);
        }

        setWaitingForOperand(true);
        setOperation(nextOperator);
    };

    const calculateOperation = (prevValue, nextValue, op) => {
        switch (op) {
            case '+':
                return prevValue + nextValue;
            case '-':
                return prevValue - nextValue;
            case '×':
                return prevValue * nextValue;
            case '÷':
                return prevValue / nextValue;
            default:
                return nextValue;
        }
    };

    return ( <
        div className = "flex flex-col items-center p-4 max-w-md mx-auto" >
        <
        div className = "w-full bg-gray-100 rounded-lg p-4 mb-4" >
        <
        div className = "text-right text-3xl mb-2 bg-white p-2 rounded" > { display } <
        /div>

        <
        div className = "grid grid-cols-4 gap-2" >
        <
        button className = "col-span-2 bg-red-500 text-white p-2 rounded"
        onClick = { clearAll } >
        Clear <
        /button> <
        button className = "bg-gray-300 p-2 rounded"
        onClick = {
            () => performOperation('÷')
        } > ÷
        <
        /button> <
        button className = "bg-gray-300 p-2 rounded"
        onClick = {
            () => performOperation('×')
        } > ×
        <
        /button>

        {
            [7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => ( <
                button key = { num }
                className = "bg-gray-200 p-2 rounded hover:bg-gray-300"
                onClick = {
                    () => inputDigit(num)
                } > { num } <
                /button>
            ))
        }

        <
        button className = "bg-gray-300 p-2 rounded"
        onClick = {
            () => performOperation('-')
        } >
        -
        <
        /button>

        <
        button className = "bg-gray-200 p-2 rounded hover:bg-gray-300"
        onClick = {
            () => inputDigit(0)
        } >
        0 <
        /button>

        <
        button className = "bg-gray-200 p-2 rounded hover:bg-gray-300"
        onClick = { inputDecimal } >
        . <
        /button>

        <
        button className = "bg-blue-500 text-white p-2 rounded"
        onClick = {
            () => performOperation('=')
        } > = <
        /button>

        <
        button className = "bg-gray-300 p-2 rounded"
        onClick = {
            () => performOperation('+')
        } >
        +
        <
        /button> < /
        div > <
        /div>

        <
        div className = "w-full bg-gray-100 rounded-lg p-4" >
        <
        h3 className = "text-lg font-bold mb-2" > Historial < /h3> <
        ul className = "space-y-1" > {
            history.map((operation, index) => ( <
                li key = { index }
                className = "text-sm" > { operation } < /li>
            ))
        } <
        /ul> < /
        div > <
        /div>
    );
};

export default Calculadora;