import React, { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from "prop-types";



const useBreakpoint = ({ xs, sm, md, lg, xl, ...rest }) => {
    const theme = useTheme();
    const [sxObj, setSxObj] = React.useState(rest || {});
    const [isResetting, setIsResetting] = React.useState(false);
    console.log(xs?.[0]);
    const up = useCallback((key) => `@media (min-width:${theme.breakpoints.values[key]}px)`, [theme.breakpoints]);
    const down = useCallback((key) => `@media (max-width:${theme.breakpoints.values[key] - 1}px)`, [theme.breakpoints]);
    const xsBreakpoint = xs?.[0] === true ? up("xs") : down("xs");
    const smBreakpoint = sm?.[0] === true ? up("sm") : down("sm");
    const mdBreakpoint = md?.[0] === true ? up("md") : down("md");
    const lgBreakpoint = lg?.[0] === true ? up("lg") : down("lg");
    const xlBreakpoint = xl?.[0] === true ? up("xl") : down("xl");

    const xsMatches = useMediaQuery(xsBreakpoint);
    const smMatches = useMediaQuery(smBreakpoint);
    const mdMatches = useMediaQuery(mdBreakpoint);
    const lgMatches = useMediaQuery(lgBreakpoint);
    const xlMatches = useMediaQuery(xlBreakpoint);

    React.useEffect(() => {
        if (isResetting) {
            return;
        }
        setIsResetting(true);
        setSxObj(() => {
            const newSxObj = JSON.parse(JSON.stringify(rest));
            if (xsMatches && xs?.[1]) Object.assign(newSxObj, xs[1]);
            if (smMatches && sm?.[1]) Object.assign(newSxObj, sm[1]);
            if (mdMatches && md?.[1]) Object.assign(newSxObj, md[1]);
            if (lgMatches && lg?.[1]) Object.assign(newSxObj, lg[1]);
            if (xlMatches && xl?.[1]) Object.assign(newSxObj, xl[1]);
            setIsResetting(false);
            return newSxObj;
        })
    }, [xsMatches, smMatches, mdMatches, lgMatches, xlMatches])
    return sxObj;
    // const [breakpoints, setBreakpoints] = React.useState(theme.breakpoints);
    // const up = useCallback((key) => `@media (min-width:${breakpoints.values[key]}px)`, [breakpoints]);
    // const down = useCallback((key) => `@media (max-width:${breakpoints.values[key] - 1}px)`, [breakpoints]);
    // // const breakpoint = up('xs')
    // // const breakpoint = up('xl')
    // // const xsMatches = useMediaQuery((xs?.[0] === true ? up : down)(theme.breakpoints.xs));
    // // const smMatches = useMediaQuery((sm?.[0] === true ? up : down)(theme.breakpoints.sm));
    // // const mdMatches = useMediaQuery((md?.[0] === true ? up : down)(theme.breakpoints.md));
    // // const lgMatches = useMediaQuery((lg?.[0] === true ? up : down)(theme.breakpoints.lg));
    // // const xlMatches = useMediaQuery((xl?.[0] === true ? up : down)(theme.breakpoints.xl));

    // const xsMatches = useMediaQuery((xs?.[0] === true ? up : down)("xs"));
    // const smMatches = useMediaQuery((sm?.[0] === true ? up : down)("sm"));
    // const mdMatches = useMediaQuery((md?.[0] === true ? up : down)("md"));
    // const lgMatches = useMediaQuery((lg?.[0] === true ? up : down)("lg"));
    // const xlMatches = useMediaQuery((xl?.[0] === true ? up : down)("xl"));

    // React.useEffect(() => {
    //     setSxObj(() => {
    //         const newSxObj = JSON.parse(JSON.stringify(rest));
    //         if (xsMatches && xs?.[1]) Object.assign(sxObj, xs[1]);
    //         if (smMatches && sm?.[1]) Object.assign(sxObj, sm[1]);
    //         if (mdMatches && md?.[1]) Object.assign(sxObj, md[1]);
    //         if (lgMatches && lg?.[1]) Object.assign(sxObj, lg[1]);
    //         if (xlMatches && xl?.[1]) Object.assign(sxObj, xl[1]);
    //         return newSxObj;
    //     })
    // }, [xsMatches, smMatches, mdMatches, lgMatches, xlMatches]);

    // return sxObj;
}

useBreakpoint.propTypes = {
    xs: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
    sm: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
    md: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
    lg: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
    xl: PropTypes.arrayOf([PropTypes.bool, PropTypes.object]),
};

export default useBreakpoint;