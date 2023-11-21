import React from "react";
import { Button, TextField } from '@mui/material';
import "./AddPatientType.scss"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from '../../config.json';
import axios from "axios";

function EditPatientType() {

    const { id } = useParams();
    const { ptName } = useParams();
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const [patientType, setPatientType] = useState({
        id: id,
        name: ptName
    });

    const handleChange = name => event => {
        setError(false);
        setPatientType({ ...patientType, [name]: event.target.value });
    };

    const putPatientType = async () => {
        try {
            await axios.put(`${config.patientsTypesUrl}/${id}`, patientType);
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
                    value={patientType.name}
                    variant="outlined"
                    onChange={handleChange("name")}
                    error={error}
                    helperText={error ? "Произошла ошибка при изменении" : ""}
                />
            </div>
            <div className="SubmitButton">
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={putPatientType}
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

export default EditPatientType