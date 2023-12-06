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

    const handleFormSubmit = (event: React.FormEvent) => {
      event.preventDefault();
    };

    const handleClick = (event: React.FormEvent) => {
      event.stopPropagation();
    };


    return (
      <form className="textslider" action="" onSubmit={handleFormSubmit}>
          <label htmlFor="slider" className="offscreen"></label>
          <input type="range" id="slider" name="slider" onChange={updateFont} onClick={handleClick}/>
      </form>
    )
  }

  export default TextSlider;