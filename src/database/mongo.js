const { MongoClient, ServerApiVersion } = require("mongodb");

module.exports = {
	/**
	 * Connect to the MongoDB servers.
	 */
	async connectToMongo(uri) {
		const client = new MongoClient(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1,
		});

		await client.connect((err) => {
			console.log(`[MongoDB] Error: ${err}`);
			client.close();
		});
		console.log("[MongoDB] Success: Connected");
	},

	/**
	 * Get the client to perform actions onto the Database
	 * @returns The MongoDB Client
	 */
	getMongoClient() {
		if (client != null) {
			return client;
		}
		console.log("[MongoDB] Error: Client is null");
	},
};
