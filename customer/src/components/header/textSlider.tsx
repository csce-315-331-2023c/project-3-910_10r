function TextSlider() {
    const fontSizes = ["--FONT-LARGE", "--FONT-MED-LARGE", "--FONT-MED", "--FONT-MED-NORMAL", "--FONT-NORMAL", "--FONT-SMALL"];
    const fontSizesRoot= ['4', '3', '2', '1.5', '1', '0.5'];

  const updateFont = () => {
    fontSizes.forEach((font, index) => {
      const slider = document.querySelector("#slider") as HTMLInputElement;
      let sliderPercentage = Number(slider?.value);

      let newValue = Number(fontSizesRoot[index]) * ((sliderPercentage + 50) / 100);
      document.documentElement.style.setProperty(font, `${newValue}rem`);
    });
  }

  return (
    <form className="textslider" action="">
        <label htmlFor="slider"></label>
        <input type="range" id="slider" name="slider" onChange={updateFont}/>
    </form>
  )
}

export default TextSlider;