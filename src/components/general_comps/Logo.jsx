/* eslint-disable react/no-unescaped-entities */
import imgSoldier from '/images/soldier.png';
import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ROUTES from "@/constants/routeConstants.js";

export default function Logo() {
  return (
    <Link component={RouterLink} className="logo-comp" to={ROUTES.HOME} title="חזור לדף הבית" color="#fff" underline="none">
      <img src={imgSoldier} alt="imgSoldier" width={35} />
      <Typography variant="h1" sx={{ py: 1.2, color: "#fff" }}>שבצ"ק</Typography>
    </Link>
  )
}
