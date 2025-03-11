let randomNum = Math.ceil(Math.random() * (100 - 1) + 1);
console.log(randomNum)

let input = document.querySelector('input');
let guessBtn = document.getElementById('guess');
let congratsMsg = document.getElementById('congrats');
let video = document.createElement('video');
let attemptMsg = document.createElement('span');
attemptMsg.style.position = 'relative';
attemptMsg.style.zIndex = '100';

const wrongGuess = () => {
    let inputText = parseInt(input.value);

    input.style.borderColor = 'red';

    if (document.body.contains(video)) {
        document.body.removeChild(video);
    }

    congratsMsg.style.display = 'block';
    congratsMsg.style.color = 'red';

    if (inputText < randomNum) {
        congratsMsg.innerHTML = 'Too Low &downarrow; Try Again ✊'
    } else if (inputText > randomNum) {
        congratsMsg.innerHTML = 'Too High &uparrow; Try Again ✊'
    }

    input.focus();
    input.value = '';
}

let attempts = 0;

const correctGuess = () => {

    let inputText = parseInt(input.value);
    // console.log(inputText)

    if (inputText > 100 || inputText < 1 || isNaN(inputText)) {
        alert('Entered Invalid Number.');
        refreshPage()
        return;
    } else {
        attempts++
        console.log(attempts)
        if (inputText === randomNum) {
            video.src = '215180_small.mp4';
            video.loop = true;
            video.autoplay = true;
            video.muted = true;
            video.disablePictureInPicture = true;

            if (!document.body.contains(video)) {
                document.body.append(video);
            }

            congratsMsg.style.display = 'block';
            congratsMsg.innerText = `Congratulations! You Guess Right! 👍`;
            congratsMsg.style.color = 'green';

            // Here I used Ternary Operator
            attemptMsg.innerText = attempts === 1 ?
                `You guessed it on your first try 🎉 Very nice!`
                : `In ${attempts} Attempts You Guess Correct Number`;

            attemptMsg.style.color = 'lightgreen';
            congratsMsg.after(attemptMsg);

            input.style.borderColor = 'green';

            input.disabled = true;
            guessBtn.disabled = true;

        } else {
            wrongGuess();

        }

    }
}

const refreshPage = () => {
    location.reload();
    input.focus();
}

// ******** Adding Event Listeners ********
guessBtn.addEventListener('click', correctGuess);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        correctGuess();
    }
})

document.getElementById('refresh').addEventListener('click', refreshPage);

window.onload = () => {
    input.focus();
}

