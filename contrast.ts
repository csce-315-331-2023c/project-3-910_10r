// Kevin is worried about on-hover, and on-active. I don't think they should be black/white, but a more gray color.
// Maybe we don't need to change them idk

/**********************************************************************************/
/*                                    Customer                                    */
/**********************************************************************************/
// missing text-color-dark (on purpose)
const customerColors: string[] = [
    "--ACCENT-COLOR-DARK", "--ACCENT-COLOR", '--ACCENT-COLOR-LIGHT',
    "--GREEN-LIGHT", "--GREEN-MED", "--GREEN-MED60", "--GREEN-DARK", "--GREEN-DARK40",
    "--TEXT-COLOR-LIGHT",
    "--SIDEBAR-BG-COLOR", "--SELECTION-COLOR",
    "--ERROR-COLOR",
    "--ON-HOVER", "--ON-ACTIVE",
    "--GRAY-DARK", "--GRAY-MED", "--GRAY-LIGHT", "--GRAY-XLIGHT", "--CONFIRM-COLOR"
];

/* TODO: Decide which colors go into the black/white arrays */
const customerColorsDark: string[] = ["--GRAY-DARK", "--GREEN-DARK"];
const customerColorsLight: string[] = ["--ACCENT-COLOR", "--ACCENT-COLOR-LIGHT", "--GRAY-XLIGHT", "--GRAY-LIGHT", "--GREEN-MED"];

export {customerColors, customerColorsDark, customerColorsLight};


/**********************************************************************************/
/*                                    Employee                                    */
/**********************************************************************************/
// missing text-color-dark, popup-overlay (on purpose)
const employeeColors: string[] = [
    "--ACCENT-COLOR-DARK", "--ACCENT-COLOR", '--ACCENT-COLOR-LIGHT',
    "--GREEN-LIGHT", "--GREEN-MED", "--GREEN-MEDIAN", "--GREEN-MED60", '--GREEN-DARK', "--GREEN-DARK40", "--GREEN-GRAY", "--RED-PINK",
    "--TEXT-COLOR-LIGHT",
    "--SIDEBAR-BG-COLOR", "--SELECTION-COLOR","--SELECTED","--GREEN-LIGHT-TO-BLACK",
    "--ERROR-COLOR",
    "--ON-HOVER", "--ON-ACTIVE",
    "--WHITE", "--BLACK",
    "--GRAY-DARK", "--GRAY-MEDIAN", "--GRAY-LIGHT",
    "--RED", "--GREEN", "--BLUE", "--ORANGE", "--PURPLE", "--PINK", "--SKY-BLUE", "--YELLOW", "--CONFIRM-COLOR", "--CONFIRM","--POPUP", "--NORMALLY-BLACK", "--NORMALLY-WHITE"
];

/* TODO: Decide which colors go into the black/white arrays */
const employeeColorsDark: string[] = ["--GREEN-DARK", "--POPUP", "--NORMALLY-WHITE"];
const employeeColorsLight: string[] = [ "--NORMALLY-BLACK","--GREEN-MED60", "--GREEN-MED", "--GREEN-LIGHT", "--ACCENT-COLOR-DARK", "--ACCENT-COLOR", '--ACCENT-COLOR-LIGHT', "--RED", "--GREEN", "--BLUE", "--ORANGE", "--PURPLE", "--PINK", "--SKY-BLUE", "--YELLOW", "--GRAY-LIGHT"];

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
    let origColors: string[] = [];

    if(sessionStorage.getItem("origColors")) {
        origColors = JSON.parse(sessionStorage.getItem("origColors")!);
    }
    else {
        colorVar.forEach((color) => {
            origColors.push(getComputedStyle(document.documentElement).getPropertyValue(color));
        });
        sessionStorage.setItem("origColors", JSON.stringify(origColors));
    }

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

    sessionStorage.setItem("contrastApplied", JSON.stringify(false));
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
    document.documentElement.style.setProperty("--CONFIRM-COLOR", "red");
    document.documentElement.style.setProperty("--ACCENT-COLOR", "red");
    document.documentElement.style.setProperty("--ACCENT-COLOR-DARK", "red");
    document.documentElement.style.setProperty("--CONFIRM", "#81aef7");
    document.documentElement.style.setProperty("--POPUP", "black");
    document.documentElement.style.setProperty("--NORMALLY-BLACK", "white");
    document.documentElement.style.setProperty("--NORMALLY-WHITE", "black");
    document.documentElement.style.setProperty("--TO-GREEN", "green");
    document.documentElement.style.setProperty("--SELECTED", "#c9c6c5");
    document.documentElement.style.setProperty("--GREEN-LIGHT-TO-BLACK", "black");
    sessionStorage.setItem("contrastApplied", JSON.stringify(true));
}
