import { Button, Box, Link as MuiLink, Stack, Typography, Container } from "@mui/material";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from "@mui/icons-material";
import image from "/images/landing.jpeg";
import { useEffect, useState } from "react";
import { AnimatedWords } from "components/general_comps/animatedWords";
import { riseWithFade } from "@/utils/motionVariants.js";
import ROUTES from "@/constants/routeConstants.js";

export default function Landing() {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setHydrated(true);
        }, 1500);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <Box>
            <Container sx={{
                pt: 12, px: { md: 6 }, minHeight: "600px", height: "55vh", display: "grid", placeItems: "center"
            }} component="header">
                {/*<motion.h1>שבצ״ק - מערכת שבצת שמירות</motion.h1>*/}
                <Box sx={{ display: "flex", gap: 2, flexDirection: { md: "row", xs: "column" } }} initial="initial" animate="animate" component={motion.div}>
                    <Typography variant="h1" fontWeight={700} sx={{ flex: 0.4, fontSize: "42px !important", lineHeight: "90%", letterSpacing: "-.5px" }}>
                        <AnimatedWords title={"שבצו את העמדות השמירה בבסיס בקלות"}/>
                    </Typography>
                    <Stack gap={4} alignItems="flex-start" sx={{ flex: 0.6 }}>
                        <Typography component={motion.p} variants={riseWithFade} variant="h6">
                            מערכת שבצ״ק משבצת את העמדות השונות בבסים באופן אוטומטי בהתאם המתאימות לכם. ניתן גם לבחור באופן ידני ולערוך את המשמרות. המערכת
                            תאפשר צפייה מהירה וקלה במשמרות כדי שכל השומרים בבסיס ישארו מעודכנים בכל רגע.
                        </Typography>
                        <Button variant="contained" size="small" sx={{ fontWeight: 700, fontSize: 14 }} href="#how-does-it-work">
                            המשך לקרוא
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>כבר יש לכם בסיס?</Typography>
                    <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>התחברו כדי להתחיל להשתמש במערכת</Typography>
                    <Button variant="outlined" color="primary" to={ROUTES.LOGIN} component={Link} sx={{ fontWeight: 700 }}>
                        להתחברות<ArrowLeft/>
                    </Button>
                </Box>
            </Container>
            <Box sx={{
                backgroundColor: "rgb(163, 183, 208)",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "33% 33%",
                position: "relative"
            }} initial="initial" animate="animate" component={motion.section}>
                <Container sx={{
                    pt: 12,
                    pb: 8,
                    px: { xs: 3.5, md: 6 },
                    color: "white !important",
                    height: "55vh",
                    textShadow: "1px 1px 10px #0003",
                }} id="how-does-it-work">
                    {hydrated && (
                        <>
                            <Typography>
                                <Typography variant="h5" fontSize={17} gutterBottom>אז אתם בטח שואלים את עצמכם...</Typography>
                                <Typography variant="h2" component="h2" gutterBottom fontWeight={700}>איך זה עובד?</Typography>
                            </Typography>
                            <br/>
                            <Typography variant="h6" fontSize={20} component={motion.div} variants={riseWithFade}>
                                <p>בחרו את הבסיס שלך או צרו בסיס חדש.</p>
                                <p>הוסיפו את עמדות השמירה השונות בבסיס, הגדירו משמרות שברצונכם לשבץ באופן אוטומטי</p>
                                <p>תוכלו לשבץ את העמדות אוטומטית בהתאם להגדרות שבחרתם עבור עמדות השמירה והשומרים בבסיס.</p>
                                <br/>
                                <p>כמובן, ניתן גם לבחור באופן ידני ולערוך את המשמרות.</p>
                                <p>המערכת תאפשר צפייה מהירה וקלה במשמרות כדי שכל השומרים בבסיס ישארו מעודכנים בכל רגע.</p>
                                <br/>
                                <br/>
                            </Typography>
                            <Typography component="small" sx={{ position: "absolute", bottom: 6, right: 0, px: 3 }} fontWeight={300} color="#010010"
                                        letterSpacing={0.3} variant="small">
                                Photo by Levi Meir Clancy on Unsplash ©</Typography>
                        </>
                    )}
                </Container>
            </Box>
            <Container sx={{ minHeight: "40vh" }}>
                <Stack sx={{ pt: 10 }} id="tell-me-more" component="section" alignItems="center" gap={2}>
                    <Typography variant="h2" sx={{ fontWeight: 700 }}>השארו מעודכנים בכל רגע</Typography>
                    <Typography variant="h6" textAlign="center" component="div" color="primary">
                        <p>צפו במשמרות בכל עמדות השמירה בקלות מכל מקום</p>
                        <p>ניתן להתחבר דרך המחשב או בנייד ולשנות את ההגדרות השונות</p>
                        <br/>
                        <br/>
                        <p>התחברות דרך גוגל הינה בהתאם ל<MuiLink variant="h6" underline="always" sx={{
                            textUnderlineOffset: "3px !important",
                            transition: "0.3s",
                            "&:hover": { textDecorationColor: "rgba(53, 94, 59, 0.5)" }
                        }} fontWeight={500} component={Link} to={ROUTES.TERMS}>תנאי השימוש</MuiLink> שלנו.</p>
                    </Typography>
                    <br/>
                    <Button variant="outlined" to={ROUTES.LOGIN} component={Link} sx={{ fontWeight: 700, fontSize: 16 }}>נשמע טוב, בואו נתחיל !</Button>
                </Stack>
            </Container>
        </Box>
    );
}

