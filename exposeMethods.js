const createMockMethod = require('./createMockMethod')

module.exports = (serviceDescription, Meteor, Picker) => {
	serviceDescription.methods.forEach(description => {
		const handler = description.handler
		const doThings = handler || createMockMethod(description)
		const doThingsWithEnvironment = Meteor.bindEnvironment((...attr) => {
			const doOnResult = attr.pop()

			try {
				const result = doThings(...attr)
				doOnResult(null, result)
			} catch (e) {
				doOnResult(e)
			}

		})
		Meteor.methods({
			[description.name](...attr) {
				return doThings(...attr)
			},
		})

		Picker.route(`/api/${description.name}/:param*`, (params, req, res, next) => {

			if (req.method !== 'POST') {
				res.statusCode = 404
				res.end('not found')
				return
			}

			let body = ''
			res.setHeader('Access-Control-Allow-Origin', '*')
			res.setHeader('Content-Type', 'application/json')

			const callMethod = function() {
				try {
					const dataString = body.substr(0, body.length - 4).trim()
					const data = dataString ? JSON.parse(dataString) : {}
					const args = params.param ? params.param.split('/') : []

					const result = doThingsWithEnvironment(...args, data, (err, result) => {
						if (err) {
							console.error(err)
							res.statusCode = 500
							res.end(JSON.stringify({ error: err.message }))
						} else {
							res.end(JSON.stringify(result))
						}

					})
					//console.log({result})

				} catch (e) {
					console.error(e)
					res.statusCode = 500
					res.end(JSON.stringify({ error: e.message }))
				}
			}

			req.on('readable', () => body += req.read())
			req.on('end', callMethod)

		})

	})
}