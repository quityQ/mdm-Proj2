function checkFiles(files) {
    console.log(files);

    if (files.length != 1) {
        alert("Bitte genau eine Datei hochladen.")
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu gross (max. 10Mb)");
        return;
    }

    answerPart.style.visibility = "visible";
    const file = files[0];

    // Preview
    if (file) {
        preview.src = URL.createObjectURL(files[0])
    }

    // Upload
    const formData = new FormData();
    for (const name in files) {
        formData.append("image", files[name]);
    }

/*
    fetch('/analyze', {
        method: 'POST',
        headers: {
        },
        body: formData
    }).then(
        response => {
            console.log(response)
            response.text().then(function (text) {
                answer.innerHTML = text;
            });

        }
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );
*/


    fetch('/analyze', {
        method: 'POST',
        body: formData
    }
    ).then(response => {
        return response.json();
    }).then(jsonData => {
        console.log(jsonData);
        //format the answer
        const formattedAnswer = formatAnswer(jsonData);
        document.getElementById('answer').innerHTML = formattedAnswer;
    }).then(success => {
        console.log(success);
    }).catch(error => {
        console.error(error);
    });
}

//Format the answer in a better readable way
function formatAnswer(jsonData) {
    let formattedAnswer = '';
    const sports = {
        'AmericanFootball': 'American Football',
        'Basketball': 'Basketball',
        'BikeRacing': 'Bike Racing',
        'CarRacing': 'Car Racing',
        'Fighting': 'Fighting',
        'Hockey': 'Hockey',
        'Soccer': 'Soccer',
        'TableTennis': 'Table Tennis',
        'Tennis': 'Tennis',
        'Volleyball': 'Volleyball'
    }

    jsonData.forEach(entry => {
        const className = sports[entry.className];
        //fix the probability to 3 decimal places
        const probability = (entry.probability).toFixed(3);
        formattedAnswer += `<div class="answerPart">${className}: ${probability}</div>`;
    });

    return formattedAnswer;
}