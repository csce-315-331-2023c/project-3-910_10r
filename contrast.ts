// Kevin is worried about on-hover, and on-active. I don't think they should be black/white, but a more gray color.
// Maybe we don't need to change them idk

/**********************************************************************************/
/*                                    Customer                                    */
/**********************************************************************************/
// missing text-color-dark (on purpose)
const customerColors: string[] = [
    "--ACCENT-COLOR-DARK", "--ACCENT-COLOR", '--ACCENT-COLOR-LIGHT',
    "--GREEN-LIGHT", "--GREEN-MED", "--GREEN-MED60", '--GREEN-DARK', "--GREEN-DARK40",
    "--TEXT-COLOR-LIGHT",
    "--SIDEBAR-BG-COLOR", "--SELECTION-COLOR",
    "--ERROR-COLOR",
    "--ON-HOVER", "--ON-ACTIVE",
    "--GRAY-DARK", "--GRAY-MED", "--GRAY-LIGHT", "--GRAY-XLIGHT"
];

/* TODO: Decide which colors go into the black/white arrays */
const customerColorsDark: string[] = [];
const customerColorsLight: string[] = [];

export {customerColors, customerColorsDark, customerColorsLight};


/**********************************************************************************/
/*                                    Employee                                    */
/**********************************************************************************/
// missing text-color-dark, popup-overlay (on purpose)
const employeeColors: string[] = [
    "--ACCENT-COLOR-DARK", "--ACCENT-COLOR", '--ACCENT-COLOR-LIGHT',
    "--GREEN-LIGHT", "--GREEN-MED", "--GREEN-MED60", '--GREEN-DARK', "--GREEN-DARK40", "--GREEN-GRAY", "--RED-PINK",
    "--TEXT-COLOR-LIGHT",
    "--SIDEBAR-BG-COLOR", "--SELECTION-COLOR",
    "--ERROR-COLOR",
    "--ON-HOVER", "--ON-ACTIVE",
    "--WHITE", "--BLACK",
    "--GRAY-DARK", "--GRAY-MEDIAN", "--GRAY-LIGHT",
    "--RED", "--GREEN", "--BLUE", "--ORANGE", "--PURPLE", "--PINK", "--SKY-BLUE", "--YELLOW"
];

/* TODO: Decide which colors go into the black/white arrays */
const employeeColorsDark: string[] = ["--BLACK", "--GREEN-MED", "--RED-PINK", "--GREEN-DARK"];
const employeeColorsLight: string[] = ["--GRAY-LIGHT",
"--RED", "--GREEN", "--BLUE", "--ORANGE", "--PURPLE", "--PINK", "--SKY-BLUE", "--YELLOW", "--WHITE", "--GREEN-LIGHT"];

export {employeeColors, employeeColorsDark, employeeColorsLight};


/**********************************************************************************/
/*                                   Functions                                    */
/**********************************************************************************/

/* 
    parameters: 
    1) the array containing all of the color variable names

    returns: 
    1) an array with the orignal color values for each color variables

    NOTE: you must run this function first (and only once) to store the arrays locally
*/
export const getOrigColors = (colorVar: string[]) => {
    const origColors: string[] = [];
    colorVar.forEach((color) => {
        origColors.push(getComputedStyle(document.documentElement).getPropertyValue(color));
    });

    return origColors;
}

/* 
    parameters: 
    1) the array containing all of the color variable names
    2) the array containing all of the original color values for each color variable
*/
export const setOrigColors = (colorVar: string[], origColors: string[]) => {
    for(let i = 0; i < colorVar.length; i++) {
        document.documentElement.style.setProperty(colorVar[i], origColors[i]);
    }
}

/* 
    parameters: 
    1) the array containing all of the color variable names that will be changed to a dark color
    2) the array containing all of the color variable names that will be changed to a light color
*/
export const setContrast = (colorDark: string[], colorLight: string[]) => {
    colorDark.forEach((color) => {
        document.documentElement.style.setProperty(color, "#111");
    });
    colorLight.forEach((color) => {
        document.documentElement.style.setProperty(color, "#fafafa");
    });
}
