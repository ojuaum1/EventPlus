import React from 'react';
import "./FormComponents.css"


export const Input = ({
    type,
    id,
    value,
    required,
    additionalClass,
    name,
    placeholder,
    manipulationFunction = ""
}) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            required={required ? "required" : ""}
            className={`input-component ${additionalClass}`}
            onChange={manipulationFunction}
            autoComplete='offs'

        />
    );
};

export const Label = ({ htmlFor, labelText }) => {

    return <label htmlFor={htmlFor}>{labelText}</label>
}

export const Button = (props) => {
    return (
        <button
            id={props.id}
            name={props.name}
            type={props.type}
            className={`button-component ${props.additionalClass}`}
            onClick={props.manipulationFunction}
        >
            {props.textButton}
        </button>
    );
}

export const Select = ({

    required,
    id,
    name,
    options,
    manipulationFunction,
    additionalClass = "",
    value
}) => {

    return (
        <select
        name={name}
        id={id}
        required={required ? "required" : ""}
        className={`input-component ${additionalClass}`}
        onChange ={manipulationFunction}
        value = {value}
    >

        <option value=''> Selecione </option>

        {options.map((option, index) => <option key={index} value={option.value}>{option.text}</option> )}

    </select>

    )
}