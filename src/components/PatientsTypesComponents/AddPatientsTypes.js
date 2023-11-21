import React from "react";
import { Button, TextField } from '@mui/material';
import "./AddPatientType.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from '../../config.json';
import axios from "axios";

function AddPatientType() {

    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const [patientType, setPatientType] = useState({
        id: 0,
        name: ""
    });

    const handleChange = name => event => {
        setError(false);
        setPatientType({ ...patientType, [name]: event.target.value });
    };

    const postPatientType = async () => {
        try {
            await axios.post(config.patientsTypesUrl, patientType);
            setError(false);
            return navigate('/patientsTypes');
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
            }
        }
    }

    return (
        <div className="MainContainer">
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>PatientsTypes</h1>
            </div>
            <div className="EnterFieldsContainer" >
                <t>Тип пациента</t>
                &nbsp;
                &nbsp;
                &nbsp;
                <TextField
                    label="Введите тип пациента"
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
                    onClick={postPatientType}
                >
                    Подтвердить
                </Button>
            </div>
            <div className="backButton">
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/patientsTypes')}
                >
                    Назад
                </Button>
            </div>
        </div>
    )

}

export default AddPatientType