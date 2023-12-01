import { Box, Button, Container, Stack, type SxProps, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { AnimatedWords } from "components/general_comps/AnimatedWords";
import { delayedVariant, riseWithFade } from "@/utils/motionVariants";
import ROUTES from "@/constants/routeConstants";
import { Link } from "react-router-dom";
import { ArrowLeft } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { LandingHeaderProps } from "components/LandingPage/landingPageContent";
import { useAuthContext } from "@/context/AuthContext";

const LandingHeader = ({
    title,
    cta,
    ctaButton,
    ctaLogin,
    ctaLoginSub,
    ctaLoginButton
}: LandingHeaderProps) => {
    const theme = useTheme();
    let onMobile = theme.breakpoints.down("sm");
    const { user } = useAuthContext();
    const styles: Record<string, SxProps> = {
        header: { padding: theme.spacing(8, 4, 6), minHeight: "550px", justifyContent: "center", display: "flex", flexDirection: "column", gap: 5, textWrap: "balance" },
        title: { flex: 0.4, fontSize: "42px !important", lineHeight: "90%", letterSpacing: "-.5px" },
        content: { display: "flex", gap: 2, flexDirection: { md: "row", xs: "column" } },
        headerCta: { flex: 0.6 },
        headerCtaButton: { fontWeight: 700, fontSize: 14 },
        headerCtaLogin: { textAlign: onMobile ? "center" : "start" }
    }

    return (
        <Container sx={styles.header} component="header">
            <Box sx={styles.content} initial="initial" animate="animate" component={motion.div}>
                <Typography variant="h1" fontWeight={700} sx={styles.title}>
                    <AnimatedWords title={title}/>
                </Typography>
                <Stack gap={4} alignItems="flex-start" sx={styles.headerCta}>
                    <Typography component={motion.p} variants={delayedVariant(riseWithFade, 700)} variant="h6">
                        {cta}
                    </Typography>
                    <Button variant="contained" size="small" sx={styles.headerCtaButton} href="#how-does-it-work">
                        {ctaButton}
                    </Button>
                </Stack>
            </Box>
            <Box sx={styles.headerCtaLogin}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>{!user ? ctaLogin : "שלום " + user.name}! 👑</Typography>
                {!user && <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>{ctaLoginSub}</Typography>}
                <Button variant="outlined" color="primary" to={ROUTES.LOGIN} component={Link} sx={{ fontWeight: 700 }}>
                    {!user ? ctaLoginButton : "למעבר לאפליקציה"}<ArrowLeft/>
                </Button>
            </Box>
        </Container>
    );
};

export default LandingHeader;