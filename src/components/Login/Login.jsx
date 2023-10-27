import React from 'react';
import { Button, Box, Typography, Container } from "@mui/material";
import { theme } from "../../services/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { useGoogleLogin } from '@react-oauth/google';
import { Google } from "@mui/icons-material";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDarkModeStore } from "../../services/useDarkModeStore.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function Login() {
    const { login, test, user } = useAuth();
    const darkMode = useDarkModeStore((store) => store.darkMode);
    const navigate = useNavigate();
    const handleLogin = useGoogleLogin({ onSuccess, onNonOAuthError });
    if (user) {
        return <Navigate to="/" />;
    }

    async function onSuccess({ access_token: firebaseToken }) {
        try {
            const success = await login(firebaseToken);
            if (success) {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }
    async function onNonOAuthError() {
        try {
            console.log("Failed login, but our bouncer is nice today");
            const success = test();
            if (success) {
                navigate('/');
            }

        } catch (err) {
            console.log(err)
        }
    }

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
                    <Button onClick={() => handleLogin()} variant="outlined" sx={{...darkMode ? { color: 'white' } : {}}}>
                        <Google sx={{ mr: 0.5 }} />
                        <Typography variant="link">המשך עם גוגל</Typography>
                    </Button>

                </Box>
            </Container>
        </ThemeProvider>
    )
}
