import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import "./EditVaccine.scss"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from '../../config.json';

function AddVaccine() {

    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [makers, setMakers] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        getMakers();
    }, []);

    const getMakers = async () => {
        await axios.get(config.vaccinesMakersUrl).then(data => {
            setMakers(data.data);
        })
    }

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async () => {
        await axios.get(config.vaccinesTypesUrl).then(data => {
            setTypes(data.data);
        })
    }

    const [vaccine, setVaccine] = useState({
        id: 0,
        name: "",
        maker: "",
        type: ""
    });

    const handleVaccineNameChange = (e) => {
        setError(false);
        const vaccineClone = { ...vaccine };
        vaccineClone.name = e.target.value;
        setVaccine(vaccineClone);
    };

    const handleVaccineMakerChange = (e) => {
        setError(false);
        const vaccineClone = { ...vaccine };
        vaccineClone.maker = e.target.value;
        setVaccine(vaccineClone);
    };

    const handleVaccineTypeChange = (e) => {
        setError(false);
        const vaccineClone = { ...vaccine };
        vaccineClone.type = e.target.value;
        setVaccine(vaccineClone);
    };

    const postVaccine = async () => {
        try {
            await axios.post(config.vaccinesUrl, vaccine);
            setError(false);
            return navigate('/vaccines');
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
            }
        }
    }

    return (
        <div className="MainContainer">
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>Vaccines</h1>
            </div>
            <div className="EnterFieldsContainer" style={{ flexDirection: "column" }}>
                <TextField
                    label="Вакцина"
                    variant="outlined"
                    margin="dense"
                    sx={{ minWidth: "350px" }}
                    onChange={handleVaccineNameChange}
                    helperText={error ? "Произошла ошибка при добавлении" : ""}
                    error={error}
                />
                <FormControl margin="dense">
                    <InputLabel>Производитель</InputLabel>
                    <Select
                        label="Производитель"
                        sx={{ minWidth: "350px" }}
                        onChange={handleVaccineMakerChange}
                        error={error}
                    >
                        {
                            makers.map((maker) => {
                                return <MenuItem value={maker.name}
                                    key={maker.id}>{maker.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel>Тип вакцины</InputLabel>
                    <Select
                        label="Тип вакцины"
                        sx={{ minWidth: "350px" }}
                        onChange={handleVaccineTypeChange}
                        error={error}
                    >
                        {
                            types.map((type) => {
                                return <MenuItem value={type.name}
                                    key={type.id}>{type.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div className="SubmitButton">
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={postVaccine}
                >
                    Подтвердить
                </Button>
            </div>
            <div className="backButton">
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/vaccines')}
                >
                    Назад
                </Button>
            </div>
        </div>
    )

}

export default AddVaccine