import React from "react";
import { Button, TextField, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import config from '../../config.json';

function AddVaccineMaker() {

    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(false);

    const [vaccineMaker, setVaccineMaker] = useState({
        id: 0,
        name: "",
        country: ""
    });

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        setVaccineMaker(vaccineMaker);
    }, [vaccineMaker]);

    const getCountries = async () => {
        await axios.get(config.countriesUrl).then(data => {
            setCountries(data.data);
        })
    }

    const handleTextChange = (e) => {
        setError(false);
        const vaccineMakerClone = { ...vaccineMaker };
        vaccineMakerClone.name = e.target.value;
        setVaccineMaker(vaccineMakerClone);
    };

    const handleSelectChange = (e) => {
        setError(false);
        const vaccineMakerClone = { ...vaccineMaker };
        vaccineMakerClone.country = e.target.value;
        setVaccineMaker(vaccineMakerClone);
    };

    const postVaccineMaker = async () => {
        try {
            await axios.post(config.vaccinesMakersUrl, vaccineMaker);
            setError(false);
            return navigate('/vaccineMakers');
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
            }
        }
    }

    return (
        <div className="MainContainer">
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>VaccinesMakers</h1>
            </div>
            <div className="EnterFieldsContainer" style={{ flexDirection: "column", height: "200px", width: "350px" }}>
                <TextField
                    label="Производитель"
                    variant="outlined"
                    margin="normal"
                    sx={{ minWidth: "300px" }}
                    onChange={handleTextChange}
                    helperText={error ? "Произошла ошибка при добавлении" : ""}
                    error={error}
                />
                <FormControl margin="normal">
                    <InputLabel>Страна</InputLabel>
                    <Select
                        label="Страна"
                        sx={{ minWidth: "250px" }}
                        onChange={handleSelectChange}
                        error={error}
                    >
                        {
                            countries.map((country) => {
                                return <MenuItem value={country.name} key={country.id}>{country.name}</MenuItem>
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
                    onClick={postVaccineMaker}
                >
                    Подтвердить
                </Button>
            </div>
            <div className="backButton" style={{ marginTop: "290px" }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/vaccineMakers')}
                >
                    Назад
                </Button>
            </div>
        </div>
    )
}

export default AddVaccineMaker