module.exports = description => {
	return () => {
		return {
			'##': `method '${description.name}' is not implemented. This is an example response`,
			...description.exampleResponse
		}
	}
}