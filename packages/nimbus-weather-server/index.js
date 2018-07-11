const express = require('express')
const axios = require('axios')

const app = express()
const forecastRouter = express.Router()

const apiKey = process.env.DARK_SKY_API_KEY
const port = process.env.PORT

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

forecastRouter.get('/', async (req, res) => {
	const { lat, lng, units } = req.query

	try {
		if (!lat || !lng) {
			return res.status(400).json({
				error: 'Both `lat` and `lng` query params are required'
			})
		}
		const response = await axios.get(
			`https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
			{
				params: {
					units
				}
			}
		)

		res.json(response.data)
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e)

		res.status(500).json({
			error: 'There was an error'
		})
	}
})

app.use('/forecast', forecastRouter)

app.listen(port, () => {
	/* eslint-disable-next-line no-console */
	console.log(`Nimbus Weather Server listening on port ${port}`)
})
