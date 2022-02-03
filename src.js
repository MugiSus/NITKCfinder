const ContainerElement = document.getElementById("container");

class Floor {
    constructor(imgsrc, z) {
        this.imgsrc = imgsrc;
        this.z = z;

        this.DOMElement = document.createElement("img");
        this.DOMElement.classList.add("map");
        this.DOMElement.src = "./img/" + imgsrc + ".svg";

        ContainerElement.appendChild(this.DOMElement);
        floorsCollection.set(this.imgsrc, this);

        this.unfocus();
    }

    translate(facilityx, facilityy, scrollx, scrolly, scrollz) {
        this.DOMElement.style.transform = `translate3d(${-scrollx + facilityx}px, ${-scrolly + facilityy}px, ${-scrollz + this.z * 40}px)`;
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
    constructor(facilities, scrollx, scrolly, scrollz) {
        this.facilities = facilities;
        this.scrollx = scrollx;
        this.scrolly = scrolly;
        this.scrollz = scrollz;
    }
    
    scroll(scrollx, scrolly, scrollz) {
        this.scrollx = scrollx ?? this.scrollx;
        this.scrolly = scrolly ?? this.scrolly;
        this.scrollz = scrollz ?? this.scrollz;
        this.facilities.forEach(facility => 
            facility.translate(this.scrollx, this.scrolly, this.scrollz)
        );
    }
}

const floorsCollection = new Map();
const facilities = [
    new Facility("Education Building", 0, 0, [
        new Floor("education-building-1f", -1),
        new Floor("education-building-2f", 0),
        new Floor("education-building-3f", 1),
        new Floor("education-building-4f", 2),
    ])
];

const cam = new CameraPropeties(facilities, 0, 0, 0);
cam.scroll();