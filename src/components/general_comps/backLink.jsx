import { Link as RouterLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { Link } from "@mui/material";
import { ChevronRightSharp } from "@mui/icons-material";

export default function BackLink({ to, children }) {
    return (
        <Link component={RouterLink} underline="hover" 
            sx={{ textUnderlineOffset: 3.5, display: "flex",
            alignItems: "center", px: .5, gap: .5
         }} 
            size="small" 
            to={to}>
            <ChevronRightSharp sx={{ fontSize: 18 }} />
            <span>{children}</span>
        </Link>
    )
}

BackLink.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node
}
