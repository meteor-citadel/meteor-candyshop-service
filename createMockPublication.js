module.exports = description => {
	return () => {
		return {
			fetch() {
				return {
					'##': `publication '${description.name}' is not implemented. This is an example response`,
					...description.exampleResponse
				}
			}
		}
	}
}