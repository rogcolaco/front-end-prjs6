<template>
  <div>
      <h1>IPCA - Variação no mês</h1>
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
            <tr v-for="(rate, index) in monthlyIPCAList" :key="index">
              <td>{{rate.D2C | viewDate}}</td>
              <td>{{rate.V}}</td>
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
      isLoaded: true,
      ipca: [],
      monthlyIPCAList: [],
    };
  },
  filters: {
    viewDate(date){
      console.log('date :>> ', date);
      let part1 = date.substring(0,4)
      let part2 = date.substring(4)
      return `${part2}/${part1}`
    }
  },
  methods: {
    async getIPCA() {
      let url = `${baseURL}/ipca`
      await axios
      .get(url)
      .then( res => {
        if(res){
          this.ipca = res.data
          console.log('this.ipca :>> ', this.ipca);
          this.monthlyIPCAList = this.ipca.splice(-12)
          console.log('this.monthlyIPCAList :>> ', this.monthlyIPCAList);
        }
      })
      .catch(e => {
        this.$notify({message: e.data, type: "danger"})
      })
      this.isLoaded = false
    }
  },
  async created() {
    await this.getIPCA()
  }
};
</script>

<style scoped>

.loading {
  margin: auto;
  text-align: center;
}

</style>
