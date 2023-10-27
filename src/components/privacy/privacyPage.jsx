import React from 'react';
import { Typography, Box, Container } from "@mui/material";
import ROUTES from "../../constants/routeConstants";
import BackLink from "../general_comps/backLink";
import PrivacyHeader from "./privacyHeader/privacyHeader";
import PrivacyFAQ from "./privacyFAQ/privacyFAQ";
import PrivacyContent from './privacyContent/privacyContent'

export default function PrivacyPage() {

    return (<Container sx={{mt: 4.5}} disableGutters>
            <BackLink to={ROUTES.HOME}>חזרה לעמוד הבית</BackLink>
            <Box as="hgroup" sx={{mx: {sm: 2}}}>
                <Typography variant="h2" align="center" sx={{mt: {sm: -4.5}}}>תנאי פרטיות</Typography>
            </Box>
            <Typography dir="ltr" as="article" sx={{mx: {sm: 4, xs: 3}, mt: {sm: 4, xs: 3}}}>
                <PrivacyHeader />
                <PrivacyFAQ />
                <PrivacyContent />
            </Typography>
        </Container>
    )
}
