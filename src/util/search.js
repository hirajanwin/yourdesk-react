const fuzzysort = require('fuzzysort')

export function similaritySearch(query, items) {
    let nonDup = [...new Map(items.map(item => [item.title, item])).values()]
    let results = fuzzysort.go(query, nonDup, {key:'title'});
    return results.slice(0, 7).map(result => result.obj);
}