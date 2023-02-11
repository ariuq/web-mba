
let GeneralModel = ''// all models bainga bairshina
let  values = [];    // checkbox had array

function getCheckedCheckboxesFor() { // check box function
    values = [];
    
    var checkboxes = document.querySelectorAll('input[name="checkbox"]:checked') // 1 elementeer guilgne

    Array.prototype.forEach.call(checkboxes, function(el) {
        values.push(el.value); 
    }); // checkbox darahad ajilna, values-d pushlene

    classifybyname(GeneralModel) // return values;
}
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
async function classifybyname(name){ //async-paralellaar dataga avna

    GeneralModel = name; //parametr damjuulna-->global huvisagch

    let element = document.getElementById("mycars");  //render html
    const parent = document.getElementById("mycars")  
    while (parent.firstChild) {     //parent class dtrh function
        parent.firstChild.remove()
    }                               //utga butsaah remove function
    const prepare_one_block = (e) => { 
      const modelNames = new MyModel(e.modelName).render();
      const cars = e.cars
        .map((car) => new MyCar(car.id, car.name, car.price, car.img).render())
        .reduce((p, c) => p + c, ''); // 3 car aa zalgaj baigaa 1 string
      return modelNames + cars; // 1 model 3 car 
    };
    
    const response = await fetch("https://maralaaback-i2rl.vercel.app/cardata"); //json ruuga handaad responce awna
    const result = await response.json();//json bolgono
    console.log(result); //console data garna
    const records = result;
    console.log(records)
    if (records.length > 0 ){ //records ni hoosn bish bvl maplana
        var k = []
        records.map(item=>{ 
            var as = {}
            as['modelName'] = item.modelName;
            var lss = []; //lss=1 car

            if(values.length >0){ //checkbox hooson bish bvl haih function
                if(values.includes(item.modelName.toLowerCase())){
                    console.log(values)
                    item.cars.map(el=>{
                        if( el.name.toUpperCase().includes(GeneralModel.toUpperCase())){
                            lss.push(el);
                        }
                    })
                }
            } else { //hooson bvl 
                if(GeneralModel == "newmodel"){
                        if(item.modelName == "Cabriolets") {
                            item.cars.map(el=>{   
                                    lss.push(el);
                            })
                        }
                } else { //model dotorh car haih
                    item.cars.map(el=>{
                            if( el.name.toUpperCase().includes(GeneralModel.toUpperCase())){
                                lss.push(el);
                            }
                    })
                }
            }

        if(lss.length>0){// el=mashin medeelel bvl cars pushlene
            as['cars'] = lss; //cars dtr elementeer ylgarsn bgaa
            k.push(as);
          } 
        })
      const helloworld = k.map(e=>{ 
        return prepare_one_block(e) //line line-aar uzuulne 
      }).reduce((p, c) => p + c, '');
      element.insertAdjacentHTML('beforeend', helloworld); // insert hiine html
    }
  }

