export { AnimatedWords }
import { staggerChildren, wordAnimation } from "@/utils/motionVariants.ts";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function AnimatedWords({ title }) {
    return (
        <motion.span variants={staggerChildren} style={{ fontSize: "inherit" }}>
            {title.split(" ").map((word, idx) => (
                <div key={idx} style={{ display: "inline-block", overflow: "hidden", fontSize: "inherit" }}>
                    <motion.span
                        style={{ display: "inline-block", overflow: "hidden", fontSize: "inherit" }}
                        variants={wordAnimation}
                    >
                        {word + "\u00A0"}
                    </motion.span>
                </div>
            ))}
        </motion.span>
    );
}

AnimatedWords.propTypes = {
    title: PropTypes.string.isRequired,
}