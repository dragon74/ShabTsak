import { Box } from "@mui/material";
import { landingContent } from "./landingContent";
import LandingSection from "./landingSection/landingSection";
import LandingSectionTwo from "./landingSectionTwo/landingSectionTwo";
import LandingHeader from "components/landing/landingHeader/landingHeader";

export default function Landing() {
    return (
        <Box>
            <LandingHeader {...landingContent.header} />
            <LandingSection {...landingContent.section} />
            <LandingSectionTwo {...landingContent.sectionTwo} />
        </Box>
    );
}

