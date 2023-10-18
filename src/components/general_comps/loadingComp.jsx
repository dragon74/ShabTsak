import { CircularProgress } from '@mui/material';

export default function LoadingComp() {
    return (
        <div style={{ display: "flex", alignItems: "center"}}>
            <div style={{ margin: "0 auto" }}>
                <CircularProgress size={"50px"} />
            </div>
        </div>
    )
}
