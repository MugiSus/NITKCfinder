class Floor {
    constructor(imgsrc, z) {
        this.imgsrc = "./img/" + imgsrc;
        this.z = z;
    }
}

class Facility {
    constructor(name, x, y, floors) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.floors = floors;
    }
}

const Facilities = [
    new Facility("Education Building", 0, 0, [
        new Floor("education-building-1f.svg", -1),
        new Floor("education-building-2f.svg", 0),
        new Floor("education-building-3f.svg", 1),
        new Floor("education-building-4f.svg", 2),
    ])
]

const containerElement = document.getElementById("container");

Facilities.forEach(facility => {
    facility.floors.forEach(floor => {
        const mapElement = document.createElement("img");

        mapElement.classList.add("map");
        mapElement.src = floor.imgsrc;
        mapElement.style.transform = `translate(${facility.x + floor.z * 10}px, ${facility.y + floor.z * -10}px)`;

        console.log(mapElement.style.transform);

        containerElement.appendChild(mapElement);
    })
});