import React,{useContext, useState} from "react";
import trashDelete from "../../Assets/images/trash-delete.svg";
import { UserContext } from "../../Context/AuthContext";
import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  comentaryText = "Não informado. Não informado. Não informado.",
  userId = null,
  showHideModal = false,
  fnDelete = null,
  fnNewCommentary = null,
  fnGet = null,
  fnPost = null
  
}) => {
  
  const [descricao, setDescricao] = useState();
  const {userData} = useContext(UserContext)

  async function carregarDados(){
    fnGet(userData.userId, userData.idEvent)
  }
  
  console.clear();
  console.log(userData);
  
  return (
    <div className="modal">
      <article className="modal__box">
        
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={()=> showHideModal(true)}>x</span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={() => {fnDelete()}}
          />

          <p className="comentary__text">{comentaryText}</p>

          <hr className="comentary__separator" />
        </div>

        <Input
          placeholder="Escreva seu comentário..."
          className="comentary__entry"
          value={descricao}
          manipulationFunction={(e) => {setDescricao(e.target.value)}}
        />

        <Button
          textButton="Comentar"
          className="comentary__button"
          manipulationFunction={() => {fnPost(descricao, userData.userId, userData.idEvento);
          }}
          onClick={ {fnPost}}
        />
      </article>
    </div>
  );
};

export default Modal;
