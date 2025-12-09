import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AirbnbScraperApi implements ICredentialType {
	name = 'airbnbScraperApi';
	displayName = 'Airbnb Scraper API';
	documentationUrl = 'https://shortrentals.ai/docs/api';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The Bearer token for authenticating with the Airbnb Scraper API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://scraper.shortrentals.ai',
			url: '/health',
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiToken}}',
			},
		},
	};
}
