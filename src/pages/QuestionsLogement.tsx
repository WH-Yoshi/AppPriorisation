import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Card,
    CardContent,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';

type QuestionsLogementProps = {
    onChange: (data: FormData1) => void;
};

export type FormData1 = {
    heatingType: string;
    averageTemperature: string;
    programmableThermostat: string;
    windowType: string;
    wallInsulation: string;
    roofInsulation: string;
    floorInsulation: string;
};

const QuestionsLogement: React.FC<QuestionsLogementProps> = ({ onChange }) => {
    const { register, watch } = useForm<FormData1>();

    const heatingType = watch('heatingType');
    const averageTemperature = watch('averageTemperature');
    const programmableThermostat = watch('programmableThermostat');
    const windowType = watch('windowType');
    const wallInsulation = watch('wallInsulation');
    const roofInsulation = watch('roofInsulation');
    const floorInsulation = watch('floorInsulation');

    React.useEffect(() => {
        if (
            heatingType &&
            averageTemperature &&
            programmableThermostat &&
            windowType &&
            wallInsulation &&
            roofInsulation &&
            floorInsulation
        ) {
            const formData = {
                heatingType,
                averageTemperature,
                programmableThermostat,
                windowType,
                wallInsulation,
                roofInsulation,
                floorInsulation
            };
            onChange(formData);
        }
    }, [
        heatingType,
        averageTemperature,
        programmableThermostat,
        windowType,
        wallInsulation,
        roofInsulation,
        floorInsulation,
        onChange
    ]);

    return (
        <Card style={{ maxWidth: 600, margin: '20px auto', padding: 20 }}>
            <CardContent>
                <form style={{ display: 'grid', gap: '16px' }}>

                    <FormControl fullWidth>
                        <InputLabel>Type de chauffage</InputLabel>
                        <Select {...register('heatingType')} defaultValue="" label="Type de chauffage">
                            <MenuItem value="gaz">Gaz</MenuItem>
                            <MenuItem value="électricité">Électricité</MenuItem>
                            <MenuItem value="mazout">Mazout</MenuItem>
                            <MenuItem value="pompe_a_chaleur">Pompe à chaleur</MenuItem>
                            <MenuItem value="bois">Bois</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Température moyenne en hiver</InputLabel>
                        <Select {...register('averageTemperature')} defaultValue="" label="Température moyenne en hiver">
                            <MenuItem value="<18">Moins de 18°C</MenuItem>
                            <MenuItem value="18-20">Entre 18°C et 20°C</MenuItem>
                            <MenuItem value=">20">Plus de 20°C</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Thermostat programmable</InputLabel>
                        <Select {...register('programmableThermostat')} defaultValue="" label="Thermostat programmable">
                            <MenuItem value="oui">Oui</MenuItem>
                            <MenuItem value="non">Non</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Type de fenêtres</InputLabel>
                        <Select {...register('windowType')} defaultValue="" label="Type de fenêtres">
                            <MenuItem value="simple_vitrage">Simple vitrage</MenuItem>
                            <MenuItem value="double_vitrage">Double vitrage</MenuItem>
                            <MenuItem value="triple_vitrage">Triple vitrage</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Isolation des murs</InputLabel>
                        <Select {...register('wallInsulation')} defaultValue="" label="Isolation des murs">
                            <MenuItem value="oui">Oui</MenuItem>
                            <MenuItem value="non">Non</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Isolation du toit</InputLabel>
                        <Select {...register('roofInsulation')} defaultValue="" label="Isolation du toit">
                            <MenuItem value="oui">Oui</MenuItem>
                            <MenuItem value="non">Non</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Isolation du sol</InputLabel>
                        <Select {...register('floorInsulation')} defaultValue="" label="Isolation du sol">
                            <MenuItem value="oui">Oui</MenuItem>
                            <MenuItem value="non">Non</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </CardContent>
        </Card>
    );
};

export default QuestionsLogement;
