import { Typography, Box, Container } from "@mui/material";
import BackLink from "../general_comps/backLink.jsx";

export default function ServiceTermsPage() {
    return (
        <Container sx={{ mt: 4.5 }} disableGutters>
            <Box as="header" sx={{ mx: { sm: 2 } }}>
                <BackLink place="start" >חזרה לעמוד הקודם</BackLink>
                <Typography variant="h2" align="center" sx={{ mt: { sm: -4.5 } }}>תנאי שירות</Typography>
            </Box>
            <Box as="article" sx={{ mx: { sm: 4, xs: 3 }, mt: { sm: 4, xs: 3 } }}>
                <Box component="section" sx={{ mb: 2 }}>
                    <Typography variant="body1" gutterBottom>
                        האתר מעניק את השירות בחינם. השימוש באתר הינו באחריות המשתמש ולא תהיה למשתמשים כל תביעה כנגד האתר או מפעיליו.
                        כל המידע המועלה לאתר הינו באחריות המשתמש ולכן יש להשתמש בשמות בסיסים ועמדות שאינם חושפים מידע מסווג
                        למען הספר ספק, מפעילי האתר אינם מתחייבים לכל רמת שירות שהיא והשימוש באתר הינו האחריות המשתמש בלבד.
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}