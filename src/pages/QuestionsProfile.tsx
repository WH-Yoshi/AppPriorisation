import {useEffect, useState} from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import * as React from "react";

interface CreationProfilProps {
    onOptionChange: (option: string) => void;
    initialValue: string;
}

export default function QuestionsProfile({ onOptionChange, initialValue }: CreationProfilProps) {
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        setSelectedOption(initialValue)
    }, [initialValue]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        onOptionChange(value);
    };

    const options = {
        "Eco-friendly": "Je veux réduire mon empreinte écologique.",
        "Economy": "Je veux économiser de l’argent.",
        "Valuation": "Je veux valoriser mon bien.",
        "Comfort": "Je veux améliorer mon confort et bien-être."
    };

    return (
        <section id="creation-profil">
            <section className="questions">
                <article className="title-question">
                    <h2>Que recherchez-vous ?</h2>
                </article>
                <RadioGroup onChange={handleRadioChange} value={selectedOption}>
                    {Object.entries(options).map(([key, value], index) => (
                        <div key={index} className="radio-option">
                            <FormControlLabel
                                value={key}
                                id={`option-${index}`}
                                control={
                                    <Radio sx={{
                                        color: "black",
                                        "&.Mui-checked": { color: "black" },
                                        "& .MuiSvgIcon-root": { fontSize: 28 },
                                    }} />
                                }
                                label={value}
                            />
                        </div>
                    ))}
                </RadioGroup>
            </section>
        </section>
    );
}