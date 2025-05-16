import React from 'react';
import { useForm } from 'react-hook-form';
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
};

export type FormData2 = {
    totalBudget: number;
    householdIncome: number;
    householdSize: number;
    propertyType: string;
    renovationMethod: string;
};

const FinancialInformationForm: React.FC<QuestionsBudgetProps> = ({ onChange }) => {
    const { register, watch } = useForm<FormData2>();

    // Watch the form fields to get their values
    const totalBudget = watch('totalBudget');
    const householdIncome = watch('householdIncome');
    const householdSize = watch('householdSize');
    const propertyType = watch('propertyType');
    const renovationMethod = watch('renovationMethod');

    // Call the onChange function whenever any of the watched fields change
    React.useEffect(() => {
        if (
            totalBudget &&
            householdIncome &&
            householdSize &&
            propertyType &&
            renovationMethod
        ) {
            const formData = {
                totalBudget,
                householdIncome,
                householdSize,
                propertyType,
                renovationMethod
            };
            onChange(formData);
        }
    }, [totalBudget, householdIncome, householdSize, propertyType, renovationMethod, onChange]);

    return (
        <Card style={{ maxWidth: 600, margin: '20px auto', padding: 20 }}>
            <CardContent>
                <form style={{ display: 'grid', gap: '16px' }}>

                    <TextField
                        {...register('totalBudget')}
                        label="Budget de rénovation prévu (€)"
                        type="number"
                        fullWidth
                    />

                    <TextField
                        {...register('householdIncome')}
                        label="Revenu annuel du ménage (€)"
                        type="number"
                        fullWidth
                    />

                    <TextField
                        {...register('householdSize')}
                        label="Nombre d'enfants dans le ménage"
                        type="number"
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel>Type de propriété</InputLabel>
                        <Select {...register('propertyType')} defaultValue="" label="Type de propriété">
                            <MenuItem value="maison">Maison</MenuItem>
                            <MenuItem value="appartement">Appartement</MenuItem>
                            <MenuItem value="autre">Autre</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Méthode de rénovation</InputLabel>
                        <Select {...register('renovationMethod')} defaultValue="" label="Méthode de rénovation">
                            <MenuItem value="professionnel">Professionnel</MenuItem>
                            <MenuItem value="soi_même">Soi-même</MenuItem>
                            <MenuItem value="mixte">Mixte (un peu des deux)</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </CardContent>
        </Card>
    );
};

export default FinancialInformationForm;