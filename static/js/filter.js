// Get Distritos
var PATH='http://localhost:5000';
export function getDistritos() {
    fetch(PATH  + '/filter/data/fronterizo')
        .then(res => res.json())
        .then(response => console.log(response))
}
