<template>
  <div>
    <card class="card cadastro" title="">
      <div>
          <h4 class="titleCadastro">
             Cancelar inscrição no Projeto S6
          </h4>
        <p>
          Informe seu e-mail para se descadastrar de nosso banco de dados.
        </p>
      </div>
      <div class="row">
        <emailCadastro
          class="col-md-6 col-sm-12"
          type="text"
          label="E-mail de Contato"
          :disabled="false"
          placeholder="meucontato@email.com"
          :value=this.email
          @input="email = $event"
        >
        </emailCadastro>
      </div>
      <div class="row col-12">
        <div class="text-center">
          <descadastrarBtn
            type="submit"
            class="btn"
            round
            @click.native.prevent="deleteContact"
          >
            Descadastrar E-mail
          </descadastrarBtn>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import emailCadastro from "../components/Inputs/formGroupInput";
import {baseURL} from "../config/constants"
import axios from 'axios'
import descadastrarBtn from "../components/Button"

export default {
  name: "DeleteContact",
  components: {
    emailCadastro,
    descadastrarBtn,
  },
  data() {
    return {
      email: "",
    }
  },
  methods: {
    deleteContact(){
      let url = `${baseURL}/deletecontact/${this.email}`
      axios
        .delete(url)
        .then(res => {
          console.log('this.email :>> ', this.email);
          console.log("Enviado ... ")
          console.log(res.data);
          this.$notify({message: res.data, type: "success"});
          this.clearForm();
        })
        .catch(e => {
          console.log('this.email:>> ', this.email)
          console.log('e :>> ', e);
          console.log("Erro: ", e.data)
          this.$notify({message: e.data, type: "danger"});
        })
    },
    clearForm(){
      this.email = ""
    }
  }
};
</script>

<style lang="scss" scoped>

.titleCadastro {
  text-align: center !important;
  font-size: 3em;
  margin-bottom:2rem;
}

.btn {
  background-color: #006894;
  margin-left: 35px;
  padding: 10px 40px;
  margin-top: 2rem;
}

</style>
