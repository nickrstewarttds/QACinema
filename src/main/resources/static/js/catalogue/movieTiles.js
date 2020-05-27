let list = [338762,419704,495764,338762,419704,495764];

let tile = document.getElementById('movieDisplay')

for(let i of list){
    let movieTile = document.createElement('div');
    movieTile.className="col-6 col-sm-12 col-lg-6";
    axios.get(`https://api.themoviedb.org/3/movie/${i}?api_key=e8787f4d45be4c1bcdb939f0d6113db5&language=en-UK`).then(
        append => {
            console.log(append.data);
            movieTile.innerHTML = 
            '<div class="card card--list">'+
            '<div class="row">'+
                '<div class="col-12 col-sm-4">'+
                    '<div class="card__cover">'+
                        `<img src="https://image.tmdb.org/t/p/original${append.data.poster_path}" alt="">`+
                        '<a href="details2.html" class="card__play">'+
                            '<i class="icon ion-ios-play"></i>'+
                        '</a>'+
                    '</div>'+
                '</div>'+
                '<div class="col-12 col-sm-8">'+
                    '<div class="card__content">'+
                        `<h3 class="card__title"><a href="details2.html">${append.data.title}</a></h3>`+
                        '<span class="card__category">'+
                            `<a href="#">${append.data.genres[0].name}</a>`+
                            `<a href="#">${append.data.genres[1].name}</a>`+
                        '</span>'+
                        '<div class="card__wrap">'+
                            `<span class="card__rate"><i class="icon ion-ios-star"></i>${append.data.vote_average}</span>`+
                            '<ul class="card__list">'+
                                '<li id="ageRestriction"></li>'+
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





