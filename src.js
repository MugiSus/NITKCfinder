class Floor {
    constructor(imgsrc, z) {
        this.imgsrc = imgsrc;
        this.z = z;

        this.DOMElement = document.createElement("img");
        this.DOMElement.classList.add("map");
        this.DOMElement.src = "./img/" + imgsrc + ".svg";

        containerElement.appendChild(this.DOMElement);
        floorsCollection.set(this.imgsrc, this);

        this.unfocus();
    }

    applyHTMLElement(DOMElement) {
        this.DOMElement = DOMElement;
        this.unfocus();
        return DOMElement;
    }

    translate(x, y, scrollx, scrolly, scrollz) {
        this.DOMElement.style.transform = `translate3d(${-scrollx + x}px, ${-scrolly + y}px, ${-scrollz + this.z * 40}px)`;
        console.log(this.DOMElement.style.transform);
    }

    focus() {
        this.DOMElement.style.opacity = 1;
        return this.focused = true;
    }
    
    unfocus() {
        this.DOMElement.style.opacity = 0.1;
        return this.focused = false;
    }
}

class Facility {
    constructor(name, x, y, floors) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.floors = floors;
    }

    translate(scrollx, scrolly, scrollz) {
        this.floors.forEach(floor => 
            floor.translate(this.x, this.y, scrollx, scrolly, scrollz)
        )
    }
}

class CameraPropeties {
    constructor(_scrollx, _scrolly, _scrollz) {
        this._scrollx = _scrollx;
        this._scrolly = _scrolly;
        this._scrollz = _scrollz;
    }

    scroll() {
        facilities.forEach(facility => 
            facility.translate(this._scrollx, this._scrolly, this._scrollz)
        );
    }

    get scrollx() {return this._scrollx}
    get scrolly() {return this._scrolly}
    get scrollz() {return this._scrollz}

    set scrollx(value) {this._scrollx = value; this.scroll()}
    set scrolly(value) {this._scrolly = value; this.scroll()}
    set scrollz(value) {this._scrollz = value; this.scroll()}
}

let cam = new CameraPropeties(0, 0, 0);
const floorsCollection = new Map();

const containerElement = document.getElementById("container");
const facilities = [
    new Facility("Education Building", 0, 0, [
        new Floor("education-building-1f", -1),
        new Floor("education-building-2f", 0),
        new Floor("education-building-3f", 1),
        new Floor("education-building-4f", 2),
    ])
];

cam.scroll();