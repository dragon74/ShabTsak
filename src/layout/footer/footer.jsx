import { Box, Container } from "@mui/material";

export default function Footer() {
  return (
    // Push the footer to the bottom
    <Container style={{ marginTop: "auto" }} >
      <Box textAlign={"center"} >
        <p>2023 Chaya Segal & Dan & Hadas ©</p>
      </Box>
    </Container>
  )
}
