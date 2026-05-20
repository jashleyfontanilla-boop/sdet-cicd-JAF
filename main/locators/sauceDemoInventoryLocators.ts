export const sauceDemoInventoryLocators = {
     addToCartBackpackButton: {
    testId: "add-to-cart-sauce-labs-backpack"
    },
    removeButton: {
        role: "button" as const,
        text: {name:"Remove"}
    },
    removeBackpackButton: {
        role: "button" as const,
        text: {name:"Remove"}
    },
    filterDropdown: {
        role: "combobox" as const
    },
    cartButton: {
        role: "textbox" as const,
        text: {name: "Username"}
    }


};