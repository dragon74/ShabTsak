import React, { useEffect } from 'react';
import ROUTES from '@/constants/routeConstants';
import { Box, Typography, Container } from "@mui/material";
import { theme } from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginButton from "components/general_comps/LoginButton.jsx";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
export default function LoginPage() {
    const { user } = useAuthContext();
    if (user === undefined) {
        return null;
    }
    if (user) {
        return <Navigate to={ROUTES.HOME} />;
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
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID || "CLIENT_ID_MISSING"}>
                        <LoginButton />
                    </GoogleOAuthProvider>
                </Box>
            </Container>
        </ThemeProvider>
    )
}