import React from "react";
import { useQuery } from "react-query";
import { getCamps } from "@/services/CampService.js";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";

export default function SelectCamp({ selectedCampId, setSelectedCampId, onCampChange, title, title2 }) {
  const { isLoadingCamps, data } = useQuery({
    queryKey: "camps",
    queryFn: getCamps,
    select: (camps) => camps.map(({ name, id }) => ({ label: name, value: id })),
  });
  React.useEffect(() => {
    if (!selectedCampId && Array.isArray(data) && data?.length > 0) {
      setSelectedCampId(data[0].value);
    }
  }, [data]);

  const onCampSelected = (value) =>{
    setSelectedCampId(value);
    onCampChange();
  }

  return (
    <Stack direction="row" gap={0.5} alignItems="center" flexWrap="wrap" paddingX={1.5} paddingTop={1} sx={{ backgroundColor: "#f7f7f7" }}>
      <Typography variant="h3" component="h2" whiteSpace="nowrap">
        {title}
      </Typography>
      {isLoadingCamps ? (
        <TextField disabled size="large" defaultValue="" />
      ) : (
        data?.length !== 0 && (
          <Stack direction="row" alignItems="center" gap={1}>
            {title2 && <Typography variant="h3">{title2}</Typography>}
            <FormControl>
              <TextField
                select
                size="large"
                variant="standard"
                id="camp-select"
                placeholder="בחר בסיס"
                value={selectedCampId ? selectedCampId : ""}
                onChange={(e) => onCampSelected(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    "&.Mui-focused > div": {
                      backgroundColor: "transparent",
                    },
                    ":hover svg": {
                      opacity: 0.7,
                    },
                    svg: {
                      opacity: 0.5,
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
                <MenuItem value="" hidden disabled />
                {data?.map(({ value, label }) => (
                  <MenuItem value={value} key={value}>
                    {label}
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
