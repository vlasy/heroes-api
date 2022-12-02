import * as openapi from '../../openapi'
import { AppDataSource } from '../database/data-source'
import { Character } from '../database/entity/Character'

export const statistics = async (): Promise<
  openapi.OpenAPIResponse<openapi.api.paths['/heroes-statistics']>
> => {
  const characters = await AppDataSource.manager.find(Character);
  console.log(characters);
  return Promise.resolve()
}
