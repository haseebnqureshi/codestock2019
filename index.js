'use strict'

var express = require('express')
var app = express()
var path = require('path')
var _ = require('underscore')

app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, 'views'))


app.get('/', function(req, res) {
	res.status(200).send()
})

var artists = [
	{
		id: 1,
		name: 'Beatles',
		song: 'Yellow Submarine'
	},
	{
		id: 2,
		name: 'Hughy Lewis',
		song: 'Hip To Be Square'
	},
	{
		id: 3,
		name: 'Tool',
		song: 'Sober'
	},
	{
		id: 4,
		name: 'Lil Nas X',
		song: 'Old Town Road'
	}
]

app.get('/api/artists', function(req, res) {
	var status = artists.length > 0 ? 200 : 404
	var err = null
	var data = { artists }
	res.status(status).send({ data, err })
})

app.get('/api/artists/:name', function(req, res) {
	var name = req.params.name
	var artist = _.findWhere(artists, { name })
	var err = null
	var data = { artist }
	var status = artist ? 200 : 404
	res.status(status).send({ data, err })
})

app.get('/artists/:name', function(req, res) {
	var name = req.params.name
	var artist = _.findWhere(artists, { name })
	if (!artist) { 
		return res.redirect('/')
	}
	res.render('artist', { artist })	
})



app.listen(8080, function() {
	console.log(`Started on port 8080...`)
})

