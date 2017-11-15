const db = require('./connection')
//
function getMovies(){
	return db('movies').select().innerJoin('people', 'movies.director_id', 'people.id')
}

function getAllActorData() {
	return db('movies')
	.select()
	// .where('role', 'actor')
	.innerJoin('people_movies', 'movie_id', 'movies.id').innerJoin('people', 'people_id', 'people.id')
}

function joinData(dData, aData){
	let movieArr = []
	let movieObj = new Object();
	for (var i = 0; i < aData.length; i++) {
		let movieID = aData[i]['movie_id']
		for (var j = 0; j < dData.length; j++) {
			if (aData[i].title === dData[j].title) {
			movieObj[movieID] = new Object();
			movieObj[movieID].title = aData[i].title
			movieObj[movieID].director = dData[j].name;
			movieObj[movieID].actors = []

			movieArr.push(movieObj)
			}
		}
	}
	for (var i = 0; i < aData.length; i++) {
		let movieID = aData[i]['movie_id']
		for (var j = 0; j < movieArr.length; j++) {
			if (aData[i].title === movieArr[j][movieID].title) {
				if(movieObj[movieID].actors.indexOf(' ' + aData[i].name) === -1){
					movieObj[movieID].actors.push(' ' + aData[i].name)
				}
			}

		}
	}
	return movieArr[0];
}
module.exports = {
	getMovies,
	getAllActorData,
	joinData
}
