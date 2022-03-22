const Game = ((url) => {

    //Configuratie en state waarden
    const configMap = {
        apiUrl: url
    }

    const stateMap = {
        gameState: 0
    }

    // Private function init
    const privateInit = function(){
        console.log(configMap.apiUrl);
        setInterval(_getCurrentGameState, 2000);
    }

    const _getCurrentGameState = () => {
        stateMap.gameState = Game.Model.getGameState("test");
    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit
    }
})("api/url");

Game.Reversi = ((url) => {

    //Configuratie en state waarden
    const configMap = {
        apiUrl: url
    }

    // Private function init
    const privateInit = function(){
        console.log(configMap.apiUrl);

    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit
    }
})("api/url");

Game.Data = ((url) => {

    //Configuratie en state waarden
    const configMap = {
        // apiKey: "43dc00f93a9391ed42e2fcf92c22064b",
        mock: [
            {
                url: "api/Spel/Beurt",
                data: 0
            }
        ]
    };

    const stateMap = {
        environment : 'development'
    }

    const get = ((url) => {
        if (stateMap.environment === "development") {
            return getMockData(url);
        } else if (stateMap.environment === "production") {
            return $.get(url)
                .then(r => {
                    return r})
                .catch(e => {
                    console.log(e.message);
                });
        }
    });

    const getMockData = (url) => {
        //filter mock data, configMap.mock ... oei oei, moeilijk moeilijk :-)
        const mockData = configMap.mock.find(x => x.url === url)

        return new Promise((resolve, reject) => {
            resolve(mockData);
        });
    }

    // Private function init
    const privateInit = (environment) => {
        console.log(configMap.apiUrl);
        stateMap.environment = environment;

        if (stateMap.environment !== "production" && stateMap.environment !== "development") {
            throw new Error("Environment not set in state or set incorrectly")
        }

        get("api/Spel/Beurt")
            .then(r => {
                console.log(r);
            });
    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit,
        get: get
    }
})("api/url");

Game.Model = ((url) => {

    //Configuratie en state waarden
    const configMap = {
        apiUrl: url
    }

    // Private function init
    const privateInit = function(){
        console.log(configMap.apiUrl);
    }

    const getWeather = () => {
        Game.Data.get("http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=43dc00f93a9391ed42e2fcf92c22064b")
            .then(r => {
                if (r.main.temp) {
                    return r;
                } else {
                    throw new Error("Missing temperature");
                }
            })
    }

    const _getGameState = (token) => {
        return new Promise((resolve, reject) => {
            //aanvraag via Game.Data
            Game.Data.get(`/api/Spel/Beurt/${token}`)
                .then(r => {
                    if (r === 0 || r === 1 || r === 2) {
                        resolve(r);
                    } else {
                        throw new Error("Incorrect state");
                    }
                });
        })
    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit,
        getWeather: getWeather,
        getGameState: _getGameState
    }
})("api/url");
