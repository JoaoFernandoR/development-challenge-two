import { TextField } from "@mui/material";

interface MyinputProps {
    label: string;
    value: string;
    setValue(value: string): void;
    editMode: boolean;
}
const MyInput = ({ editMode, label, setValue, value }: MyinputProps) => {
    return (
        <TextField
            label={label}
            variant="standard"
            required
            value={value}
            onChange={(event) => setValue(event.target.value)}
            focused={editMode ? true : false}
            style={{ width: "100%" }}
        />
    );
};

export default MyInput;
