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
// Components
import PacientItem from "./PacientItem";

const Container = () => {
    const [myPacients, setMyPacients] = useState([]);
    const [filteredPacient, setFilteredPacient] = useState<PacientsProps>({
        name: "",
        id: 0,
        address: "",
        birth: "",
        email: "",
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [birth, setBirth] = useState("");

    const [birthError, setBirthError] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const callApi = async () => {
            const { data } = await api.get("/pacients");
            setMyPacients(data.Items);
        };
        callApi();
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

        if (editMode) {
            paramsToSend.id = filteredPacient.id;
        }

        const findTheSameEmail = myPacients.find(
            (item: PacientsProps) => item.email === email
        );
        if (findTheSameEmail) {
            NotificationManager.error(
                "Já existe um usuário cadastrado com esse e-mail",
                "Erro",
                3000
            );
            setName("");
            setEmail("");
            setAddress("");
            setBirth("");
            setEditMode(false);
            return;
        }

        const response = await api.put("/pacients", paramsToSend);

        if (response.data) {
            NotificationManager.success(
                "Paciente cadastrado com sucesso",
                "Sucesso",
                3000
            );
            const callApi = async () => {
                const { data } = await api.get("/pacients");
                setMyPacients(data.Items);
            };
            callApi();

            setName("");
            setEmail("");
            setAddress("");
            setBirth("");
            setEditMode(false);
        } else {
            NotificationManager.error(
                "Falha na criação de novo paciente",
                "Erro",
                3000
            );
        }
    };

    const deletePacient = async (id: number) => {
        const paramsToSend = {
            id: id,
        };
        const response = await api.delete("/pacients", { data: paramsToSend });

        if (response) {
            const callApi = async () => {
                const { data } = await api.get("/pacients");
                setMyPacients(data.Items);
            };
            callApi();
        }
    };

    const editPacient = async (id: number) => {
        if (editMode) {
            setEditMode(!editMode);

            return setFilteredPacient({
                name: "",
                id: 0,
                address: "",
                birth: "",
                email: "",
            });
        }
        const filtered = myPacients.find(
            (item: PacientsProps) => item.id === id
        );

        if (filtered) {
            setFilteredPacient(filtered);
            setEditMode(!editMode);
        }
    };

    useEffect(() => {
        setName(filteredPacient.name);
        setEmail(filteredPacient.email);
        setAddress(filteredPacient.address);
        setBirth(filteredPacient.birth);
    }, [filteredPacient]);

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
                            focused={editMode ? true : false}
                        />

                        <TextField
                            label="Email"
                            variant="standard"
                            required
                            type={"email"}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            focused={editMode ? true : false}
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
                            focused={editMode ? true : false}
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
                                    focused={editMode ? true : false}
                                    error={birthError ? true : false}
                                />
                            )}
                        </InputMask>
                    </Row>

                    <MyButton
                        variant="contained"
                        type="submit"
                        color={editMode ? "success" : "info"}
                    >
                        {editMode ? "Editar" : "Cadastrar"}
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
                                birth={item.birth}
                                email={item.email}
                                deletePacient={deletePacient}
                                editPacient={editPacient}
                            />
                        );
                    })}
                </PacientsSection>
            </MyContainer>
        </MainSection>
    );
};

export default Container;
