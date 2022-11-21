class MyCarModel {
    constructor(modelName) {
        this.modelName = modelName;
    }

    render() {
        return `<article>
            <p class="">${this.modelName}</p>
            <hr>
        </article>`;
    }
}
class MyCar {
constructor(name, price, img) {
    this.name = name;
    this.price = price;
    this.img = img;
}

render() {
    return `<article>
        <big><b>${this.name}</b></big>
        <p>OTR price starting from £${this.price}</p>
        <a href="carMore.html"><img src="${this.img}" alt="mercedes-benz cars" style="width:30%; height:auto;"></a>
        <button>Test drive</button>
        </article>`;
}
}

