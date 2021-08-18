img1 = ""
objects = []
status = ""

function preload() {
    img1 = loadImage('dog_cat.jpg')
}

function setup() {
    canvas = createCanvas(600, 400)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "status : detecting Objects"
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
    objectDetector.detect(img1, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img1, 0, 0, 600, 400)
    if (status != "") {
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected";
            fill("#FF0000");
            percentage = floor(objects[i].confidence*100)
            text(objects[i].label + " " + percentage + "%",objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height) ;

        }
    }
}