import React, { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from "prop-types";



const useBreakpoint = ({ xs, sm, md, lg, xl, ...rest }) => {
    const theme = useTheme();
    const [sxObj, setSxObj] = React.useState(rest || {});
    const up = useCallback((key) => `@media (min-width:${theme.breakpoints.values[key]}px)`, [theme.breakpoints]);
    const down = useCallback((key) => `@media (max-width:${theme.breakpoints.values[key] - 1}px)`, [theme.breakpoints]);

    const xsMatches = useMediaQuery(xs?.[0] === true ? up("xs") : down("xs"))
    const smMatches = useMediaQuery(sm?.[0] === true ? up("sm") : down("sm"));
    const mdMatches = useMediaQuery(md?.[0] === true ? up("md") : down("md"));
    const lgMatches = useMediaQuery(lg?.[0] === true ? up("lg") : down("lg"));
    const xlMatches = useMediaQuery(xl?.[0] === true ? up("xl") : down("xl"));

    const reset = () => {
        setSxObj(() => {
            const newSxObj = JSON.parse(JSON.stringify(rest));
            if (xsMatches && xs?.[1]) Object.assign(newSxObj, xs[1]);
            if (smMatches && sm?.[1]) Object.assign(newSxObj, sm[1]);
            if (mdMatches && md?.[1]) Object.assign(newSxObj, md[1]);
            if (lgMatches && lg?.[1]) Object.assign(newSxObj, lg[1]);
            if (xlMatches && xl?.[1]) Object.assign(newSxObj, xl[1]);
            console.log(newSxObj);
            return newSxObj;
        });
    }

    React.useEffect(() => {
        const t = setTimeout(reset, 300);
        return () => clearTimeout(t);
    }, [xsMatches, smMatches, mdMatches, lgMatches, xlMatches])
    return sxObj;
}

useBreakpoint.propTypes = {
    xs: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
    sm: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
    md: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
    lg: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
    xl: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
};

export default useBreakpoint;