import { countBy, mean } from 'lodash'
import * as openapi from '../../openapi'
import { AppDataSource } from '../database/data-source'
import { Character } from '../database/entity/Character'

const characterTransform = (character: Character) => ({
  ...character,
  born: character.born?.toDateString(),
  inSpaceSince: character.inSpaceSince?.toDateString(),
  weight: parseFloat(character.weight),
})

// Does not have to be extremely precise, so we use this
const characterAge = (character: Character) => {
  const ageDifMs = Date.now() - character.born.getTime()
  const ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

enum Gender {
  OTHER = 'other',
  FEMALE = 'female',
  MALE = 'male',
}

export const statistics = async (): Promise<
  openapi.OpenAPIResponse<openapi.api.paths['/heroes-statistics']>
> => {
  const characters = await AppDataSource.manager.find(Character)
  console.log(characters.filter(character => character.weight))
  console.log(
    characters
      .filter(character => character.weight)
      .map(character => character.weight)
  )
  console.log(
    characters
      .filter(character => character.weight)
      .map(character => character.weight)
      .map(parseFloat)
  )
  return Promise.resolve({
    charactersCount: characters.length,
    averageAge: parseFloat(mean(characters.map(characterAge)).toFixed(2)),
    averageWeight: mean(
      characters
        .filter(character => character.weight)
        .map(character => character.weight)
        .map(parseFloat)
    ),
    genders: countBy(characters, character => {
      if (!character.gender) return Gender.OTHER
      switch (character.gender.toLowerCase()) {
        case 'female':
        case 'f':
          return Gender.FEMALE
        case 'male':
        case 'm':
          return Gender.MALE
        default:
          return Gender.OTHER
      }
    }),
    characters: characters.map(characterTransform),
  })
}
