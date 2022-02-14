import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MyCard = styled(Card)`
    margin-bottom: 45px;
    background-color: rgba(255, 255, 255, 0.9);
`;

export const MyCardContent = styled(CardContent)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SubTitle = styled("h5")`
    color: #887f81;
    margin-top: 4px;
`;
