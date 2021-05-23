import { buildSchema } from 'graphql';
import { entityType, entityInput } from '../types/entity';
import { mapEntityInput , mapEntityType } from '../types/mapEntity';
import { schemaType } from '../types/schemaType';

export const schema = buildSchema(`
${entityType}
${entityInput}
${mapEntityType}
${mapEntityInput}
${schemaType}
`)