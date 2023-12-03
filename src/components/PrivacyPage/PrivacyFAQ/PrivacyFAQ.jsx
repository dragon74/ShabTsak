import React from "react";
import { Box, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "../../general_comps/Accordion";

export default function PrivacyFAQ() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box component="section" sx={{my: 4}}>
            <Typography variant="h3" gutterBottom textTransform="uppercase">Summary Of Key Points</Typography>
            <Typography gutterBottom>
                This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking
                the link following each key point or by using our table of contents below to find the section you are looking for.
            </Typography>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary>
                    <Typography>What personal information do we process?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        When you visit, use, or navigate our Services, we may process personal information
                        depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn
                        more
                        about personal information you disclose to us.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                <AccordionSummary>
                    <Typography>Do we process any sensitive personal information?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>We do not process sensitive personal information.</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                <AccordionSummary>
                    <Typography>
                        Do we receive any information from third parties?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We do not receive any information from third parties.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                <AccordionSummary>
                    <Typography>
                        How do we process your information?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We process your information to provide, improve, and administer our Services, communicate with
                        you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with
                        your
                        consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your
                        information.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
                <AccordionSummary>
                    <Typography>
                        In what situations and with which parties do we share personal information?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We may share information in specific situations and with
                        specific third parties. Learn more about when and with whom we share your personal information.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel6"} onChange={handleChange("panel6")}>
                <AccordionSummary>
                    <Typography>
                        How do we keep your information safe?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We have organizational and technical processes and procedures in place to protect your
                        personal information. However, no electronic transmission over the internet or information storage technology can be
                        guaranteed to
                        be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not
                        be able
                        to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your
                        information safe.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel7"} onChange={handleChange("panel7")}>
                <AccordionSummary>
                    <Typography>
                        What are your rights?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Depending on where you are located geographically, the applicable privacy law may mean you have certain rights
                        regarding your personal information. Learn more about your privacy rights.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel8"} onChange={handleChange("panel8")}>
                <AccordionSummary>
                    <Typography>
                        How do you exercise your rights?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        The easiest way to exercise your rights is by submitting a data subject access request, or by
                        contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel9"} onChange={handleChange("panel9")}>
                <AccordionSummary>
                    <Typography>
                        Want to learn more about what we do with any information we collect?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Review the privacy notice in full.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}