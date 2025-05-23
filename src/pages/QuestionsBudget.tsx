import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';

type QuestionsBudgetProps = {
    onChange: (data: FormData2) => void;
    initialData?: FormData2;
};

export type FormData2 = {
    totalBudget: string;
    householdIncome: string;
    childNumber: string;
    propertyType: string;
    renovationMethod: string;
    floorNumber: string;
};

const QuestionsBudget: React.FC<QuestionsBudgetProps> = ({ onChange, initialData }) => {
    const [formData, setFormData] = useState<FormData2>(initialData || {
        totalBudget: '',
        householdIncome: '',
        childNumber: '',
        propertyType: '',
        renovationMethod: '',
        floorNumber: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (field: keyof FormData2, value: string) => {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);

        // Vérifier que tous les champs sont remplis avant d'appeler onChange
        const allFieldsFilled = Object.values(updatedData).every(val => val !== '');
        if (allFieldsFilled) {
            onChange(updatedData);
        }
    };

    return (
        <>
            <article className="explanation">
                <h2>Questions sur le budget</h2>
                <p>Répondez aux questions suivantes pour nous aider à calculer précisément les primes éligibles.</p>
                <p>Certaines de ces valeurs sont reprises sur votre certificat de performance énergétique (PEB). Servez-vous en !</p>
            </article>
            <Card style={{ maxWidth: 600, margin: 'auto', padding: 20, width: '100%', boxShadow: 'none' }}>
                <CardContent>
                    <form style={{ display: 'grid', gap: '16px' }}>

                        <TextField
                            value={formData.totalBudget}
                            onChange={(e) => handleChange('totalBudget', e.target.value)}
                            label="Budget de rénovation prévu (€)"
                            type="number"
                            fullWidth
                        />

                        <TextField
                            value={formData.householdIncome}
                            onChange={(e) => handleChange('householdIncome', e.target.value)}
                            label="Revenu annuel du ménage (€)"
                            type="number"
                            fullWidth
                        />

                        <TextField
                            value={formData.childNumber}
                            onChange={(e) => handleChange('childNumber', e.target.value)}
                            label="Nombre d'enfants dans le ménage"
                            type="number"
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Type de propriété</InputLabel>
                            <Select
                                value={formData.propertyType}
                                onChange={(e) => handleChange('propertyType', e.target.value as string)}
                                label="Type de propriété"
                            >
                                <MenuItem value="maison">Maison</MenuItem>
                                <MenuItem value="appartement">Appartement</MenuItem>
                                <MenuItem value="autre">Autre</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Nombre d'étages habités</InputLabel>
                            <Select
                                value={formData.floorNumber}
                                onChange={(e) => handleChange('floorNumber', e.target.value as string)}
                                label="Nombre d'étages habités"
                            >
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Méthode de rénovation</InputLabel>
                            <Select
                                value={formData.renovationMethod}
                                onChange={(e) => handleChange('renovationMethod', e.target.value as string)}
                                label="Méthode de rénovation"
                            >
                                <MenuItem value="professionnel">Professionnel</MenuItem>
                                <MenuItem value="soi_meme">Soi-même</MenuItem>
                                <MenuItem value="mixte">Mixte (un peu des deux)</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default QuestionsBudget;