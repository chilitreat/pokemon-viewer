<template>
  <div>
    <div v-if="loading">loading ...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      {{ state.pokemons }}
    </div>
  </div>


</template>

<script lang="ts">
import { createComponent,reactive, ref, computed } from '@vue/composition-api'
import { useQuery } from '@vue/apollo-composable'
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

export default createComponent({
  setup () {
    const { result, loading, error } = useQuery(getPokemons(30))
    const state = reactive({
      pokemons: result
    });
    return {
      state,
      loading,
      error
    };
  }
})
</script>
