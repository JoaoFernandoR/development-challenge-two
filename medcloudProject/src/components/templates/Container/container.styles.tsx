import { styled } from "@mui/material/styles";
import { Button, Container } from "@mui/material";

export const MainSection = styled("section")`
    padding-top: 60px;
    min-height: 100vh;
    background: rgb(2, 0, 36);
    background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(184, 190, 231, 1) 0%,
        rgba(163, 170, 218, 1) 97%
    );
`;

export const MyContainer = styled(Container)`
    display: flex;
    flex-direction: column;
`;

export const MyButton = styled(Button)`
    display: flex;
    margin: 18px auto 26px auto;
`;

export const Row = styled("div")`
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
`;

export const PacientsSection = styled("section")``;
