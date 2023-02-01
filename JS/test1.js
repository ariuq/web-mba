
let GeneralModel = ''
let  values = [];
let  values1 = [];

function getCheckedCheckboxesFor() {
    values = [];
    values1 = [];
    
    var checkboxes = document.querySelectorAll('input[name="checkbox"]:checked')
    let checkboxes1 = document.querySelectorAll('input[name="checkbox1"]:checked')

    Array.prototype.forEach.call(checkboxes, function(el) {
        values.push(el.value);
    });

    Array.prototype.forEach.call(checkboxes1, function(el) {
        values1.push(el.value);
    });
    classifybyname(GeneralModel)

    // return values;
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



async function classifybyname(name){

    GeneralModel = name;

    let element = document.getElementById("mycars");
    const parent = document.getElementById("mycars")
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
    
    // l.innerHTML = ''
    const prepare_one_block = (e) => {
      const modelNames = new MyModel(e.modelName).render();
      const cars = e.cars
        .map((car) => new MyCar(car.id, car.name, car.price, car.img).render())
        .reduce((p, c) => p + c, ''); // 3car aa zalgaj baigaa 1string
      return modelNames + cars; //1model 3car 
    };
    
    const response = await fetch('https://api.jsonbin.io/v3/b/637b3aab2b3499323b05e489'); //json ruuga handaad responce awna
    const result = await response.json(); //json bolgono ene dotor metadata, record gsn 2 element bga
    const records = result.record; //bidnii data recordd ni bga tul recordiig ni awch baigaa
    console.log(records)
    if (records.length > 0 ){
        var k = []
        records.map(item=>{
            var as = {}
            as['modelName'] = item.modelName;
            var lss = [];

            if(values.length >0){
               
                if(values.includes(item.modelName.toLowerCase())){
                    console.log(values)
                    item.cars.map(el=>{
                        if( el.name.toUpperCase().includes(GeneralModel.toUpperCase())){
                            lss.push(el);
                        }
                    })
                }
            } else {
                if(GeneralModel == "newmodel"){
                        if(item.modelName == "Cabriolets") {
                            item.cars.map(el=>{
                                
                                    lss.push(el);
                                
                    })
                        }
                } else {

                    item.cars.map(el=>{
                            if( el.name.toUpperCase().includes(GeneralModel.toUpperCase())){
                                lss.push(el);
                            }
                })
                    
                }
            }

            
        if(lss.length>0){
            as['cars'] = lss;
            k.push(as);
          }
          
        })
      const helloworld = k.map(e=>{
        return prepare_one_block(e)
      }).reduce((p, c) => p + c, '');
      
      element.insertAdjacentHTML('beforeend', helloworld); 
    } else {
      
    }
  }

