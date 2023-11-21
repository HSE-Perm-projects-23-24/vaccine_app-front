import React from "react";
import { Button, TextField, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddProcedure.scss";
import axios from "axios";
import config from '../../config.json';

function AddProcedure() {

    const [error, setError] = useState(false);
    const { userName } = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(0);
    const [patientTypes, setPatientTypes] = useState([]);
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        getUserId();
    }, [userId]);

    const getUserId = async () => {
        await axios.get(`${config.userUrl}/${userName}`).then(data => {
            setUserId(data.data[0].id);
        })
    }

    const [procedure, setProcedure] = useState({
        id: 0,
        surname: "",
        name: "",
        patronymic: "",
        patientType: "",
        vaccine: "",
        date: "",
        userId: `${userId}`
    });

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async () => {
        await axios.get(config.patientsTypesUrl).then(data => {
            setPatientTypes(data.data);
        })
    }

    useEffect(() => {
        getVaccines();
    }, []);

    const getVaccines = async () => {
        await axios.get(config.vaccinesUrl).then(data => {
            setVaccines(data.data);
        })
    }

    useEffect(() => {
        setProcedure(procedure);
    }, [procedure]);

    const handleSurnameChange = (e) => {
        setError(false);
        const procedureClone = { ...procedure };
        procedureClone.surname = e.target.value;
        setProcedure(procedureClone);
    };

    const handleNameChange = (e) => {
        setError(false);
        const procedureClone = { ...procedure };
        procedureClone.name = e.target.value;
        setProcedure(procedureClone);
    };

    const handlePatronymicChange = (e) => {
        setError(false);
        const procedureClone = { ...procedure };
        procedureClone.patronymic = e.target.value;
        setProcedure(procedureClone);
    };

    const handlePatientTypeChange = (e) => {
        setError(false);
        const procedureClone = { ...procedure };
        procedureClone.patientType = e.target.value;
        setProcedure(procedureClone);
    };

    const handleVaccineChange = (e) => {
        setError(false);
        const procedureClone = { ...procedure };
        procedureClone.vaccine = e.target.value;
        setProcedure(procedureClone);
    };

    const handleDateChange = (e) => {
        setError(false);
        const procedureClone = { ...procedure };
        procedureClone.date = e.target.value;
        setProcedure(procedureClone);
    };

    const postProcedure = async () => {
        try {
            await axios.post(`${config.proceduresUrl}/${userId}`, procedure);
            setError(false);
            return navigate(`/procedures/${userName}`);
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
            }
        }
    }

    return (
        <div className="MainContainer" style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>Добавить процедуру</h1>
            </div>
            <div className="EnterFieldsContainer" style={{ flexDirection: "column", height: "520px", width: "850px" }}>
                <TextField
                    label="Фамилия"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handleSurnameChange}
                    helperText={error ? "Произошла ошибка при добавлении" : ""}
                    error={error}
                />
                <TextField
                    label="Имя"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handleNameChange}
                    helperText={error ? "Произошла ошибка при добавлении" : ""}
                    error={error}
                />
                <TextField
                    label="Отчество"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handlePatronymicChange}
                    helperText={error ? "Произошла ошибка при добавлении" : ""}
                    error={error}
                />
                <FormControl margin="dense">
                    <InputLabel>Тип пациента</InputLabel>
                    <Select
                        label="Тип пациента"
                        sx={{ minWidth: "250px" }}
                        onChange={handlePatientTypeChange}
                        error={error}
                    >
                        {
                            patientTypes.map((patientsType) => {
                                return <MenuItem value={patientsType.name}
                                    key={patientsType.id}>{patientsType.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel>Вакцина</InputLabel>
                    <Select
                        label="Вакцина"
                        sx={{ minWidth: "250px" }}
                        onChange={handleVaccineChange}
                        error={error}
                    >
                        {
                            vaccines.map((vaccine) => {
                                return <MenuItem value={vaccine.name} key={vaccine.id}>{vaccine.name}</MenuItem>
                            })
                        }
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
                    onClick={postProcedure}
                >
                    Подтвердить
                </Button>
            </div>
            <div className="backButton">
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/procedures/${userName}`)}
                    sx={{marginTop: "-500px"}}
                >
                    Назад
                </Button>
            </div>
            &nbsp;
        </div>
    )

}

export default AddProcedure