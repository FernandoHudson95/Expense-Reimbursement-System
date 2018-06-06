
function retrieveMovies(){
    const year = document.getElementById('year-input').value;

    fetch('http://localhost:3000/movies/year/' + year)
    .then(resp => resp.json())
    .then((movies) => {

        //CLEARS TABLE
        const body = document.getElementById('movie-table-body');
        body.innerHTML = '';

        //POPULATES THE TABLE FOR EACH MOVIE
           movies.forEach(addMovie);
        })
        .catch(err => {
            console.log(err);
    });
    // alert('Request sent')

}

function addMovie(movie) {
    const body = document.getElementById('movie-table-body');

    const row = document.createElement('tr'); //CREATES <tr>
    let data = document.createElement('td'); //CREATES <td>
    data.innerText = movie.year; //ASSIGNS VALUE TO THE TD
    row.appendChild(data); //APPENDS THE td TO THE row
    data = document.createElement('td');
    data.innerText = movie.title;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = movie.rating;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = movie.description;
    row.appendChild(data);
    body.appendChild(row); //APPENDS THE ROW TO THE BODY

    
    // body.innerHTML += `    //ANOTHER WAY TO DO THE ABOVE ^^^
    // <tr>
    //     <td>${movie.year}</td>
    //     <td>${movie.title}</td>
    //     <td>${movie.rating}</td>
    //     <td>${movie.description}</td>
    // </tr>
    // `;

}