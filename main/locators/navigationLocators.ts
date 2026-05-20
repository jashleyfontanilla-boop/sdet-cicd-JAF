import { execPath } from "process";

export const navLocators = {
     home: {
        alttext: "Stratpoint"

    },
    contactUs: {
        role: "link" as const,
        text: {name: "Contact Us"}
    },
    portfolio: {
        role: "link" as const,
        text: {name: "Portfolio", exact:true}
    }

}