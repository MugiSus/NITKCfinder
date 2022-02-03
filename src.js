class Floor {
    constructor(imgsrc, z) {
        this.imgsrc = "./img/" + imgsrc;
        this.z = z;
        this.focused = true;
        this.DOMElement;
    }

    applyHTMLElement(DOMElement) {
        this.DOMElement = DOMElement;
    }

    translate(x, y, scrollx, scrolly, scrollz) {
        this.DOMElement.style.transform = `translate3d(${-scrollx + x}px, ${-scrolly + y}px, ${-scrollz + this.z * 40}px)`;
        console.log(this.DOMElement.style.transform);
    }

    setFocused(focused) {
        this.focused = focused;
        this.DOMElement.style.opacity = focused ? 1 : 0.1;
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

let scrollx = -200, scrolly = 0, scrollz = 0;

const Facilities = [
    new Facility("Education Building", 0, 0, [
        new Floor("education-building-1f.svg", -1),
        new Floor("education-building-2f.svg", 0),
        new Floor("education-building-3f.svg", 1),
        new Floor("education-building-4f.svg", 2),
    ])
];

const containerElement = document.getElementById("container");

Facilities.forEach(facility => {
    facility.floors.forEach(floor => {
        const mapElement = document.createElement("img");
        mapElement.classList.add("map");
        mapElement.src = floor.imgsrc;
        containerElement.appendChild(mapElement);

        floor.applyHTMLElement(mapElement);
    })
    facility.translate(scrollx, scrolly, scrollz);
});