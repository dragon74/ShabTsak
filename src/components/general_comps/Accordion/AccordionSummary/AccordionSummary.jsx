import React from "react";
import { styled } from "@mui/material/styles";
import { AccordionSummary as MuiAccordionSummary } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

export const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({
        theme
    }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection:
        'row-reverse',
    gap:
        '.5rem',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded':
        {
            transform: 'rotate(90deg)',
        }
    ,
}));