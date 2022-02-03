class Floor {
    constructor(imgsrc, z) {
        this.id = imgsrc;
        this.imgsrc = "./img/" + imgsrc + ".svg";
        this.z = z;
        this.DOMElement = null;
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
        this.focused = true;
        this.DOMElement.style.opacity = 1;
        return this.focused;
    }
    
    unfocus() {
        this.focused = false;
        this.DOMElement.style.opacity = 0.1;
        return this.focused;
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

const facilities = [
    new Facility("Education Building", 0, 0, [
        new Floor("education-building-1f", -1),
        new Floor("education-building-2f", 0),
        new Floor("education-building-3f", 1),
        new Floor("education-building-4f", 2),
    ])
];

const containerElement = document.getElementById("container");

facilities.forEach(facility => {
    facility.floors.forEach(floor => {
        const mapElement = document.createElement("img");
        mapElement.classList.add("map");
        mapElement.src = floor.imgsrc;
        containerElement.appendChild(mapElement);

        floor.applyHTMLElement(mapElement);
        floorsCollection.set(floor.id, floor);
    })
});

cam.scroll();