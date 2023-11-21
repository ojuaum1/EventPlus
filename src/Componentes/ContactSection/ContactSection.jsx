import React from 'react';
import "./ContactSection.css"
import Title from '../Title/Title'
import contatomap from '../../Assets/images/contato-map.png'
const ContactSection = () => {
    return (
        <section className='contato'>
            <title titleText={"contato"}/>

            <div className='contato__endereço-box'>
          <img 
          src={contatomap}
          alt="imagem ilustrativa de um mapa" 
          className='contato__img-map'
          />

          <p>
            rua niteroi, 180 - centro <br />
            São Caetano do sul - SP
            <a href="telÇ55114242-4242" className='contato__telefone'>
                (11)4225-2525 

            </a>
          </p>
            </div>
        </section>
    );
};

export default ContactSection;