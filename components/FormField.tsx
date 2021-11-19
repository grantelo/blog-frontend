import React, {FC} from 'react';
import {TextField} from "@mui/material";
import {useFormContext} from "react-hook-form";

interface FormFieldProps {
    name: string
    label: string
}

const FormField: FC<FormFieldProps> = ({name, label}) => {
    const {register, formState: { errors, touchedFields}} = useFormContext()

    return (
        <TextField
            {...register(name)}
            name={name}
            label={label}
            variant={"outlined"}
            fullWidth
            size={"small"}
            sx={{marginBottom: "20px"}}
            helperText={errors[name]?.message}
            error={!!errors[name]?.message}
        />
    );
};

export default FormField;