import fs from 'fs';

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: `3.0.0`,
		info: {
			title: `Grünt API`,
			version: `0.0.1b`,
			description: `Internal API of the Grünt website`,
		},
	},
	apis: [`./src/routes/*.ts`, `./src/app.ts`],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: `http`,
				scheme: `bearer`,
				bearerFormat: `JWT`,
			},
		},
	},
};

const openapiSpecification = swaggerJsdoc(options);

fs.writeFileSync(`./openapi.json`, JSON.stringify(openapiSpecification, null, 2));

console.log(`openapi.json ready to be pushed to Bump.sh. This will be effective on the next push on the main branch.`);
