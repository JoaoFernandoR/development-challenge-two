import { FormControl, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import api from "../../../api/api";
//Styles
import {
    MainSection,
    MyContainer,
    MyButton,
    Row,
    SuccessMessage,
} from "./container.styles";

const Container = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [birth, setBirth] = useState("");

    useEffect(() => {
        // const callApi = async () => {
        //     const { data } = await api.get("/pacients");
        //     console.log(data.Items);
        // };
        // callApi();
    }, []);

    const addPacient = (e: FormEvent) => {
        e.preventDefault();

        postPacient();
    };

    const postPacient = async () => {
        const response = await api.post("/pacients", {});
    };

    return (
        <MainSection>
            <MyContainer>
                <form onSubmit={addPacient}>
                    <Row>
                        <TextField
                            id="standard-basic"
                            label="Nome"
                            variant="standard"
                            color="success"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            style={{ width: "100%" }}
                        />
                        <TextField
                            label="Email"
                            variant="standard"
                            color="success"
                            required
                            type={"email"}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            style={{ width: "100%" }}
                        />
                    </Row>
                    <Row>
                        <TextField
                            id="standard-basic"
                            label="Endereço"
                            variant="standard"
                            color="success"
                            required
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            style={{ width: "100%" }}
                        />
                        <TextField
                            id="standard-basic"
                            label="Nascimento"
                            variant="standard"
                            color="success"
                            required
                            value={birth}
                            onChange={(event) => setBirth(event.target.value)}
                            style={{ width: "100%" }}
                        />
                    </Row>
                    <SuccessMessage>
                        paciente criado com successo
                    </SuccessMessage>
                    <MyButton variant="contained" type="submit">
                        Adicionar
                    </MyButton>
                </form>
            </MyContainer>
        </MainSection>
    );
};

export default Container;
