<template>
  <div>
    <div v-if="loading">loading ...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="state && state.pokemons">
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(pokemon, i) in state.pokemons"
            :key="i"
          >
            <v-list-item-content>
              <nuxt-link :to="`${pokemon.id}`">
                <v-img
                  :src="pokemon.image"
                  max-width="100"
                ></v-img>
              </nuxt-link>
              <v-list-item-title v-text="pokemon.number"></v-list-item-title>
              <v-list-item-subtitle v-text="pokemon.name"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>


</template>

<script lang="ts">
import { createComponent,reactive, ref, computed } from '@vue/composition-api'
import { useQuery, useResult, UseQueryOptions } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const getPokemons = (count: number) => (gql`
  query {
    pokemons(first: ${count}) {
      id
      number
      name
      image
    }
  }
`)

const NUMBER_OF_ALL_POKEMONS = 151;

export default createComponent({
  setup () {
    const options = ref<UseQueryOptions>({
      fetchPolicy: 'cache-first',
    })
    const { result, loading, error } = useQuery(getPokemons(NUMBER_OF_ALL_POKEMONS), null, options)
    const pokemons = useResult(result)

    const state = reactive({
      pokemons
    });

    return {
      state,
      loading,
      error
    };
  }
})
</script>
