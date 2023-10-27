import React from "react";
import { styled } from "@mui/material/styles";
import { Accordion as MuiAccordion } from "@mui/material";

export const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({
        theme
    }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)':
        {
            borderBottom: 0,
        }
    ,
    '&:before':
        {
            display: 'none',
        }
    ,
}));
