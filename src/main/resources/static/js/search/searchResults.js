let list = [];
let ids = [];
let ratings = [];
const params = new URLSearchParams(window.location.search)

axios.get(`http://localhost:8080/movie/getAll`).then(
    data => {
        for(let i of data.data){

            list.push(i.apiID);
            ids.push(i.id);
            if (i.rating===null){
                ratings.push("N/A");
            } else{
                ratings.push(i.rating)
            }
        }
        showOnPage(list, ids, ratings);
    }
)

function showOnPage(list, ids, ratings){
    let tile = document.getElementById('movieDisplay')
    for(let i=0;i<list.length;i++){

        let movieTile = document.createElement('div');
        movieTile.className="col-6 col-sm-12 col-lg-6";
        axios.get(`https://api.themoviedb.org/3/movie/${list[i]}?api_key=e8787f4d45be4c1bcdb939f0d6113db5&language=en-UK`).then(
            append => {
                if (params.get("term")!==null && !append.data.title.toLowerCase().includes(params.get("term").toLowerCase())){
                    return;
                }
                movieTile.innerHTML =
                    '<div class="card card--list">'+
                    '<div class="row">'+
                    '<div class="col-12 col-sm-4">'+
                    '<div class="card__cover">'+
                    `<img src="https://image.tmdb.org/t/p/original${append.data.poster_path}" alt="">`+
                    `<a id="play" href="details2.html?title=${append.data.title}&id=${ids[i]}" class="card__play">`+
                    `<i class="icon ion-ios-play" id="playbutton${ids[i]}"></i>`+
                    '</a>'+
                    '</div>'+
                    '</div>'+
                    '<div class="col-12 col-sm-8">'+
                    '<div class="card__content">'+
                    `<h3 class="card__title"><a id="title" href="#">${append.data.title}</a></h3>`+
                    '<span class="card__category">'+
                    `<a href="#">${append.data.genres[0].name}</a>`+
                    `<a href="#">${append.data.genres[1].name}</a>`+
                    '</span>'+
                    '<div class="card__wrap">'+
                    `<span class="card__rate"><i class="icon ion-ios-star"></i>${append.data.vote_average}</span>`+
                    '<ul class="card__list">'+
                    `<li><a style="color: #ff5860;" id="ageRating" href="classifications.html">${ratings[i]}</a></li>`+
                    '</ul>'+
                    '</div>'+
                    '<div class="card__description">' +
                    `<p>${append.data.overview}</p>`+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                tile.appendChild(movieTile);
            }
        )
    }
}

function filterNames(startup){
    let filterValue;

    if (startup==="yes"){
        console.log(params.get("term").toLowerCase())
        filterValue = params.get("term");
    } else {
        filterValue = document.getElementById('searchBox2').value.toLowerCase();
    }

    let movies = document.getElementById('movieDisplay')
    let li = movies.getElementsByClassName('card__title')
    let ld = movies.getElementsByClassName('col-6 col-sm-12 col-lg-6')

    for(let i=0;i<li.length;i++){
        if((li[i].getElementsByTagName('a')[0].innerHTML.toLowerCase().indexOf(filterValue)>-1 ||
            ld[i].getElementsByTagName('p')[0].innerHTML.toLowerCase().indexOf(filterValue)>-1)){
            li[i].style.display='';
            ld[i].style.display=''
        }else{
            li[i].style.display = 'none';
            ld[i].style.display= 'none';
        }
    }
}


document.getElementById("resetButton").addEventListener("click",function(){window.location = window.location.href.split("?")[0];})
document.getElementById('searchBox2').addEventListener('keyup',function(){filterNames("no")});







