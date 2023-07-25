class PictureDay {
  constructor() {
    this.body = document.querySelector("body");
    this.containerImage = document.querySelector("#container-image");
    this.description = document.querySelector("#description-text");
    this.input = document.getElementById("date"); // Remova o "#" antes de "date"
    this.button = document.querySelector("#buttonEvent");
    this.buttonDescription = document.querySelector("#buttonDescription");
    this.descriptionTitle = document.querySelector("#description-title");
    this.descriptionConteiner = document.querySelector("#description");
  }

  async apiFetch(date) {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=5IojhvqZOP0pGceHvuoU2xCBgFHJq4ggzPmxanAD&date=${date}`
    );

    const data = await response.json();
    console.log(data)
    return data;
  }

  async buttonClick() {
    const inputaData = this.input.value;

    if (inputaData) {
      try {
        const data = await this.apiFetch(inputaData);
        this.containerImage.innerHTML = `<img src=${data.url} class='img-api'>`;
        this.body.style.backgroundImage = `url(${data.url})`;
        this.description.innerText = data.explanation;
        this.descriptionTitle.innerText = data.title;

        if (data.code == 404) {
            window.location.href = "error404.html"
        } else if (data.code == 400){
            window.location.href = "error400.html"
        }
      } catch (error) {
        
      }
    } else {
      let currentDate;
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      currentDate = `${year}-${month}-${day}`;
      const data = await this.apiFetch(currentDate);
      this.containerImage.innerHTML = `<img src=${data.url}>`;
      this.body.style.backgroundImage = `url(${data.url})`;
      this.description.innerText = data.explanation;
      this.descriptionTitle.innerText = data.title;
    }
  }

  showDescription() {
    this.show = !this.show;

    if (this.show) {
      this.descriptionConteiner.style.display = "flex";
    } else {
      this.descriptionConteiner.style.display = "none";
    }
  }

  async iniciar() {
    await this.buttonClick();
    this.button.addEventListener("click", this.buttonClick.bind(this));
    this.buttonDescription.addEventListener(
      "click",
      this.showDescription.bind(this)
    );
  }
}

const pictureDay = new PictureDay();
pictureDay.iniciar();
