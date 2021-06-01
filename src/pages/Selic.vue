<template>
  <div>
      <h1>Selic -  Variação no mês</h1>
      <h3>Últimos 12 meses</h3>
      <div v-if="isLoaded" class="loading"><img :src="require('../assets/img/loading.gif')" /></div>
      <div v-else class="table-responsive">
        <table class="table table-sm table-striped">
          <thead>
            <tr>
              <th>Data</th>
              <th>Taxa (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rate, index) in selic" :key="index">
              <td>{{rate.data}}</td>
              <td>{{rate.valor}}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { baseURL } from "../config/constants"

export default {
  name: "SelicPage",
  data() {
    return {
      selic: [],
      isLoaded: true
    };
  },
  methods: {
    async getSelic() {
      let url = `${baseURL}/selic`
      await axios
      .get(url)
      .then( res => {
        console.log('res.data :>> ', res.data);
        this.selic = res.data
      })
      .catch(e => {
        this.$notify({message: e.data, type: "danger"})
      })
      this.isLoaded = false
    }
  },
  async created() {
    await this.getSelic()
    console.log('this.selic :>> ', this.selic);
  }
};
</script>

<style scoped>

.loading{
  margin: auto;
  text-align: center;
}

</style>
