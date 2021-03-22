import http from '../PokemonAPI'

const getPokemonCharacterData = (characterNumber: number) => {
  return http.get(`/pokemon/${characterNumber}`)
}

export default{ 
  getPokemonCharacterData
}