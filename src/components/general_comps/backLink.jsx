import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Box, Link } from "@mui/material";
import { ChevronRightSharp } from "@mui/icons-material";

export default function BackLink({ to, place, children, icon }) {
    const nav = useNavigate()
    return (
        <Box display="flex" justifyContent={place} marginTop={3}>
            <Link component={RouterLink} underline="hover"
                sx={{
                    textUnderlineOffset: 3.5, display: "flex",
                    alignItems: "center", px: .5, gap: .5
                }}
                size="small"
                onClick={!to ? () => nav(-1) : undefined}
                to={to}>
                <span>{children}</span>
                {icon ? icon : <ChevronRightSharp sx={{ fontSize: 18 }} />}
            </Link>
        </Box>
    )
}

BackLink.propTypes = {
    to: PropTypes.string,
    place: PropTypes.string,
    children: PropTypes.node,
    icon: PropTypes.element
}
