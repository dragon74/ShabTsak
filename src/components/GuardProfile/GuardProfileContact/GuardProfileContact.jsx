import React from 'react';
import PropTypes from 'prop-types';
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {EmailRounded, PhoneAndroid} from "@mui/icons-material";
import {Link} from "react-router-dom";

const GuardProfileContact = props => {
    return (
        <Box sx={{ marginBottom: "1em" }}>
            {/* Display guard's details */}
            <Typography variant="h6" component="h3">
                פרטי קשר:
            </Typography>
            <Typography variant="body1">
                <IconButton color="primary" component="a" href={`mailto:${props.mail}`} sx={{ marginInlineEnd: 0.8 }}>
                    <EmailRounded style={{ fontSize: "1.2rem", marginBottom: "-4px" }} />
                </IconButton>
                מייל: <span style={{ fontWeight: 500 }}>{props.mail}</span>
            </Typography>
            <Typography variant="body1">
                <IconButton color="primary" component="a" href={`tel:${props.phone}`} sx={{ marginInlineEnd: 0.8 }}>
                    <PhoneAndroid  style={{ fontSize: "1.2rem", marginBottom: "-4px" }} />
                </IconButton>
                נייד: <span style={{ fontWeight: 500 }}>{props.phone}</span>
            </Typography>
        </Box>
    );
};

GuardProfileContact.propTypes = {
    phone: PropTypes.string,
    mail: PropTypes.string,
};

export default GuardProfileContact;