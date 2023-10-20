

//     fetch(`https://api.edamam.com/api/recipes/v2?&app_id=6278ead0&app_key=2117ecba95d2233dc31de3c80d9a9d1b&type=public`)
// .then(response => response.json())
// .then(data => console.log(data))

    // export function recipeFetch(ingredients){
    //     return customFetch(`https://api.edamam.com/api/recipes/v2?&app_id=6278ead0&app_key=2117ecba95d2233dc31de3c80d9a9d1b&type=public&q=${ingredients}`)
    // }



    // build recipeFetch using custom fetch 
    //set variable query params that takes in options.

    export function customFetch(ingredients) {
            fetch(`https://api.edamam.com/api/recipes/v2?&app_id=6278ead0&app_key=2117ecba95d2233dc31de3c80d9a9d1b&type=public&q=${ingredients}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response);
            }
        })
        .then(
            data => {
                console.log("Success!");
                console.log(data);
            },
            errorResponse => {
                console.log("Failure!");
                console.log(errorResponse);
            }
        );
    }

    

