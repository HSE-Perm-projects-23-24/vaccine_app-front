import React from "react";
import { Button, TextField } from '@mui/material';
import "./AddCountry.scss"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import config from '../../config.json';

function AddCountry() {

    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const [country, setCountry] = useState({
        id: 0,
        name: ""
    });

    const handleChange = name => event => {
        setError(false);
        setCountry({ ...country, [name]: event.target.value });
    };

    const postCountry = async () => {
        try {
            await axios.post(config.countriesUrl, country);
            setError(false);
            return navigate('/countries');
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
            }
        }
    }

    return (
        <div className="MainContainer">
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>Countries</h1>
            </div>
            <div className="EnterFieldsContainer" style={{ width: "350px", height: "120px" }}>
                <TextField
                    label="Введите страну"
                    variant="outlined"
                    sx={{ minWidth: "300px" }}
                    onChange={handleChange("name")}
                    helperText={error ? "Произошла ошибка при добавлении" : ""}
                    error={error}
                >
                </TextField>
            </div>
            <div className="SubmitButton">
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={postCountry}
                >
                    Подтвердить
                </Button>
            </div>
            <div className="backButton" style={{ marginTop: "375px", marginLeft: "15px" }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/countries')}
                >
                    Назад
                </Button>
            </div>
        </div>
    )

}

export default AddCountry