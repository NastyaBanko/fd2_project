const firebaseConfig = {
    apiKey: "AIzaSyBv8YgCD6KFIYw2ao3yUKQKXi3cvYahbCY",
    authDomain: "project-887f2.firebaseapp.com",
    databaseURL: "https://project-887f2.firebaseio.com",
    projectId: "project-887f2",
    storageBucket: "project-887f2.appspot.com",
    messagingSenderId: "469844958407",
    appId: "1:469844958407:web:892c6ee961a44fa5"
};

firebase.initializeApp(firebaseConfig);

const myDatabase = firebase.database();

class myDatabaseStorage {
    constructor(settings) {
        this.key = settings.key;
    }

    getPlayers() {
        let self = this;
        return myDatabase.ref(`${self.key}/`).once("value")
            .then(snapshot => snapshot.val())
            .catch(error => {
                console.error('Ошибка получения пользователей:', error);
            });
    }

    addPlayer(name, result, time) {
        let self = this;
        let formatName = name.replace(/\s/g, "").toLowerCase();
        // проверка есть ли игрок в базе и сравнение текущего результата с базой
        myDatabase.ref(`${self.key}/${name}`)
            .once("value", function (snapshot) {
                    if (time < 41) {
                        myDatabase.ref(`${self.key}/${formatName}`)
                            .set(result)
                            .then(function (username) {
                            })
                            .catch(function (error) {
                                console.error("Ошибка добавления игрока: ", error);
                            });
                    } else {}
                },
                function (error) {
                    console.log("Error: " + error.code);
                }
            );
    }
}

let firebaseStorage = new myDatabaseStorage({
    key: 'players',
});