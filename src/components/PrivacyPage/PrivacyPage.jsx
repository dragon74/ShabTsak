import React from 'react';
import { Typography, Box, Container } from "@mui/material";
import ROUTES from "../../constants/routeConstants";
import BackLink from "../general_comps/BackLink.jsx";
import PrivacyHeader from "components/PrivacyPage/PrivacyHeader/PrivacyHeader.jsx";
import PrivacyFAQ from "components/PrivacyPage/PrivacyFAQ/PrivacyFAQ.jsx";
import PrivacyContent from 'components/PrivacyPage/PrivacyContent/PrivacyContent.jsx'

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
