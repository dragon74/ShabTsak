import { Typography, Box, Container } from "@mui/material";
import ROUTES from "../../constants/routeConstants.js";
import BackLink from "../general_comps/backLink.jsx";

export default function PrivacyPage() {
    return (
        <Container sx={{ mt: 4.5 }} disableGutters>
            <Box as="header" sx={{ mx: { sm: 2 }}}>
                <BackLink to={ROUTES.HOME}>חזרה לעמוד הבית</BackLink>
                <Typography variant="h2" align="center" sx={{ mt: { sm: -4.5 }}}>תנאי פרטיות</Typography>
            </Box>
            <Box as="article" sx={{ mx: { sm: 4, xs: 3 }, mt: { sm: 4, xs: 3 }}}>
                <Box component="section" sx={{ mb: 2 }}>
                    <Typography variant="h3" gutterBottom>איך אנחנו משתמשים במידע?</Typography>
                    <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolores laboriosam mollitia nam omnis ratione sed velit. Aperiam at
                        cumque debitis, dolore dolores, esse ipsum molestias praesentium reiciendis, repellat vero.
                        Aliquid aspernatur atque dolore dolorem ducimus ea earum eligendi est et fuga fugit illo impedit ipsam, magnam molestias, mollitia nemo
                        nesciunt numquam officia, quisquam reiciendis repellendus sit veniam veritatis voluptas?
                    </Typography>
                    <Typography variant="body1" gutterBottom>Ad, architecto at aut cum expedita maiores, mollitia necessitatibus non quod reiciendis repellendus ut! Accusamus consequatur et
                        praesentium sed sunt? Aut dolorem eligendi enim, id magnam natus perspiciatis saepe. Cumque.
                    </Typography>
                    <Typography variant="body1" gutterBottom>Aperiam atque beatae corporis, cum deleniti dicta dolores error esse fugit in ipsum, laudantium officiis quia repellat temporibus tenetur
                        velit voluptatibus voluptatum! Aliquid blanditiis dolorem excepturi impedit possimus ratione voluptatum.
                        Ab ad atque, cum ducimus iusto magnam, officia quaerat quia, saepe suscipit veritatis voluptates. Architecto delectus eaque eius eligendi
                        est impedit, incidunt iste mollitia nobis, non odit, quisquam veniam vero?
                    </Typography>
                </Box>
                <Box component="section">
                    <Typography variant="h3" gutterBottom>עוד כותרת</Typography>
                    <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolores laboriosam mollitia nam omnis ratione sed velit. Aperiam at
                        cumque debitis, dolore dolores, esse ipsum molestias praesentium reiciendis, repellat vero.
                    </Typography>
                    <Typography variant="body1" gutterBottom>Aliquid aspernatur atque dolore dolorem ducimus ea earum eligendi est et fuga fugit illo impedit ipsam, magnam molestias, mollitia nemo
                        nesciunt numquam officia, quisquam reiciendis repellendus sit veniam veritatis voluptas?
                    </Typography>
                    <Typography variant="body1" gutterBottom>Ad, architecto at aut cum expedita maiores, mollitia necessitatibus non quod reiciendis repellendus ut! Accusamus consequatur et
                        praesentium sed sunt? Aut dolorem eligendi enim, id magnam natus perspiciatis saepe. Cumque.
                    </Typography>
                    <Typography variant="body1" gutterBottom>Aperiam atque beatae corporis, cum deleniti dicta dolores error esse fugit in ipsum, laudantium officiis quia repellat temporibus tenetur
                        velit voluptatibus voluptatum! Aliquid blanditiis dolorem excepturi impedit possimus ratione voluptatum.
                    </Typography>
                    <Typography variant="body1" gutterBottom>Ab ad atque, cum ducimus iusto magnam, officia quaerat quia, saepe suscipit veritatis voluptates. Architecto delectus eaque eius eligendi
                        est impedit, incidunt iste mollitia nobis, non odit, quisquam veniam vero?
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}