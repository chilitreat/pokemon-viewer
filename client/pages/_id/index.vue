<template>
  <div>
    <div v-if="loading">loading ...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="pokemon">
      <v-card>
        <v-img
          :src="pokemon.image"
          max-width="300"
        ></v-img>
        <v-card-title>{{ `${pokemon.number} ${pokemon.name}` }}</v-card-title>
        <v-card-subtitle>{{ `${pokemon.classification}` }}</v-card-subtitle>
        <v-chip-group>
          <p>Types: </p>
          <v-chip v-for="(type, i) in pokemon.types" :key="i" x-small color="secondary">{{ type }}</v-chip>
        </v-chip-group>
        <v-chip-group>
          <p>Weaknesses: </p>
          <v-chip v-for="(weakness, i) in pokemon.weaknesses" :key="i" x-small color="secondary">{{ weakness }}</v-chip>
        </v-chip-group>
        <v-card-text>
          <p>{{ `MaxCP: ${pokemon.maxCP}` }}</p>
          <p>{{ `MaxHP: ${pokemon.maxHP}` }}</p>
          <p>{{ `Height: ${pokemon.height.minimum} ~ ${pokemon.height.maximum}` }}</p>
          <p>{{ `Weight: ${pokemon.weight.minimum} ~ ${pokemon.weight.maximum}` }}</p>
        </v-card-text>

        <v-row>
          <div>
            <p>Fast</p>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Type</th>
                    <th class="text-left">Damage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="attack in pokemon.attacks.fast" :key="attack.name">
                    <td>{{ attack.name }}</td>
                    <td>{{ attack.type }}</td>
                    <td>{{ attack.damage }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <div>
            <p>Special</p>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Type</th>
                    <th class="text-left">Damage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="attack in pokemon.attacks.special" :key="attack.name">
                    <td>{{ attack.name }}</td>
                    <td>{{ attack.type }}</td>
                    <td>{{ attack.damage }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-row>

        <v-row>
          <v-col
            v-for="pokemon in pokemon.evolutions"
            :key="pokemon.id"
            :cols="3"
          >
            <nuxt-link :to="pokemon.id">
              <v-img
                :src="pokemon.image"
              ></v-img>
              <v-card-text>
                <p>{{ `${pokemon.number} ${pokemon.name}` }}</p>
              </v-card-text>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>
<script lang="ts">
import { createComponent,SetupContext, reactive, ref, computed } from '@vue/composition-api'
import { useQuery, useResult, UseQueryOptions } from '@vue/apollo-composable'
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
          type
          damage
        }
        special {
          name
          type
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
        image
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
    const options = ref<UseQueryOptions>({
      fetchPolicy: 'cache-first',
    })
    const id = context.root.$route.params.id;
    const { result, loading, error } = useQuery<{pokemon: Pokemon}>(getPokemonById(id), options);
    const pokemon = useResult(result)
    return {
      pokemon,
      loading,
      error
    }
  }
});
</script>