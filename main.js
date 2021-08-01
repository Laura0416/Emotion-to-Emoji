Webcam.set({
    width: 350,
    height: 250,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured-image' src = '" + data_uri + "'/>";
    });
}

console.log("hello");

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6TZtTz9x3/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_1 = "The first prediction is " + prediction_1;
    speak_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_1 + speak_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured-image");
    classifier.classify(img, getResult);
}

function getResult(error, result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("emotion_name").innerHTML = result[0].label;
        document.getElementById("emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        
        if(result[0].label == "Happy"){
            console.log("happy")
            document.getElementById("emotion_emoji").innerHTML = "&#128522;";
        }
        if(result[0].label == "Sad"){
            document.getElementById("emotion_emoji").innerHTML = "&#128532;";
        }
        if(result[0].label == "Angry"){
            document.getElementById("emotion_emoji").innerHTML = "&#128548;";
        }

        if(result[1].label == "Happy"){
            console.log("happy")
            document.getElementById("emotion_emoji2").innerHTML = "&#128522;";
        }
        if(result[1].label == "Sad"){
            document.getElementById("emotion_emoji2").innerHTML = "&#128532;";
        }
        if(result[1].label == "Angry"){
            document.getElementById("emotion_emoji2").innerHTML = "&#128548;";
        }
    }
}