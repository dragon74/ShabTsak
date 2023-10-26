import PropTypes from 'prop-types';
import { useSearchParams } from "react-router-dom";
import { CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography } from "@mui/material";
import OutpostItem from "./outpostItem";

OutpostList.propTypes = {
    outposts: PropTypes.array.isRequired,
    doApiOutposts: PropTypes.func.isRequired,
}

export default function OutpostList({ outposts, doApiOutposts }) {
    const [querys] = useSearchParams();

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" sx={{ padding: 0 }}>
                <Typography variant="h4" component="h2" mb={2}>
                    רשימת עמדות {querys.get("campName")}
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">שם</TableCell>
                                <TableCell align="center">מינימום שומרים</TableCell>
                                <TableCell align="center">רשימת משמרות</TableCell>
                                <TableCell align="center">פעולות</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {outposts.map((item, i) => {
                                return (
                                    <OutpostItem key={item.id} doApiOutposts={doApiOutposts} index={i} item={item} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

