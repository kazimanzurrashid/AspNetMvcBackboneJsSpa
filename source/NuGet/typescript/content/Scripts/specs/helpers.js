var Application;
(function (Application) {
    Application.clientUrlPrefix = '#!/';
    Application.serverUrlPrefix = '/api';
})(Application || (Application = {}));
function repeatString(length, character) {
    if (typeof length === "undefined") { length = 1; }
    if (typeof character === "undefined") { character = 'x'; }
    return (new Array(length + 1)).join(character);
}
