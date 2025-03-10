import {INodeType, INodeTypeDescription} from 'n8n-workflow';
import {N8NPropertiesBuilder, N8NPropertiesBuilderConfig} from '@devlikeapro/n8n-openapi-node';
import * as doc from './openapi.json';

const config: N8NPropertiesBuilderConfig = {}
const parser = new N8NPropertiesBuilder(doc, config);
const properties = parser.build()

export class NinjaOne implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'NinjaOne',
        name: 'ninjaOne',
        icon: 'file:ninjaOne.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with NinjaOne API',
        defaults: {
            name: 'NinjaOne',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'ninjaOneApi',
                required: true,
            },
        ],
        requestDefaults: {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            baseURL: '={{$credentials.url}}',
        },
        properties: properties,
    };
}
