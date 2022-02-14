import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// Styles
import { MyCard, MyCardContent, SubTitle } from "./pacientItem.styles";
// Interfaces
import { PacientsProps } from "../../../../shared/interfaces/interfaces";

interface PacientItemProps extends PacientsProps {
    deletePacient(id: number): void;
    editPacient(id: number): void;
}
const PacientItem = ({
    id,
    name,
    address,
    birth,
    email,
    deletePacient,
    editPacient,
}: PacientItemProps) => {
    return (
        <MyCard sx={{ minWidth: 275 }}>
            <MyCardContent>
                <div>
                    <h3>{name}</h3>
                    <SubTitle>Endereço: {address}</SubTitle>
                    <SubTitle>E-mail: {email}</SubTitle>
                    <SubTitle>Nascimento: {birth}</SubTitle>
                </div>
                <div>
                    <IconButton size="large" onClick={() => editPacient(id)}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => deletePacient(id)}
                    >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </MyCardContent>
        </MyCard>
    );
};

export default PacientItem;
