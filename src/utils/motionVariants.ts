import type { Variants } from "framer-motion";

export const delayedVariant = (variant: VariantType, delayMs: number): Variants => {
    return {
        ...variant,
        animate: {
            ...variant.animate,
            transition: {
                ...variant.animate.transition,
                delay: delayMs / 1000,
            },
        }
    }
}
type VariantType = typeof riseWithFade | typeof staggerChildren | typeof wordAnimation;
export const riseWithFade = {
    initial: {
        y: 100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            ease: [0.6, 0.01, 0.05, 0.95],
            duration: 0.7
        },
    }
} as const;
export const staggerChildren = {
    animate: {
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.1,
        },
    },
} as const;

export const wordAnimation = {
    initial: {
        y: 100,
    },
    animate: {
        y: 0,
        transition: {
            ease: [0.6, 0.01, 0.05, 0.95],
            duration: 1,
        },
    },
} as const;