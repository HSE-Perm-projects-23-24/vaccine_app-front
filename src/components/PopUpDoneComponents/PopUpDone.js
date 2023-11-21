import React from "react";
import "./PopUpDone.css";
import { Button } from "@mui/material";

const PopUpDone = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-content" style={{ flexDirection: "column" }}>
                <div>
                    <p>
                        Фильтрация осуществляется в поле
                        <span style={{ fontWeight: 'bold' }}> Фильтрация</span>
                    </p>
                </div>
                <div>
                    <p>
                        Переход в календарь предстоящих процедур осуществляется при помощи кнопки
                        <span style={{ fontWeight: 'bold', color: 'green' }}> Предстоящие процедуры</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span style={{ textDecorationLine: "underline" }}>При возникновении вопросов обращайтесь на почту</span>
                        <span style={{ fontWeight: 'bold' }}> dyarakovskaya@edu.hse.ru</span>
                    </p>
                </div>
                <div className="close-btn">
                    <Button
                        onClick={() => props.setTrigger(false)}
                        color="error"
                        variant="outlined"
                    >
                        Закрыть
                    </Button>
                </div>
            </div>
        </div>
    ) : "";
}

export default PopUpDone