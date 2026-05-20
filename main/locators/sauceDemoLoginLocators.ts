export const sauceDemoLoginLocators = {
    userName: {
        role: "textbox" as const,
        text: {name: "Username"}
    },
    password: {
        role: "textbox" as const,
        text: {name:"Password"}
    },
    loginButton: {
        role: "button" as const,
        text: { name: "Login" }
    },
    loginError: {
        role: "heading" as const,
        text: {name:"Epic sadface: Username and password do not match any user in this service"}
    },
    lockedOutAccount: {
        role: "heading" as const,
        text: {name:"Epic sadface: Sorry, this user has been locked out."}
    }
};