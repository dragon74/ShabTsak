import * as yup from "yup"

export const guardDialogSchema = yup
    .object({
        name: yup.string().required("חובה למלא שם").min(2, "שם חייב להיות לפחות 2 אותיות"),
        mail: yup.string().required("חובה למלא אי-מייל").email("אי-מייל אינו תקין"), // .match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        phone: yup.string().required("חובה למלא מספר טלפון").min(9, "מספר טלפון חייב להכיל לפחות 9 תווים").max(13, "מספר טלפון עד 13 תווים"),
        shouldBeAllocated: yup.bool().default(false)
    })
    .required()