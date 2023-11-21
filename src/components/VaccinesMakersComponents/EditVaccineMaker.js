import React from "react";
import { Button, TextField, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from "axios";
import config from '../../config.json';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

function EditVaccineMaker() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(false);

    const [vaccineMaker, setVaccineMaker] = useState({
        id: 0,
        name: "",
        country: ""
    })

    useEffect(() => {
        const fetchVaccineMaker = async () => {
            const { data } = await axios.get(`${config.vaccinesMakersUrl}/${id}`);
            const newVaccineMaker = { id: data.id, name: data.name, country: data.country.name };
            setVaccineMaker(newVaccineMaker);
        };
        fetchVaccineMaker();
    }, []);

    useEffect(() => {
        getCountries();
    }, []);

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

    const putVaccineMaker = async () => {
        try {
            await axios.put(`${config.vaccinesMakersUrl}/${id}`, vaccineMaker);
            setError(false);
            return navigate('/vaccineMakers');
        } catch (e) {
            if (e.response && e.response.data) {
                setError(true);
                console.log(vaccineMaker)
            }
        }
    }

    return (
        <div className="MainContainer">
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>VaccinesMakers</h1>
            </div>
            <div className="EnterFieldsContainer" style={{ flexDirection: "column", height: "200px", width: "650px" }}>
                <TextField
                    value={vaccineMaker.name}
                    label="Производитель"
                    variant="outlined"
                    margin="normal"
                    sx={{ minWidth: "600px" }}
                    onChange={handleTextChange}
                    helperText={error ? "Произошла ошибка при изменении" : ""}
                    error={error}
                />
                <FormControl margin="normal">
                    <InputLabel>Страна</InputLabel>
                    <Select
                        value={vaccineMaker.country}
                        label="Страна"
                        sx={{ minWidth: "300px" }}
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
                    onClick={putVaccineMaker}
                >
                    Подтвердить
                </Button>
            </div>
            <div className="backButton" style={{ marginTop: "300px" }}>
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

export default EditVaccineMaker