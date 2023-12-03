import { Box, Container, Typography } from "@mui/material";
import image from "/images/landing.jpeg";
import { motion, useInView, useAnimation } from "framer-motion";
import { delayedVariant, riseWithFade } from "@/utils/motionVariants";
import { LandingSectionProps } from "components/LandingPage/landingPageContent";
import { useEffect, useRef } from "react";

const LandingSection = ({
    preface,
    title,
    content,
    contentTwo
}: LandingSectionProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const controls = useAnimation();
    useEffect(() => {
        if (inView) {
            controls.start("animate");
        }
    }, [controls, inView])
    // const sectionInView = useInView({ root: "how-does-it-work" }, { once: true, amount: 50 });
    return (
        <Box sx={{
            backgroundColor: "rgb(163, 183, 208)",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "33% 33%",
            position: "relative"
        }} component={"section"}>
            <Container
                id="how-does-it-work"
                initial="initial" animate="animate"
                component={motion.div}
                ref={ref}
                sx={{
                py: 12,
                px: { xs: 3.5, md: 6 },
                color: "white !important",
                textShadow: "1px 1px 10px #0003",
            }}>
                <Typography component="hgroup">
                    <Typography variant="h5" fontSize={17} gutterBottom component={motion.h5} variants={delayedVariant(riseWithFade, 1500)}>{preface}</Typography>
                    <Typography variant="h2" gutterBottom fontWeight={700} component={motion.h2} variants={delayedVariant(riseWithFade, 2000)}>{title}</Typography>
                </Typography>
                <br/>
                <Typography variant="h6" fontSize={20} component={motion.div} variants={delayedVariant(riseWithFade, 2500)}>
                    {content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                    <br/>
                    {contentTwo.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </Typography>
                <Typography component="small"
                            sx={{ position: "absolute", bottom: 6, right: 0, px: 3 }}
                            fontWeight={300}
                            color="#010010"
                            letterSpacing={0.3}
                            variant="body1"
                >
                    Photo by Levi Meir Clancy on Unsplash ©</Typography>
            </Container>
        </Box>
    );
};

export default LandingSection;