import React from 'react';
import { Box, Typography, Container } from "@mui/material";
import { theme } from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Navigate } from 'react-router-dom';
import { useAuth } from "@/hooks/useAuth.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import NewLoginButton from "@/components/general_comps/loginButton";
export default function Login() {
    const clientID = React.useRef(import.meta.env.VITE_CLIENT_ID || "CLIENT_ID_MISSING");
    const { init, user } = useAuth();

    React.useEffect(() => {
        init();

    }, []);

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
                    <GoogleOAuthProvider clientId={clientID.current}>
                        {/*<LoginButton />*/}
                        <NewLoginButton />
                    </GoogleOAuthProvider>
                </Box>
            </Container>
        </ThemeProvider>
    )
}