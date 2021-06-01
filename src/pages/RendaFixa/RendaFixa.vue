<template>
  <div>

    <div class="row">
      <div class="col-md-6">
        <valorInvestido
          type="number"
          label="Valor que será investido (R$)"
          :disabled="false"
          placeholder="1.000,00"
          min=0
          step=0.01
          :value=this.userData.amount
          @input="userData.amount = $event"
        >
        </valorInvestido>
      </div>
      <div class="col-md-6 col-sm-12">
        <prazoInvestimento
          type="date"
          label="Data de Resgate"
          :disabled="false"
          :value=this.userData.deadline
          @input="userData.deadline = $event"
        >
        </prazoInvestimento>
      </div>
    </div>

    <hr />

    <!-- Inicia a renderização de cada cartão de cenário de investimento -->
    <div class="row">
      <card
        class="card col-md-3 cardRendaFixa"
        v-for="(object, index) in stages"
        :key="index"
        :title="object.name"
      >
        <hr />

        <!-- Renderiza raio buttons de tipo de investimento -->
        <div class="buttonRadioCard row">
          <p class="buttonRadioLabel col-12">Tipo de Investimento:</p>
          <div
            class="col-4 buttonRadio"
            v-for="(investment, i) in object.investmentTypes"
            :key="i"
          >
            <input
              type="radio"
              :id="investment.value"
              :name="investment.stage"
              :value="investment.value"
              v-model="object.selectedInvestment"
            />
            <label :for="investment.value">{{ investment.type }}</label>
          </div>
        </div>

        <hr />

        <!-- Renderiza raio buttons de tipo de rentabilidade -->
        <div class="buttonRadioCard row">
          <p class="buttonRadioLabel col-12">Tipo de Rentabilidade:</p>
          <div
            class="col-6 buttonRadio"
            v-for="(profitability, ind) in object.profitabilityTypes"
            :key="ind"
          >
          <input
              type="radio"
              v-if="object.selectedInvestment == 'ipca'"
              :id="profitability.value"
              :name="profitability.stage"
              :value="profitability.value"
              v-model="object.selectedProfitability = 'posfixada'"
              disabled
            />
            <input
              type="radio"
              v-else
              :id="profitability.value"
              :name="profitability.stage"
              :value="profitability.value"
              v-model="object.selectedProfitability"
            />
            <label :for="profitability.value">{{ profitability.type }}</label>
          </div>
        </div>

        <hr />
 
        <template class="row" v-if="object.selectedProfitability && object.selectedInvestment">
          <label for="yield" class="control-label">{{ object.selectedProfitability == 'prefixada' ? 
            'Taxa Contratada (% a.a.)' : 
            object.selectedInvestment == 'ipca' ? 
              'Taxa Contratada (IPCA + % a.a.)' :
              'Taxa Contratada (% do CDI)' }}</label><br/>
          <input type="number" id="yield" name="yield" min="0.00"
          step="0.01" class="form-control" placeholder="2,75" v-model="object.inputYield">
        </template>
      </card>

      <!-- Encerra a renderização de cartões de investimento -->

      <!-- Renderiza botão Geral de Calcular-->
      <div class="row col-12">
        <div class="text-center">
          <calcBtn
            type="submit"
            class="btn"
            round
            @click.native.prevent="sendValues()"
          >
            Calcular
          </calcBtn>
        </div>
      </div>
    </div>

    <hr />

    <!-- Como plotar o gráfico ?-->
    <div class="row col-12">
      <div class="col-12" v-if="mostraGrafico">
        <card class="card col-12" title="">
          <apexchart
            height="300px"
            width="100%"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </card>
      </div>
    </div>
  </div>
</template>

<script src='./RendaFixa.js'>
</script>

<style lang="scss" src="./RendaFixa.scss" scoped>
</style>
