import React from 'react';
import { Button, Box, Typography, Container } from "@mui/material";
import { theme } from "../../services/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { Google } from "@mui/icons-material";
import { Navigate } from 'react-router-dom';
import { useDarkModeStore } from "../../services/useDarkModeStore.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

export default function Login() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" />;
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
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID || 'CLIENT_ID_MISSING'}>
                        <LoginButton />
                    </GoogleOAuthProvider>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

function LoginButton() {
    const { login } = useAuth();
    const handleLogin = useGoogleLogin({ onSuccess: ({ code }) => login(code), flow: "auth-code" })
    const darkMode = useDarkModeStore((store) => store.darkMode);

    return (
        <Button onClick={() => handleLogin()} variant="outlined" sx={{...darkMode ? { color: 'white' } : {}}}>
            <Google sx={{ mr: 0.5 }} />
            <Typography variant="link">המשך עם גוגל</Typography>
        </Button>
    )
}
