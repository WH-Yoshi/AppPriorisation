import React, {useEffect, useState} from 'react';
import {Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';

type QuestionsLogementProps = {
    onChange: (data: FormData1) => void;
    initialData?: FormData1;
};

export type FormData1 = {
    surface: string;
    roofType: string;
    heatingType: string;
    averageTemperature: string;
    programmableThermostat: string;
    windowType: string;
    wallInsulation: string;
    roofInsulation: string;
    floorInsulation: string;
};

const QuestionsHousing: React.FC<QuestionsLogementProps> = ({ onChange, initialData }) => {
    const [formData, setFormData] = useState<FormData1>(initialData || {
        surface: '',
        roofType: '',
        heatingType: '',
        averageTemperature: '',
        programmableThermostat: '',
        windowType: '',
        wallInsulation: '',
        roofInsulation: '',
        floorInsulation: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (field: keyof FormData1, value: string) => {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);

        const allFieldsFilled = Object.values(updatedData).every(value => value !== '');
        if (allFieldsFilled) {
            onChange(updatedData);
        }
    };

    return (
        <>
            <article className="explanation">
                <h2>Questions sur le logement</h2>
                <p>
                    Répondez aux questions suivantes pour nous aider à mieux comprendre votre logement et
                    vos habitudes de consommation d'énergie.
                </p>
                <p>
                    Certaines de ces valeurs sont reprises sur votre certificat de performance énergétique (PEB). Servez-vous en !
                </p>
            </article>
            <Card style={{ maxWidth: 600, margin: '20px auto', padding: 20, width: '100%', boxShadow: 'none' }}>
                <CardContent>
                    <form style={{ display: 'grid', gap: '16px' }}>

                        <TextField
                            value={formData.surface}
                            onChange={(e) => handleChange('surface', e.target.value)}
                            label="Surface de votre logement (en m²)"
                            type="number"
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Type de toiture</InputLabel>
                            <Select
                                value={formData.roofType}
                                onChange={(e) => handleChange('roofType', e.target.value as string)}
                                label="Type de toiture"
                            >
                                <MenuItem value="plat">Toit Plat</MenuItem>
                                <MenuItem value="simple">Pente Simple</MenuItem>
                                <MenuItem value="double">Pente Double</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Type de chauffage</InputLabel>
                            <Select
                                value={formData.heatingType}
                                onChange={(e) => handleChange('heatingType', e.target.value as string)}
                                label="Type de chauffage"
                            >
                                <MenuItem value="gaz">Gaz</MenuItem>
                                <MenuItem value="electricite">Électricité</MenuItem>
                                <MenuItem value="mazout">Mazout</MenuItem>
                                <MenuItem value="pompe_a_chaleur">Pompe à chaleur</MenuItem>
                                <MenuItem value="bois">Bois</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Température moyenne en hiver</InputLabel>
                            <Select
                                value={formData.averageTemperature}
                                onChange={(e) => handleChange('averageTemperature', e.target.value as string)}
                                label="Température moyenne en hiver"
                            >
                                <MenuItem value="<18">Moins de 18°C</MenuItem>
                                <MenuItem value="18-20">Entre 18°C et 20°C</MenuItem>
                                <MenuItem value=">20">Plus de 20°C</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Possédez-vous un thermostat programmable ?</InputLabel>
                            <Select
                                value={formData.programmableThermostat}
                                onChange={(e) => handleChange('programmableThermostat', e.target.value as string)}
                                label="Possédez-vous un thermostat programmable ?"
                            >
                                <MenuItem value="oui">Oui</MenuItem>
                                <MenuItem value="non">Non</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Type de fenêtres</InputLabel>
                            <Select
                                value={formData.windowType}
                                onChange={(e) => handleChange('windowType', e.target.value as string)}
                                label="Type de fenêtres"
                            >
                                <MenuItem value="simple_vitrage">Simple vitrage</MenuItem>
                                <MenuItem value="double_vitrage">Double vitrage</MenuItem>
                                <MenuItem value="triple_vitrage">Triple vitrage</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Isolation des murs</InputLabel>
                            <Select
                                value={formData.wallInsulation}
                                onChange={(e) => handleChange('wallInsulation', e.target.value as string)}
                                label="Isolation des murs"
                            >
                                <MenuItem value="oui">Oui</MenuItem>
                                <MenuItem value="non">Non</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Isolation du toit</InputLabel>
                            <Select
                                value={formData.roofInsulation}
                                onChange={(e) => handleChange('roofInsulation', e.target.value as string)}
                                label="Isolation du toit"
                            >
                                <MenuItem value="oui">Oui</MenuItem>
                                <MenuItem value="non">Non</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Isolation du sol</InputLabel>
                            <Select
                                value={formData.floorInsulation}
                                onChange={(e) => handleChange('floorInsulation', e.target.value as string)}
                                label="Isolation du sol"
                            >
                                <MenuItem value="oui">Oui</MenuItem>
                                <MenuItem value="non">Non</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default QuestionsHousing;