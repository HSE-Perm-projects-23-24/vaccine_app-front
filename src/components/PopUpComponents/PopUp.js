import React from "react";
import "./PopUp.css";
import { Button } from "@mui/material";

const PopUp = (props) => {
    return (props.trigger) ? (
        <div className="popup" style={{ height: "453px" }}>
            <div className="popup-content" style={{ height: "410px" }}>
                <div>
                    <p>
                        Для того, чтобы добавить процедуру, нажмите
                        <span style={{ fontWeight: 'bold', color: 'green' }}> Добавить</span>
                    </p>
                </div>
                <div>
                    <p>
                        Для того, чтобы удалить процедуру, нажмите
                        <span style={{ fontWeight: 'bold', color: 'red' }}> Удалить</span>
                    </p>
                </div>
                <div>
                    <p>
                        Для того, чтобы редактировать процедуру, выберите процедуру и нажмите
                        <span style={{ fontWeight: 'bold', color: 'dodgerblue' }}> Редактировать</span>
                    </p>
                </div>
                <div>
                    <p>
                        Фильтрация осуществляется в поле
                        <span style={{ fontWeight: 'bold' }}> Фильтрация</span>
                    </p>
                </div>
                <div>
                    <p>
                        Для того, чтобы отметить процедуру, как сделанную, выберите процедуру и нажмите
                        <span style={{ fontWeight: 'bold', color: 'green' }}> Процедура сделана</span>
                    </p>
                </div>
                <div>
                    <p>
                        Переход в календарь сделанных процедур осуществляется при помощи кнопки
                        <span style={{ fontWeight: 'bold', color: 'dodgerblue' }}> Сделанные процедуры</span>
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
                {props.children}
            </div>
        </div>
    ) : "";
}

export default PopUp