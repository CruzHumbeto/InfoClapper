/**
 * Converts a string to PascalCase.
 * Example: "menu-icon" -> "MenuIcon", "search" -> "Search"
 * @param {string} value - The string to convert
 * @returns {string} - The converted string
 */
export const toPascalCase = (value) => 
    value.replace(/(^\w|[\s-_]\w)/g, (segment) => 
        segment.replace(/^[\s-_]/, "").toUpperCase()
    );
