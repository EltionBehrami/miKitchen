
    export function customFetch(ingredients) {
        let data = fetch(`https://api.edamam.com/api/recipes/v2?&from=1&to=50app_id=6278ead0&app_key=2117ecba95d2233dc31de3c80d9a9d1b&type=public&q=${ingredients}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response);
            }
        })
        return data 
    }

    

