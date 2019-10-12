const exposeDescription = require('./exposeDescription')
const exposeMethods = require('./exposeMethods')
const exposePublications = require('./exposePublications')

module.exports = {

	Picker: undefined,
	serviceDescription: undefined,
	exposed: false,

	expose: function(serviceDescription, Meteor, Picker) {

		this.serviceDescription = serviceDescription
		this.Meteor = Meteor
		this.Picker = Picker
		this.exposed = true

		exposeDescription(this.serviceDescription, this.Picker)
		exposeMethods(this.serviceDescription, this.Meteor, this.Picker)
		exposePublications(this.serviceDescription, this.Meteor, this.Picker)

		this.Picker.route(`/api/:any*`, function(params, req, res, next) {
			res.statusCode = 404
			res.end('endpoint not found')
		})

	}

}