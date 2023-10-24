import { Button, Box, Typography, Container } from "@mui/material";
import React from 'react';
import { theme } from "../../services/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { useGoogleLogin } from '@react-oauth/google';
import { Google } from "@mui/icons-material";
import axios from 'axios';
import { useUserStore } from "../../services/useUserStore.jsx";
import { useNavigate } from 'react-router-dom';
import {useDarkModeStore} from "../../services/useDarkModeStore.jsx";

export default function Login() {
    const test = useUserStore((store) => store.test);
    const darkMode = useDarkModeStore((store) => store.darkMode);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async response => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${response.access_token}`
                    }
                })
                // await authenticate('testing');
                const success = test(res.data);
                if (success) {
                    navigate('/');
                }

                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
    })


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                    gap: 2,
                    textAlign: "center"
                }}>
                    <Typography variant="h1">ברוכים הבאים לשבצ״ק!</Typography>
                    <Typography variant="body2">כדי לצפות בשמירות ולבצע שינויים<br />יש להתחבר  </Typography>
                    <Button onClick={() => login()} variant="outlined" sx={{...darkMode ? { color: 'white' } : {}}}>
                        <Google sx={{ mr: 0.5 }} />
                        <Typography variant="link">המשך עם גוגל</Typography>
                    </Button>

                </Box>
            </Container>
        </ThemeProvider>
    )
}
