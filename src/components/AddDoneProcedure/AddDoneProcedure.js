import React from "react";
import { Button, TextField, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from '../../config.json';

function AddDoneProcedure() {

    const [error, setError] = useState(false);
    const { userName } = useParams();
    const { id } = useParams();
    const navigate = useNavigate();
    const [procedureState, setProcedureState] = useState(false);
    const [date, setDate] = useState("");

    const handleStateChange = (e) => {
        setError(false);
        if (e.target.value === 'Полная вакцинация') {
            setProcedureState(true);
        }
        else {
            setProcedureState(false);
        }
    };

    const handleDateChange = (e) => {
        setError(false);
        setDate(e.target.value);
    };

    const postDoneProcedure = async () => {
        try {
            await axios.post(`${config.doneProceduresUrl}/${id}/${procedureState}/${date}`);
            setError(false);
            return navigate(`/procedures/${userName}`);
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
            }
        }
    }

    return (
        <div className="MainContainer" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>Данные о сделанной процедуре</h1>
            </div>
            <div className="EnterFieldsContainer" style={{ flexDirection: "column", height: "170px", width: "300px" }}>
                <FormControl margin="dense">
                    <InputLabel>Статус вакцинации</InputLabel>
                    <Select
                        label="Статус вакцинации"
                        sx={{ minWidth: "250px" }}
                        onChange={handleStateChange}
                        error={error}
                    >
                        <MenuItem value={true}>Полная вакцинация</MenuItem>
                        <MenuItem value={true}>Неполная вакцинация</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Дата (YYYY-MM-DD)"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handleDateChange}
                    helperText={error ? "Произошла ошибка при добавлении" : ""}
                    error={error}
                />
            </div>
            <div className="SubmitButton">
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={postDoneProcedure}
                >
                    Подтвердить
                </Button>
            </div>
            <div className="backButton" style={{ marginTop: "320px" }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/procedures/${userName}`)}
                >
                    Назад
                </Button>
            </div>
            &nbsp;
        </div>
    )

}

export default AddDoneProcedure