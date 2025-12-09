import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class AirbnbScraper implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Airbnb Scraper',
		name: 'airbnbScraper',
		icon: 'file:shortrentals.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Scrape Airbnb listing data using the Airbnb Analyzer API',
		defaults: {
			name: 'Airbnb Scraper',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'airbnbScraperApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Scrape Listing',
						value: 'scrapeListing',
						description: 'Scrape data from an Airbnb listing',
						action: 'Scrape data from an Airbnb listing',
					},
				],
				default: 'scrapeListing',
			},
			{
				displayName: 'Listing ID',
				name: 'listingId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['scrapeListing'],
					},
				},
				placeholder: '1501733424018064312',
				description: 'The Airbnb listing ID to scrape (found in the listing URL after /rooms/)',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						operation: ['scrapeListing'],
					},
				},
				options: [
					{
						displayName: 'Timeout (Seconds)',
						name: 'timeout',
						type: 'number',
						default: 120,
						description: 'Maximum time to wait for the scraping to complete',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'scrapeListing') {
					const listingId = this.getNodeParameter('listingId', i) as string;
					const options = this.getNodeParameter('options', i) as {
						timeout?: number;
					};

					const timeout = (options.timeout || 120) * 1000;

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'airbnbScraperApi',
						{
							method: 'POST',
							url: 'https://scraper.shortrentals.ai/api/scrape/listing',
							body: {
								listingId,
							},
							json: true,
							timeout,
						},
					);

					returnData.push({
						json: response,
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
