
class MyModel{
    constructor(modelName){
        this.modelName =modelName;
    }
    render(){
        return `<article>
        <h2>${this.modelName}</h2>
        <br>
        </article>`
    }
    Bind(eventType, element, property ) { 
        gebi(`${element}_${this.id}`).addEventListener(eventType, (event) => {
            this[property] = event.target.innerHTML;
            recentCars._hasChanged = true;
            console.log(`event:${event} this=${JSON.stringify(recentCars)}`);
        })
        return this;
    }
}
class MyCar 
{
    constructor( id, name, price, img) 
    {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
    }

    render()
    {
        return `<article>
            <big><b>${this.name}</b></big>
            <p>OTR price starting from £${this.price}</p>
            <a href="carMore.html"><img src="${this.img}" alt="mercedes-benz cars" style="width:30%; height:auto;"></a>
            <button>Test drive</button>
            </article>`;
    }
    Bind(eventType, element, property ) { 
        gebi(`${element}_${this.id}`).addEventListener(eventType, (event) => {
            this[property] = event.target.innerHTML;
            recentCars._hasChanged = true;
            console.log(`event:${event} this=${JSON.stringify(recentCars)}`);
        })
        return this;
    }
}
// function getUrl(url) {
//     var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
//     var obj = {};
//     if(queryString){
//         queryString = queryString.split('#')[0];
//         var arr = queryString.slice('&');
//         for(var i=0; i< arr.length; i++){
//             var a= arr[i].split('=');
//             var paramName = a[0];
//             var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
//             paramName = paramName.toLowerCase();
//             if(typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
//             if(paramName.match(/\[(\d+)?\}$/)){
//                 var key = paramName.match(/\[(\d+)?\}$/);
//                 if(!obj[key]) obj[key]=[];
//                 if(paramName.match(/\[(\d+)?\}$/)){
//                     var index = /\[(\d+)?\}$/.exec(paramName)[1];
//                     obj[key][index] =paramValue;
//                 } else{
//                     obj[key].push(paramValue);
//                 }
//             }else{
//                 if(!obj[paramName]){
//                     obj[paramName]=paramValue;
//                 } else if(obj[paramName] && typeof obj[paramName] === 'string'){
//                     obj[paramName]= [obj[paramName]];
//                     obj[paramName].push(paramValue);
//                 } else{
//                     obj[paramName].push(paramValue);
//                 }
//             }
//         }
//     }
//     return obj;
// }
export default class carModels{
    constructor(recentCarsUrl)
    {
        this._recentmodelList = [];
        this._recentCarsList=[]
        this._recentCarsUrl = recentCarsUrl; 
        this._hasChanged = false;
    }
    Upload() { 
        if (this._hasChanged) { 
            fetch(this._recentCarsUrl,
                {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'versioning' : false
                },
                body: JSON.stringify(this._recentCarsList)
            })
                .then(response => { console.log(response.status); })
                .catch(err => { console.log(err) });
            this._hasChanged = false;
        }
    }
   
    Download(targetElement)
    { 
        fetch(`${this._recentCarsUrl}/latest`)
        .then(result=>{result.json() 
            .then(console.log())
                   .then(jsob=> {
                    //    console.log()
                        const filtercar1 = jsob.record.filter(function(element){
                               return true;
                        });
                        console.log(filtercar1)
                        if(filtercar1.length > 0)
                        {
                            if(filtercar1.length>0){
                                  gebi(targetElement).insertAdjacentHTML("afterbegin",
                                  filtercar1
                                    .map(element =>{
                                        const _map = new MyModel(element.modelName);
                                        gebi(targetElement).insertAdjacentHTML("afterbegin",
                                        element.cars.map(el=>{
                                            const _mp = new MyCar(el.id, el.name, el.price, el.img)
                                            return _mp.render();
                                        })
                                        .reduce((pre, cur)=> pre+cur ,"")
                                        )
                                        console.log(element)
                                        return _map.render();
                                    })
                                    .reduce((p,c)=> p+c ,"")
                                  );
                            }
                            
                        }
                        // this._recentCarsList.forEach(element=> element.Bind("input", "recentnews_title", "title"));

            })
         })
        .catch(err =>{
            console.log(err)
        console.log("error catch")}
        )
    }
};

const gebi = id => document.getElementById(id);

const recentCars = new carModels("https://api.jsonbin.io/v3/b/637b3aab2b3499323b05e489");

recentCars.Download("cars");