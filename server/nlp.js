const stopWords = ["a", "an", "the", "parameter", "parameters"];
const lodash = require('lodash');

const removeStopWords = (speech) => {
    console.log("speech:", speech);
    var interestedWords = lodash.filter(speech, (o) => {
        return !lodash.find(stopWords, (x) => x === o);
    });
    console.log("interestedWords:", interestedWords);
    return interestedWords;
}

module.exports = {
    removeStopWords
}
