import axios from 'axios'
import { baseURL } from "../../config/constants"

export default {
  name: "FundosInvestimentos",
  data() {
    return {
      bbShortTerm: {},
      bbLongTerm: {},
      bbFounds: {},
      isLoaded: true,
    }
  },
  methods: {
    async getInvestiment(){
      let url = `${baseURL}/bbinvestiments`
      await axios
      .get(url)
      .then( res => {
        console.log('res.data :>> ', res.data);
        this.bbShortTerm = res.data.shortTerm;
        // this.bbShortTerm.data.forEach( x => x.term = "curto");
        this.bbLongTerm = res.data.longTerm;
        // this.bbLongTerm.data.forEach( x => x.term = "longo");
        this.bbFounds = [... this.bbShortTerm.data, ... this.bbLongTerm.data]
      })
      .catch(e => {
        this.$notify({message: e.data, type: "danger"})
      })
      this.isLoaded = false
    }
  },
  created() {
    this.getInvestiment();
  },
};
