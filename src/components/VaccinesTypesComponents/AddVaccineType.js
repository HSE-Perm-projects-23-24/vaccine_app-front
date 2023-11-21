import React from "react";
import { Button, TextField } from '@mui/material';
import "./EditVaccineType.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import config from '../../config.json';
import axios from "axios";

function AddVaccineType() {

    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const [vaccineType, setVaccineType] = useState({
        id: 0,
        name: ""
    });

    const handleChange = name => event => {
        setError(false);
        setVaccineType({ ...vaccineType, [name]: event.target.value });
    };

    const postVaccineType = async () => {
        try {
            await axios.post(config.vaccinesTypesUrl, vaccineType);
            setError(false);
            return navigate('/vaccineTypes');
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
            }
        }
    }

    return (
        <div className="MainContainer">
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>VaccinesTypes</h1>
            </div>
            <div className="EnterFieldsContainer" >
                <t>Тип вакцины</t>
                &nbsp;
                &nbsp;
                &nbsp;
                <TextField
                    label="Введите тип вакцины"
                    variant="outlined"
                    onChange={handleChange("name")}
                    error={error}
                    helperText={error ? "Произошла ошибка при добавлении" : ""}
                />
            </div>
            <div className="SubmitButton">
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={postVaccineType}
                >
                    Подтвердить
                </Button>
            </div>
            <div className="backButton">
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/vaccineTypes')}
                >
                    Назад
                </Button>
            </div>
        </div>
    )

}

export default AddVaccineType