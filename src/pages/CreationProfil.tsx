import { useState } from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import * as React from "react";

interface CreationProfilProps {
    onOptionChange: (option: string) => void;
}

export default function CreationProfil({ onOptionChange }: CreationProfilProps) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        onOptionChange(value);
    };

    const options = {
        "Ecolo": "Je veux réduire mon empreinte écologique.",
        "Economie": "Je veux économiser de l’argent à court terme.",
        "Valorisation": "Je veux valoriser mon bien.",
        "Confort": "Je veux améliorer mon confort et bien-être."
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