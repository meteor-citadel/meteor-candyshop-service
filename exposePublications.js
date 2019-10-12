const createMockPublication = require('./createMockPublication')

module.exports = (serviceDescription, Meteor, Picker) => {

	serviceDescription.publications.forEach(description => {
		const handler = description.handler
		const doThings = handler || createMockPublication(description)

		Meteor.publish(description.name, function(...attr) {
			const result = doThings(...attr)
		})

		Picker.route(`/api/${description.name}/:param*`, (params, req, res, next) => {

			if (req.method != 'GET') {
				res.statusCode = 404
				res.end('not found')
				return
			}

			const args = params.param ? params.param.split('/') : []
			const options = params.query
			const result = doThings(...args, options)
			res.setHeader('Content-Type', 'application/json')
			result.then
				? result.then(r => res.end(JSON.stringify(r.fetch())))
				: res.end(JSON.stringify(result.fetch()))
		})

	})

}