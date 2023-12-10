import {styled} from "@mui/material/styles";
import {AccordionDetails as MuiAccordionDetails} from "@mui/material";

export const AccordionDetails = styled(MuiAccordionDetails)(({
      _theme
  }) => ({
    padding: '1rem 1.5rem 1rem 1rem',
    borderTop:
        '1px solid rgba(0, 0, 0, .125)',
}));
