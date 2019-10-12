Better Way Of Creating Meteor Based Services

server.js 
```javascript
import { Service } from 'meteor-candyshop-service'
import { service } from '/service'

Service.expose(service, Meteor, Picker)
```

service/index.js
```javascript
import pckg from '/package.json'
import { exampleInsert, exampleFind } from '/api/example'

export const service = {
	title: pckg.name,
	description: pckg.description,

	methods: [
		{
			name: 'exampleInsert',
			attributes: {
				attr1: Number,
				attr2: String,
			},
			options: {
				opt1: String,
				opt2: String,
				opt3: Number,
			},
			description: 'this method doing example insert',
			handler: exampleInsert ,
			exampleResponse: {
				_id: 'aergquewyr28342343223434',
			},
		},
	],

	publications: [
		{
			name: 'exampleFind',
			attributes: {
				attr1: String,
			},
			options: {
				opt1: Number,
				opt2: String,
			},
			description: 'this methods doing example find',
			handler: undefined,
			exampleResponse: {
				'examples': [
					{ _id: 'aergquewyr28342343223434', title: 'item 1' },
					{ _id: 'a123213ergquewyr23223asd', title: 'item 2' },
				],
			},
		},
	],

}
```