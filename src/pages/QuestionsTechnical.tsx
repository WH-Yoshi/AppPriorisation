import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';

type QuestionsTechniquesProps = {
    onChange: (data: FormData3) => void;
    initialData?: FormData3;
};

export type FormData3 = {
    hasSolarPanels: string;
    hasWaterHeater: string;
    boilerType: string;
    ventilationType: string;
};

const QuestionsTechnical: React.FC<QuestionsTechniquesProps> = ({ onChange, initialData }) => {
    const [formData, setFormData] = useState<FormData3>(initialData || {
        hasSolarPanels: '',
        hasWaterHeater: '',
        boilerType: '',
        ventilationType: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (field: keyof FormData3, value: string) => {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);
        onChange(updatedData);
    };

    return (
        <>
            <article className="explanation">
                <h2>Questions techniques</h2>
                <p>Répondez aux questions suivantes pour nous aider à évaluer les caractéristiques techniques de votre logement.</p>
            </article>
            <Card style={{ maxWidth: 600, margin: 'auto', padding: 20, width: '100%', boxShadow: 'none' }}>
                <CardContent>
                    <form style={{ display: 'grid', gap: '16px' }}>

                        <FormControl fullWidth>
                            <InputLabel>Présence de panneaux solaires</InputLabel>
                            <Select
                                value={formData.hasSolarPanels}
                                onChange={(e) => handleChange('hasSolarPanels', e.target.value as string)}
                                label="Présence de panneaux solaires"
                            >
                                <MenuItem value="oui">Oui</MenuItem>
                                <MenuItem value="non">Non</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Présence d'un chauffe-eau</InputLabel>
                            <Select
                                value={formData.hasWaterHeater}
                                onChange={(e) => handleChange('hasWaterHeater', e.target.value as string)}
                                label="Présence d'un chauffe-eau"
                            >
                                <MenuItem value="oui">Oui</MenuItem>
                                <MenuItem value="non">Non</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Type de boiler</InputLabel>
                            <Select
                                value={formData.boilerType}
                                onChange={(e) => handleChange('boilerType', e.target.value as string)}
                                label="Type de boiler"
                            >
                                <MenuItem value="gaz">Gaz</MenuItem>
                                <MenuItem value="electrique">Électrique</MenuItem>
                                <MenuItem value="pompe_a_chaleur">Pompe à chaleur</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Type de ventilation</InputLabel>
                            <Select
                                value={formData.ventilationType}
                                onChange={(e) => handleChange('ventilationType', e.target.value as string)}
                                label="Type de ventilation"
                            >
                                <MenuItem value="naturelle">Naturelle</MenuItem>
                                <MenuItem value="mécanique">Mécanique</MenuItem>
                                <MenuItem value="double_flux">Double flux</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default QuestionsTechnical;