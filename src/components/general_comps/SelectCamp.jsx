import React from "react";
import { useQuery } from "react-query";
import { getCamps } from "@/services/campService.js";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import { useDarkModeStore } from "@/theme/useDarkModeStore.jsx";
import { useTheme } from "@mui/material/styles";

function SelectCamp({ selectedCampId, setSelectedCampId, onCampChange, title, title2 }) {
    const { isLoading: isLoadingCamps, data: camps } = useQuery({
        queryKey: "camps",
        queryFn: getCamps,
    });
    React.useEffect(() => {
        if (!selectedCampId && Array.isArray(camps) && camps?.length > 0) {
            setSelectedCampId(camps[0].id);
        }
    }, [camps]);

    const onCampSelected = (value) => {
        setSelectedCampId(value);
        onCampChange();
    }
    const theme = useTheme();
    const darkMode = useDarkModeStore((s) => s.darkMode);

    return (
        <Stack direction="row" gap={0.5} alignItems="center" flexWrap="wrap" paddingX={1.5} paddingTop={1}>
            <Typography variant="h3" component="h2" whiteSpace="nowrap">
                {title}
            </Typography>

            {isLoadingCamps ? (
                <TextField disabled size="medium" defaultValue=""/>
            ) : (
                camps?.length !== 0 && (
                    <Stack direction="row" alignItems="center" gap={1}>
                        {title2 && <Typography variant="h3">{title2}</Typography>}
                        <FormControl>
                            <TextField
                                select
                                size="medium"
                                variant="standard"
                                id="camp-select"
                                placeholder="בחר בסיס"
                                value={camps?.map(({ id }) => id).includes(selectedCampId) ? selectedCampId : ""}
                                onChange={(e) => onCampSelected(e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {
                                        color: "inherit",
                                        "&.Mui-focused > div": {
                                            backgroundColor: "transparent",
                                        },
                                        ":hover svg": {
                                            opacity: 0.7,
                                        },
                                        svg: {
                                            opacity: 0.5,
                                            color: darkMode ? theme.palette.grey[400] : theme.palette.grey[600],
                                            transition: "opacity 125ms ease-in-out 75ms, transform 175ms ease-in-out",
                                        },
                                        paddingInlineEnd: 2,
                                        minWidth: "120px",
                                    },
                                }}
                                inputProps={{
                                    IconComponent: KeyboardArrowDownRounded,
                                }}
                            >
                                <MenuItem value="" hidden disabled/>
                                {camps?.map(({ id, name }) => (
                                    <MenuItem value={id} key={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Stack>
                )
            )}
        </Stack>
    );
}

export default SelectCamp;