import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Box, Button, Link } from "@mui/material";
import { ChevronRightSharp } from "@mui/icons-material";
import { Link as RouteLink } from "react-router-dom";

export default function BackLink({ place, children, icon, to }) {
    const nav = useNavigate()
    return (
        <Box display="flex" justifyContent={place} marginTop={3}>
            <Link underline="hover"
                  aria-label={`עבור ל ${place}`}
                  sx={{
                      textUnderlineOffset: 3.5, display: "flex",
                      alignItems: "center", px: .5, gap: .5
                  }}
                  size="small"
                  onClick={to ? undefined : () => nav(-1)}
                  component={to ? RouteLink : Button}
                  to={to ? to : undefined}
            >
                <span style={{ order: icon ? 0 : 1 }}>{children}</span>
                {icon ? icon : <ChevronRightSharp sx={{ fontSize: 18 }}/>}
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
