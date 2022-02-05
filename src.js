const ContainerElement = document.getElementById("container");

class Floor {
    constructor(imgsrc, z) {
        this.imgsrc = imgsrc;
        this.z = z;
        floorsCollection.set(this.imgsrc, this);

        this.DOMElement = document.createElement("img");
        this.DOMElement.classList.add("map");
        this.DOMElement.src = "./img/" + imgsrc + ".svg";
        this.DOMElement.style.zIndex = z;

        ContainerElement.appendChild(this.DOMElement);

        this.unfocus();
    }

    translate(facilityx, facilityy, scrollx, scrolly, scrollz) {
        this.DOMElement.style.transform = `translate3d(${-scrollx + facilityx}px, ${-scrolly + facilityy}px, ${-scrollz + this.z * 40}px)`;
        console.log(this.DOMElement.style.transform);
    }

    focus() {
        this.DOMElement.classList.add("focused");
        this.DOMElement.classList.remove("unfocused");
        return this.focused = true;
    }
    
    unfocus() {
        this.DOMElement.classList.remove("focused");
        this.DOMElement.classList.add("unfocused");
        return this.focused = false;
    }

    toggleFocus(force) {
        return force ?? !this.focused ? this.focus() : this.unfocus();
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

    focusFloors(z) {
        this.facilities.forEach(facility => 
            facility.floors.forEach(floor => 
                floor.toggleFocus(floor.z == z) && 
                console.log(floor.imgsrc)
            )
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
    ]),
    new Facility("Education-Research Passage", 800, -195, [
        new Floor("education-research-passage", 0),
    ]),
    new Facility("Research Building", -700, -1325, [
        new Floor("research-building-1f", 0),
        new Floor("research-building-2f", 1),
        new Floor("research-building-3f", 2),
        new Floor("research-building-4f", 3),
    ]),
    new Facility("Reserch Building No.3", 185, -1900, [
        new Floor("research-building-no3-1f", 0),
        new Floor("research-building-no3-2f", 1),
        new Floor("research-building-no3-3f", 2),
        new Floor("research-building-no3-4f", 3),
        new Floor("research-building-no3-5f", 4),
    ])
];

const cam = new CameraPropeties(facilities, 0, 0, 0);
//cam.scroll();

cam.scroll(-250, -1000, 2000);
cam.focusFloors(0);