import React from 'react';
import imageDefault from "../../Assets/images/default-image.jpeg"



const ImageIllustrator = ({ alteText, imageRender = imageDefault,additionalClass =""}) => {

   
    return (
        <figure className='illustrator-brox'>
            <img
                src={imageRender}
                alt={alteText}
                className={`illustrator-box__image ${additionalClass}`}
            />
        </figure>
    );
};

export default ImageIllustrator;