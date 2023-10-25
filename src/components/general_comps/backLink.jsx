import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ChevronRightSharp } from "@mui/icons-material";
import PropTypes from 'prop-types';
export default function BackLink({ to, children }) {
    return (
        <Link component={RouterLink} underline="hover" sx={{ textUnderlineOffset: 3.5, display: "flex", alignItems: "center", px: .5, gap: .5 }} size="small" to={to}>
            <ChevronRightSharp sx={{ fontSize: 18 }} /><span>{children}</span>
        </Link>
    )
}

BackLink.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node
}
