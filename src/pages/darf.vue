<template>
  <div>
    <!-- Inputs -->
    <div class="row">
      <div class="col-md-6">
        <lucrosObtidos
          type="text"
          label="Lucros Obtidos no mês de Referência (R$)"
          :disabled="false"
          placeholder="1.000,00"
        >
        </lucrosObtidos>
      </div>
      <div class="col-md-6">
        <mesReferencia
          type="text"
          label="Mês de Referência"
          :disabled="false"
          placeholder="01/2021"
        >
        </mesReferencia>
      </div>
    </div>
    <hr />
    <!-- Buttons -->
    <div class="row">
      <div class="text-center">
        <gerarBtn type="submit" class="btn" round> Gerar DARF </gerarBtn>
      </div>
    </div>
  </div>
</template>

<script>
import lucrosObtidos from "../components/Inputs/formGroupInput";
import mesReferencia from "../components/Inputs/formGroupInput";

import gerarBtn from "../components/Button";

export default {
  name: "darf",
  components: {
    lucrosObtidos,
    mesReferencia,
    gerarBtn,
  },
};
</script>

<style lang="scss" scoped>
.btn {
  background-color: #006894;
  margin-left: 15px;
  padding: 10px 40px;
}
</style>