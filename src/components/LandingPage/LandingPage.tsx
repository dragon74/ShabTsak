import { Box } from "@mui/material";
import { landingPageContent } from "./landingPageContent";
import LandingSection from "components/LandingPage/LandingPageSectionI/landingSection";
import LandingSectionTwo from "components/LandingPage/LandingPageSectionII/landingSectionTwo";
import LandingHeader from "components/LandingPage/LandingPageHeader/landingHeader";

export default function LandingPage() {
    return (
        <Box>
            <LandingHeader {...landingPageContent.header} />
            <LandingSection {...landingPageContent.section} />
            <LandingSectionTwo {...landingPageContent.sectionTwo} />
        </Box>
    );
}

