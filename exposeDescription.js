

module.exports = function(serviceDescription, Picker) {
	serviceDescription.methods.forEach(description => {
		const handler = description.handler


		Picker.route(`/api`, function(params, req, res, next) {
			const args = params.param ? params.param.split('/') : []
			res.end(
				`<html>
<head>
    <title>API Description</title>
    <link rel="stylesheet" href="https://mercury.defaults.website/full.css">
    <style>
    	h1 {
    		color: var(--colorBlue);
    	}
    	h2 {
    		color: var(--colorGreen);
    	}
    	h3 {
    		color: var(--colorRed);
    	}
		</style>
</head>
<body>
<article>
<h1>${serviceDescription.title} API</h1>
<em>${serviceDescription.description} API</em>

<hr>
<h2>Methods</h2>
${serviceDescription.methods.reduce((acc, cur) => {
					return acc + `

<h3><a href="#">#</a> ${cur.name} ${cur.handler ? '' : '//not implemented'}</h3>
<blockquote>${cur.description}</blockquote>
<h4>Attributes</h4>
<ul><li>${Object.keys(cur.attributes).join('</li><li>')}</li></ul>
<h4>Options</h4>
<ul><li>${Object.keys(cur.options).join('</li><li>')}</li></ul>
<h4>Response Example</h4>
<code>${JSON.stringify(cur.exampleResponse)}</code>
`
				}, '')}
<hr>
<h2>Publications</h2>
${serviceDescription.publications.reduce((acc, cur) => {
					return acc + `
<h3><a href="#">#</a> ${cur.name} ${cur.handler ? '' : '//not implemented'}</h3>
<blockquote>${cur.description}</blockquote>
<h4>Attributes</h4>
<ul><li>${Object.keys(cur.attributes).join('</li><li>')}</li></ul>
<h4>Options</h4>
<ul><li>${Object.keys(cur.options).join('</li><li>')}</li></ul>
<h4>Response Example</h4>
<code>${JSON.stringify(cur.exampleResponse)}</code>
`
				}, '')}
</article>
</body>
</html>
`,
			)

		})
	})
}
