exports.getRandomInt = function (min, max) {
    max += 1;
    return Math.floor(Math.random() * (max - min)) + min;
}