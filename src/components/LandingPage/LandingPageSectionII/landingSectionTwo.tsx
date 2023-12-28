import { Box, Button, Container, Link as MuiLink, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "@/constants/routeConstants";
import { LandingSectionTwoProps } from "components/LandingPage/landingPageContent";

const LandingSectionTwo = ({
    title,
    content,
    agreement,
    agreementLink,
    agreementLinkTo
}: LandingSectionTwoProps) => {
    const agreementLinkElement = () => (
        <MuiLink variant="h6" underline="always" sx={{
            textUnderlineOffset: "3px !important",
            transition: "0.3s",
            "&:hover": { textDecorationColor: "rgba(53, 94, 59, 0.5)" }
        }} fontWeight={500} component={Link} to={agreementLinkTo}>{agreementLink}</MuiLink>
    )
    const [agreementText1, agreementText2] = agreement.split("$1");

    return (
        <Container sx={{ minHeight: "40vh", pb: 5, pt: 8 }}>
            <Stack id="tell-me-more" component="section" alignItems="center" gap={8}>
                <Box>
                    <Typography variant="h2" sx={{ fontWeight: 700 }} gutterBottom>{title}</Typography>
                    <Typography sx={{ px: 4 }} variant="h6" textAlign="center" component="div" color="primary">
                        {content.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </Typography>
                </Box>
                <Stack alignItems="center" gap={2}>
                    <Typography variant="h6" textAlign="center" sx={{ px: 5, textWrap: "balance" }}>{agreementText1}{agreementLinkElement()}{agreementText2}</Typography>
                    <Button variant="outlined" to={ROUTES.LOGIN} component={Link} sx={{ fontWeight: 700, fontSize: 16 }}>נשמע טוב, בואו נתחיל !</Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default LandingSectionTwo;