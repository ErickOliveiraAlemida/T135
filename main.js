var video = ""
var status1 = ""
objects = []

function preload (){
    video = createVideo("video.mp4")
    video.hide()
}

function setup (){
    canvas = createCanvas(480, 380)
    canvas.center()
}

function draw (){
    image(video, 0, 0, 480, 380)
    if (status1 != "") {
        objectDetector.detect(video, gotResult())
        for(var i = 0; i < objects.length; i++){
            document.getElementById("Status").innerHTML = "Status: objetos detectados!"
        document.getElementById("numberofObjects").innerHTML = "Quantidade de objetos detecados: " + objects.length
            fill("#FF0000")
            porcentagem = floor(objects[i].confidence * 100)
            text(objects[i].label +  " " + porcentagem + "%", objects[i].x, objects[i].y)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function Start (){
    objectDetector = ml5.objectDetector("cocossd", modelLoad)
    document.getElementById("Status").innerHTML = "Status: identificando objetos..."
}

function modelLoad (){
    console.log("modelLoad")
    Status = true
    video.loop()
    video.speed(1)
    video.volume(0)
}

function gotResult (error, result){
    if (error){
        console.log(error)
    }else {
        console.log(results)
        objects = result
    }
}