import React from "react";
import { Button, TextField, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProcedure.scss"
import axios from "axios";
import config from '../../config.json';

function EditProcedure() {

    const { userName } = useParams();
    const { id } = useParams();
    const [userId, setUserId] = useState(0);
    const [error, setError] = useState(false);
    const [patientTypes, setPatientTypes] = useState([]);
    const [vaccines, setVaccines] = useState([]);
    const navigate = useNavigate();

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
        const fetchProcedure = async () => {
            const { data } = await axios.get(`${config.proceduresUrl}/${id}/getSingle`);
            const newProcedure = {
                id: data.id,
                surname: data.patient.surname,
                name: data.patient.name,
                patronymic: data.patient.patronymic,
                patientType: data.patient.type.name,
                vaccine: data.vaccine.name,
                date: data.date
            };
            setProcedure(newProcedure);
        };
        fetchProcedure();
    }, []);

    useEffect(() => {
        getUserId();
    }, [userId]);

    const getUserId = async () => {
        await axios.get(`${config.userUrl}/${userName}`).then(data => {
            setUserId(data.data[0].id);
        })
    }

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

    const editProcedure = async () => {
        try {
            await axios.put(`${config.proceduresUrl}/${id}`, procedure);
            setError(false);
            return navigate(`/procedures/${userName}`);
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
            }
        }
    }

    return (
        <div className="MainContainer">
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>Редактировать процедуру</h1>
            </div>
            <div className="EnterFieldsContainer" style={{ flexDirection: "column", height: "520px", width: "850px" }}>
                <TextField
                    value={procedure.surname}
                    label="Фамилия"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handleSurnameChange}
                    helperText={error ? "Произошла ошибка при редактировании" : ""}
                    error={error}
                />
                <TextField
                    value={procedure.name}
                    label="Имя"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handleNameChange}
                    helperText={error ? "Произошла ошибка при редактировании" : ""}
                    error={error}
                />
                <TextField
                    value={procedure.patronymic}
                    label="Отчество"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handlePatronymicChange}
                    helperText={error ? "Произошла ошибка при редактировании" : ""}
                    error={error}
                />
                <FormControl margin="dense">
                    <InputLabel>Тип пациента</InputLabel>
                    <Select
                        value={procedure.patientType}
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
                        value={procedure.vaccine}
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
                    value={procedure.date.substring(0, 10)}
                    label="Дата (YYYY-MM-DD)"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "250px" }}
                    onChange={handleDateChange}
                    helperText={error ? "Произошла ошибка при редактировании" : ""}
                    error={error}
                />
            </div>
            <div className="SubmitButton">
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={editProcedure}
                >
                    Подтвердить
                </Button>
            </div>
            <div className="backButton">
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/procedures/${userName}`)}
                >
                    Назад

                </Button>
            </div>
        </div>
    )

}

export default EditProcedure