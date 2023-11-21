import React from "react";
import { Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import config from '../../config.json';

function RegistrationPage() {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        id: 0,
        username: "",
        password: ""
    });

    const handleUsernameChange = (e) => {
        setError(false);
        const userClone = { ...user };
        userClone.username = e.target.value;
        setUser(userClone);
    };

    const handlePasswordChange = (e) => {
        setError(false);
        const userClone = { ...user };
        userClone.password = e.target.value;
        setUser(userClone);
    };

    const postUser = async () => {
        try {
            await axios.post(config.registrationUrl, user);
            setError(false);
            return navigate(`/procedures/${user.username}`);
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
            }
        }
    }

    return (
        <div className="MainContainer">
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>Регистрация</h1>
            </div>
            <div className="EnterFieldsContainer" style={{ flexDirection: "column", height: "350px", width: "350px" }}>
                <TextField
                    label="Введите логин"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handleUsernameChange}
                    helperText={error ? "Произошла ошибка при регистрации" : ""}
                    error={error}
                />
                <TextField
                    label="Введите пароль"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handlePasswordChange}
                    helperText={error ? "Произошла ошибка при регистрации" : ""}
                    error={error}
                />
                <Button
                    variant="contained"
                    size="large"
                    color="success"
                    onClick={postUser}
                    sx={{ marginTop: "15px" }}
                >
                    Зарегистрироваться
                </Button>
            </div>
            <div className="backButton">
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/')}
                    style={{ marginTop: "210px", marginLeft: "20px" }}
                >
                    Назад
                </Button>
            </div>
        </div>
    )

}

export default RegistrationPage