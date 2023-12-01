import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button, TableCell, TableRow } from "@mui/material";
import ROUTES from "../../../../constants/routeConstants";
import CampItemActions from "./campItemActions/campItemActions";

CampItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

function CampItem({ item, index }) {
  const nav = useNavigate();
  return (
    <TableRow>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">{item.name}</TableCell>
      <TableCell align="center">
        <Button
          color="purple"
          variant="outlined"
          onClick={() => {
            nav(`${ROUTES.OUTPOSTS}/camp/${item.id}/${item.name}`);
          }}
        >
          עמדות
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          color="brown"
          variant="outlined"
          onClick={() => {
            nav(ROUTES.GUARDS,{state:{campId: item.id}})
          }}
        >
          שומרים
        </Button>
      </TableCell>

      {/* action btns */}
      <TableCell
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CampItemActions item={item} />
      </TableCell>
    </TableRow>
  );
}

export default CampItem;
