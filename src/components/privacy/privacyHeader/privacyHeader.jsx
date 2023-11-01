import { Box, Link, Typography } from "@mui/material";
import React from "react";

export default function PrivacyHeader() {
   return (
       <Box component="header" sx={{my: 4}}>
           <Typography variant="h3" gutterBottom textTransform="uppercase">Privacy Policy</Typography>
           <Typography variant="body1" gutterBottom aria-label="Last Updated Date">
               Last updated October 26, 2023
           </Typography>
           <Box>
               <Typography variant="body1" gutterBottom>
                   This privacy notice for Shabtsak ("we," "us," or "our"), describes how and why we might collect, store, use, and/or share
                   ("process") your information when you use our services ("Services"), such as when you:
               </Typography>
               <ul style={{paddingLeft: '1rem'}}>
                   <li>Visit our website at https://shabtsak.top/, or any website of ours that links to this privacy notice.</li>
                   <li>Engage with us in other related ways, including any sales, marketing, or events.</li>
                   <li>Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree
                       with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us
                       at <Link href="mailto:dan.erez@gmail.com" underline="hover">dan.erez@gmail.com</Link>.
                   </li>
               </ul>
           </Box>
       </Box>
   )
}