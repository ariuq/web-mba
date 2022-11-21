class MyCarModel {
    constructor(modelName) {
        this.modelName = modelName;
    }

    render() {
        return `<article id="recentcars">
            <p class="recentCars-modelName">${this.modelName}</p>
            <hr>
        </article>`;
    }
    Bind(eventType, element, property){
        gebi(`${element}_${this.id}`).addEventListener(eventType, (event) => {
            this[property]= event.target.innerHTML;
            recentcars.__hasChanged = true;
            console.log(`event: ${event} this = ${JSON.stringify(recentcars)}`);
        })
        return this;
    }
}
class MyCar {
    constructor(name, price, img) {
        this.name = name;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<article class="cars" id="recentcars">
            <big><b class="recentCars-name">${this.name}</b></big>
            <p class="recentCars-price">OTR price starting from £${this.price}</p>
            <a href="carMore.html" class="recentCars-img"><img src="${this.img}" alt="mercedes-benz cars" style="width:30%; height:auto;"></a>
            <button>Test drive</button>
            </article>`;
    }
    Bind(eventType, element, property){
        gebi(`${element}_${this.id}`).addEventListener(eventType, (event) => {
            this[property]= event.target.innerHTML;
            recentCars.__hasChanged = true;
            console.log(`event: ${event} this = ${JSON.stringify(recentCars)}`);
        })
        return this;
    }
}

export default class carModels{
    constructor(recentCarsUrl){
        this.recentCarsList = [];
        this._recentCarsUrl = recentCarsUrl;
        this._lastUpdated = Date.now();
        this._hasChanged = false;    
    }
    Upload(){
        if (this._hasChanged) { 
            fetch(this.recentCarsUrl,
                {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'versioning' : false
                },
                body: JSON.stringify(this.recentCarsList)
            })
                .then(response => { console.log(response.status); })
                .catch(err => { console.log(err) });
    
            this._hasChanged = false;
        }
    }
    Download(targetElement) {
        fetch(`${this._recentCarsUrl}/latest`)
        .then( result => {
            result.json()
                .then(jsob => {
                        gebi(targetElement).insertAdjacentHTML("afterbegin",
                            filteredArray
                                .map(newNews => {
                                    const _newNews = new MyCarModel(newNews);
                                    this._recentCarsList.push(_newNews);
                                    return _newNews.Render();
                                })
                                .reduce((prevVal, curVal) => prevVal + curVal, "")
                        );
                    // const mappedArray=filteredArray.map(newNews => (new RecentNewsItem(newNews)).Render());
                    // gebi("main").insertAdjacentHTML("afterbegin", mappedArray.reduce((prevVal, curVal) => prevVal + curVal, ""));
            
                        
                })    
            })
        .catch(err => { console.log(err) });
        
    }
}

const gebi = id => document.getElementById(id);

const recentCars = new carModels("https://api.jsonbin.io/v3/b/637b3aab2b3499323b05e489");

recentCars.Download("main");



