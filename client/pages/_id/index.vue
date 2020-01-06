<template>
  <div>
    <div v-if="loading">loading ...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="pokemon">
      <v-card>
        <v-img
          :src="pokemon.pokemon.image"
          max-width="300"
        ></v-img>
        <v-card-title>{{ `${pokemon.pokemon.number} ${pokemon.pokemon.name}` }}</v-card-title>
        <v-card-subtitle>{{ `${pokemon.pokemon.classification}` }}</v-card-subtitle>
        <v-chip-group>
          <v-chip v-for="(type, i) in pokemon.pokemon.types" :key="i" x-small color="secondary">{{ type }}</v-chip>
        </v-chip-group>

        <v-card-text>
          <p>{{ `Height: ${pokemon.pokemon.height.minimum} ~ ${pokemon.pokemon.height.maximum}` }}</p>
          <p>{{ `Weight: ${pokemon.pokemon.weight.minimum} ~ ${pokemon.pokemon.weight.maximum}` }}</p>
        </v-card-text>
      </v-card>
    </div>

  </div>
</template>
<script lang="ts">
import { createComponent,SetupContext, reactive, ref, computed } from '@vue/composition-api'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const getPokemonById = (id: string) => (gql`
  query {
    pokemon(id: "${ id }") {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          damage
        }
        special {
          name
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      evolutions {
        id
        number
        name
        classification
        types
        fleeRate
      }
      evolutionRequirements {
        amount
        name
      }
      maxHP
      image
    }
  }
`)

interface Weight {
  minimum: string;
  maximum: string;
}

interface Height {
  minimum: string;
  maximum: string;
}

interface Attack {
  name: string;
  type: string;
  damage: number;
}

interface PokemonAttack {
  fast: [Attack];
  special: [Attack];
}

interface PokemonEvolutionRequirement {
  amount: number;
  name: string;
}

interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: Weight;
  height: Height;
  classification: string;
  types: [string];
  resistant: [string];
  attacks: PokemonAttack;
  weaknesses: [string];
  fleeRate: number;
  maxCP: number;
  evolutions: [Pokemon]
  evolutionRequirements: PokemonEvolutionRequirement;
  maxHP: number;
  image: string;
}

export default createComponent({
  setup(props, context: SetupContext) {
    const id = context.root.$route.params.id;
    const { result, loading, error } = useQuery<{pokemon: Pokemon}>(getPokemonById(id));

    return {
      pokemon: result,
      loading,
      error
    }
  }
});
</script>