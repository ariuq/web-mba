
class MyModel {
    constructor(modelName) {
      this.modelName = modelName;
    }
    render() {
      return `<article class="carmodels">
          <h2>${this.modelName}</h2>
          <br>
          </article>`;
    }
  }
  class MyCar {
    constructor(id, name, price, img) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.img = img;
    }
    render() {
      return `<article class="car">
              <big><b>${this.name}</b></big>
              <p>OTR price starting from £${this.price}</p>
              <a href="carMore.html"><img src="${this.img}" alt="mercedes-benz cars" style="width:30%; height:auto;"></a>
              <button>Test drive</button>
              </article>`;
    }
  }
  export default class carModels {
    constructor(recentCarsUrl) {
      this._recentCarsUrl = recentCarsUrl;
    }
  
    async Download(targetElement) {
      // Send request and collect record
      const response = await fetch(this._recentCarsUrl);
      const result = await response.json();
      const records = result.record;
      // Define cars div
      const cars_div = gebi(targetElement);
      // Parse url
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const modelName = urlParams.get('modelName');
      // Helper function
      const prepare_one_block = (e) => {
        const modelNames = new MyModel(e.modelName).render();
        const cars = e.cars
          .map((car) => new MyCar(car.id, car.name, car.price, car.img).render())
          .reduce((p, c) => p + c, '');
        return modelNames + cars;
      };
      // Core function
      if (records) {
        const input_html = records
          .map((e) =>
            queryString
              ? modelName === e.modelName
                ? prepare_one_block(e)
                : ''
              : prepare_one_block(e)
          )
          .reduce((p, c) => p + c, '');
        cars_div.insertAdjacentHTML('beforeend', input_html);
      }
    }
  }
  const gebi = (id) => document.getElementById(id);
  const recentCars = new carModels(
    'https://api.jsonbin.io/v3/b/637b3aab2b3499323b05e489'
  );
  recentCars.Download('cars');