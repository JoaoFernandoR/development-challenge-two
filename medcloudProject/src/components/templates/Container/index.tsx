import { TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import api from "../../../api/api";
import { v4 } from "uuid";
import InputMask from "react-input-mask";
// interfaces
import { PacientsProps } from "../../../shared/interfaces/interfaces";

import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
//Styles
import {
    MainSection,
    MyContainer,
    MyButton,
    Row,
    PacientsSection,
} from "./container.styles";
import PacientItem from "./PacientItem";

const Container = () => {
    const [myPacients, setMyPacients] = useState([
        {
            name: "bla",
            email: "bla@gmail.com",
            address: "aeaeuehauheaueha",
            birth: "18/123/1231",
            id: 25,
        },
        {
            name: "bla",
            email: "bla@gmail.com",
            address: "aeaeuehauheaueha",
            birth: "18/123/1231",
            id: 5,
        },
        {
            name: "bla",
            email: "bla@gmail.com",
            address: "aeaeuehauheaueha",
            birth: "18/123/1231",
            id: 19,
        },
    ]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [birth, setBirth] = useState("");
    const [birthError, setBirthError] = useState(false);

    useEffect(() => {
        // const callApi = async () => {
        //     const { data } = await api.get("/pacients");
        //     setMyPacients(data.Items);
        // };
        // callApi();
    }, []);

    const addPacient = (e: FormEvent) => {
        e.preventDefault();

        if (birth.includes("_")) {
            setBirthError(true);
            setTimeout(() => setBirthError(false), 2000);
        } else {
            postPacient();
        }
    };

    const postPacient = async () => {
        const capitalizedName =
            name[0].toUpperCase() + name.substring(1).toLowerCase().trim();
        const paramsToSend = {
            id: parseInt(v4()),
            name: capitalizedName,
            email,
            address,
            birth,
        };
        const response = await api.put("/pacients", paramsToSend);

        if (response) {
            NotificationManager.success(
                "Paciente criado com sucesso",
                "Sucesso",
                3000
            );
            const callApi = async () => {
                const { data } = await api.get("/pacients");
                setMyPacients(data.Items);
            };
            callApi();
        } else {
            NotificationManager.error(
                "Falha na criação de novo paciente",
                "Sucesso",
                3000
            );
        }
    };

    const deletePacient = async (id: number) => {
        console.log(id);
        // const response = await api.delete("/pacients");
    };

    return (
        <MainSection>
            <MyContainer>
                <NotificationContainer />

                <form onSubmit={addPacient}>
                    <Row>
                        <TextField
                            id="standard-basic"
                            label="Nome"
                            variant="standard"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            style={{ width: "100%" }}
                        />
                        <TextField
                            label="Email"
                            variant="standard"
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
                            required
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            style={{ width: "100%" }}
                        />
                        <InputMask
                            mask="99/99/9999"
                            value={birth}
                            disabled={false}
                            // maskChar=" "
                            onChange={(event: any) =>
                                setBirth(event.target.value)
                            }
                        >
                            {() => (
                                <TextField
                                    id="standard-basic"
                                    label="Nascimento"
                                    variant="standard"
                                    required
                                    style={{ width: "100%" }}
                                    helperText={
                                        birthError
                                            ? "Digite uma data válida"
                                            : null
                                    }
                                    error={birthError ? true : false}
                                />
                            )}
                        </InputMask>
                    </Row>

                    <MyButton variant="contained" type="submit">
                        Adicionar
                    </MyButton>
                </form>
                <PacientsSection>
                    {myPacients.map((item: PacientsProps) => {
                        return (
                            <PacientItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                address={item.address}
                                birth={item.address}
                                email={item.email}
                                deletePacient={deletePacient}
                            />
                        );
                    })}
                </PacientsSection>
            </MyContainer>
        </MainSection>
    );
};

export default Container;
