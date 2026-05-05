/* * */

import { FASTIFY } from '@/services/FASTIFY.js';
import { SERVERDB } from '@carrismetropolitana/api-navegante-tempo-real-shared-services';
import { SERVERDB_KEYS } from '@carrismetropolitana/api-navegante-tempo-real-shared-settings';

/* * */

FASTIFY.GET('/gtfs', async (_, reply) => {
	// Stream the file in the given URL to the client
	const storageServiceResponse = await fetch('https://storage.carrismetropolitana.pt/static/gtfs-multi-operador.zip');
	if (!storageServiceResponse.ok || !storageServiceResponse.body) return reply.code(500).send('Could not fetch file.');
	// Set headers and pipe the response body to the client
	reply.header('Content-Disposition', `attachment; filename="CMET.zip"`);
	reply.header('Content-Type', 'application/zip');
	// Set content length if available
	const contentLength = storageServiceResponse.headers.get('Content-Length');
	if (contentLength) reply.header('Content-Length', contentLength);
	// Pipe the response body to the client
	return reply.send(storageServiceResponse.body);
});

FASTIFY.GET('/plans', async (_, reply) => {
	const allItemsTxt = await SERVERDB.get(SERVERDB_KEYS.NETWORK.PLANS);
	if (!allItemsTxt) return reply.code(404).send([]);
	return reply
		.code(200)
		.header('cache-control', 'public, max-age=3600')
		.send(allItemsTxt);
});

FASTIFY.GET('/dates', async (_, reply) => {
	const allItemsTxt = await SERVERDB.get(SERVERDB_KEYS.NETWORK.DATES);
	if (!allItemsTxt) return reply.code(404).send([]);
	return reply
		.code(200)
		.header('cache-control', 'public, max-age=3600')
		.send(allItemsTxt);
});

FASTIFY.GET('/periods', async (_, reply) => {
	const allItemsTxt = await SERVERDB.get(SERVERDB_KEYS.NETWORK.PERIODS);
	if (!allItemsTxt) return reply.code(404).send([]);
	return reply
		.code(200)
		.header('cache-control', 'public, max-age=3600')
		.send(allItemsTxt);
});

FASTIFY.GET('/stops', async (_, reply) => {
	const allItemsTxt = await SERVERDB.get(SERVERDB_KEYS.NETWORK.STOPS);
	if (!allItemsTxt) return reply.code(404).send([]);
	return reply
		.code(200)
		.header('cache-control', 'public, max-age=3600')
		.send(allItemsTxt);
});

FASTIFY.GET('/lines', async (_, reply) => {
	const allItemsTxt = await SERVERDB.get(SERVERDB_KEYS.NETWORK.LINES);
	if (!allItemsTxt) return reply.code(404).send([]);
	return reply
		.code(200)
		.header('cache-control', 'public, max-age=3600')
		.send(allItemsTxt);
});

FASTIFY.GET('/routes', async (_, reply) => {
	const allItemsTxt = await SERVERDB.get(SERVERDB_KEYS.NETWORK.ROUTES);
	if (!allItemsTxt) return reply.code(404).send([]);
	return reply
		.code(200)
		.header('cache-control', 'public, max-age=3600')
		.send(allItemsTxt);
});
