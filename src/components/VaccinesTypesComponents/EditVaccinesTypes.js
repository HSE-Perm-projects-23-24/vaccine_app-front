import React from "react";
import { Button, TextField } from '@mui/material';
import "./EditVaccineType.scss"
import { useNavigate, useParams } from "react-router-dom";
import config from '../../config.json';
import axios from "axios";
import { useState } from "react";

function EditVaccinesTypes() {

    const { id } = useParams();
    const { vtName } = useParams();
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const [vaccineType, setVaccineType] = useState({
        id: id,
        name: vtName
    });

    const handleChange = name => event => {
        setError(false);
        setVaccineType({ ...vaccineType, [name]: event.target.value });
    };

    const putVaccineType = async () => {
        try {
            await axios.put(`${config.vaccinesTypesUrl}/${id}`, vaccineType);
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
                    value={vaccineType.name}
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
                    onClick={putVaccineType}
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

export default EditVaccinesTypes