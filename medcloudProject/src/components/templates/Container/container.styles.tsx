import { styled } from "@mui/material/styles";
import { Button, Container } from "@mui/material";

export const MainSection = styled("section")`
    padding-top: 60px;
`;

export const MyContainer = styled(Container)`
    display: flex;
    flex-direction: column;
`;

export const MyButton = styled(Button)`
    display: flex;
    margin: 18px auto 12px auto;
`;

export const Row = styled("div")`
    display: flex;
    gap: 16px;
`;

export const SuccessMessage = styled("p")`
    color: #117711;
    text-align: center;
    font-size: 16px;
`;
