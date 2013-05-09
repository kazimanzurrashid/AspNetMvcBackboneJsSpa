module Application {
    export var clientUrlPrefix = '#!/';
    export var serverUrlPrefix = '/api';
}

function repeatString(length?: number = 1, character?: string = 'x') {
    return (new Array(length + 1)).join(character);
}