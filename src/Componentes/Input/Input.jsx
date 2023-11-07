import React from 'react';

const Input = ({onChange, type, placeholder,value, name, id}) => {
    
    return (
        <> 
         <input
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
        />
        <span>{value}</span>
        </>
    );
};

export default Input;