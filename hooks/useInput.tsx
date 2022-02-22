import React, {ChangeEvent} from 'react';

const useInput = (initialValue?: string) => {
    const [value, setValue] = React.useState<string>(initialValue || "")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return {
        value,
        onChange: handleChange
    }
};

export default useInput;
