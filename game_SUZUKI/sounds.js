function playMusic(audio) {
    let promise = audio.play();
    if (promise !== undefined) {
        promise.then(_ => {
        }).catch(error => {
            console.log(error);
        });
    }
}