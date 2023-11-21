import React from "react";
import { Button, TextField } from '@mui/material';
import "./AddCountry.scss"
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import config from '../../config.json';
import axios from "axios";

function EditCountry() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const [country, setCountry] = useState({
        id: 0,
        name: ""
    });

    useEffect(() => {
        const fetchCountry = async () => {
            const { data } = await axios.get(`${config.countriesUrl}/${id}`);
            setCountry(data);
        };
        fetchCountry();
    }, []);

    const handleChange = name => event => {
        setError(false);
        setCountry({ ...country, [name]: event.target.value });
    };

    const putCountry = async () => {
        try {
            await axios.put(`${config.countriesUrl}/${id}`, country);
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
                    value={country.name}
                    label="Введите страну"
                    variant="outlined"
                    sx={{ minWidth: "300px" }}
                    onChange={handleChange("name")}
                    helperText={error ? "Произошла ошибка при изменении" : ""}
                    error={error}
                >
                </TextField>
            </div>
            <div className="SubmitButton">
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={putCountry}
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

export default EditCountry