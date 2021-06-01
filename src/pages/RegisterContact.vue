<template>
  <div>
    <card class="card cadastro" title="">
      <div>
          <h4 class="titleCadastro">
              <img src="@/assets/img/logo-ps6.png" alt="" srcset="">
              Cadastre-se no Projeto S6
          </h4>
        <p>
          Cadastre-se no Projeto S6 e mantenha-se informado sobre as
          atualizações do nosso portal e o setor de investimentos.
        </p>
      </div>
      <div class="row">
        <nomeCadastro
          class="col-12"
          type="text"
          label="Nome"
          :disabled="false"
          placeholder="João da Silva"
          :value=this.contact.name
          @input="contact.name = $event"
        >
        </nomeCadastro>
      </div>
      <div class="row">
        <emailCadastro
          class="col-md-6 col-sm-12"
          type="email"
          label="E-mail de Contato"
          :disabled="false"
          placeholder="meucontato@email.com"
          :value=this.contact.email
          @input="contact.email = $event"
        >
        </emailCadastro>
        <nascimentoCadastro
          class="col-md-6 col-sm-12"
          type="date"
          label="Data de Nascimento"
          :disabled="false"
          :value=this.contact.dn
          @input="contact.dn = $event"
        >
        </nascimentoCadastro>
      </div>
      <div class="row col-12">
        <div class="text-center">
          <cadastraBtn
            type="submit"
            class="btn"
            round
            @click.native.prevent="saveContact"
          >
            Cadastrar E-mail
          </cadastraBtn>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import nomeCadastro from "../components/Inputs/formGroupInput";
import emailCadastro from "../components/Inputs/formGroupInput";
import nascimentoCadastro from "../components/Inputs/formGroupInput";
import {baseURL} from "../config/constants"
import axios from 'axios'

import cadastraBtn from "../components/Button";

export default {
  name: "RegisterContact",
  components: {
    nomeCadastro,
    emailCadastro,
    nascimentoCadastro,
    cadastraBtn,
  },
  data() {
    return {
      contact: {
        id: 0,
        name: "",
        dn: "",
        email: ""
      }
    }
  },
  methods: {
    saveContact(){
      let url = `${baseURL}/savecontact`
      axios
        .post(url, this.contact)
        .then(res => {
          console.log('this.contact :>> ', this.contact);
          console.log("Enviado ... ");
          console.log(res.data);
          this.$notify({message: res.data, type: "success"});

          this.clearForm();
        })
        .catch(e => {
          console.log('this.contact:>> ', this.contact);
          console.log('e :>> ', e);
          console.log("Erro: ", e.data)
          this.$notify({message: e.data, type: "danger", icon: "ti-alert"});

        })
    },
    clearForm(){
      this.contact = {
        id: 0,
        name: "",
        dn: "",
        email: ""
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.titleCadastro {
  //text-align: center !important;
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
