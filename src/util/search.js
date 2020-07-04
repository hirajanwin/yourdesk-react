import Fuse from 'fuse.js'

export function similaritySearch(query, items) {
    let nonDup = [...new Map(items.map(item => [item.title, item])).values()]
    const fuse = new Fuse(nonDup, {
        keys: ['title']
    })
    let results = fuse.search(query);
    return results.slice(0, 5).map(result => result.item);
}