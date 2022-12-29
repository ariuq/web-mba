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
              <a href="carMore.html"><img src="${this.img}" alt="mercedes-benz cars"></a>
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
      const response = await fetch(this._recentCarsUrl); //json ruuga handaad responce awna
      const result = await response.json(); //json bolgono ene dotor metadata, record gsn 2 element bga
      const records = result.record; //bidnii data recordd ni bga tul recordiig ni awch baigaa
      // Define cars div
      const cars_div = gebi(targetElement); //gebi ni get element by id gsn function
      console.log(cars_div)
      // Parse url 
      const queryString = window.location.search; //Hailtan dr baigaa Url ee querystringd awna
      const urlParams = new URLSearchParams(queryString); //url ee zadlana
      const modelName = urlParams.get('modelName'); //zadalsan url dre modelName iig awna
      // model bolon carsuudaa ng ng buhel bolgoj baigaa function
      const prepare_one_block = (e) => {
        const modelNames = new MyModel(e.modelName).render();
        const cars = e.cars
          .map((car) => new MyCar(car.id, car.name, car.price, car.img).render())
          .reduce((p, c) => p + c, ''); // 3car aa zalgaj baigaa 1string
        return modelNames + cars; //1model 3car 
      };
      // Core function
      if (records) {
        const input_html = records
          .map((e) =>
            queryString
              ? modelName === e.modelName   //shalgah gj bga uildel ? uildel unen  baiwal hiih zuils : uildel hudal baiwal hiih zuils
                ? prepare_one_block(e)  //modelName ni taarsan modeliin mashinuud garch irne
                : '' //ngch mashin garch irehgui
              : prepare_one_block(e) // buh modeliin mashinuud garch irne
          )
          .reduce((p, c) => p + c, ''); //model mashin zalgatsn bgagudaa hoorond ni zalgana
          // document.getElementById('mycars).insertAdjacentHTML('mycarsiin haana ni bailgah bairlal', ter bairlald hiih gj bga html) 
        cars_div.insertAdjacentHTML('beforeend', input_html); 
      }
    }
  }
  const gebi = (id) => document.getElementById(id);
  const recentCars = new carModels(
    'https://api.jsonbin.io/v3/b/637b3aab2b3499323b05e489'
  );
  recentCars.Download('mycars');
