<template>
  <div>
    <div v-if="isLoaded" class="loading"><img :src="require('../../assets/img/loading.gif')" /></div>
    <div class="row">
      <div class="cardFundo col-md-4 col-lg-3"
        v-for="(data, index) in bbFounds"
        :key="index">
      <card
        class="card"
        title=""
        :class= data.type
      >
        <!-- <p class="instituicao">{{ data.instituicao }}</p> -->
        <!-- <hr /> -->
        <h2 class="nomeFundo"
            :class= data.type>{{ data.name }}</h2>
        <!-- <hr /> -->
        <!-- <div class="fundo-body">
          <div>
            <p class="aplicacaoMinima">Aplicação Mínima<br/>
            {{ data.investMinimo }}</p>
          </div>
        </div> -->
        <div  class="fundo-body"
              :class= data.type>
          <span>Tipo de aplicação:</span><span >{{ data.type }}</span>
        </div>
        <!-- <hr /> -->
        <div class="rentabilidadeFundo">
          <p class="rentabilidadeFundo-title">Rentabilidade</p>
          <div class="fundo-body">
            <span>No ano:</span><span>{{ data.year }} %</span>
          </div>
          <div class="fundo-body">
            <span>Últ. 12 meses:</span
            ><span>{{ data.month12 }} %</span>
          </div>
          <div class="fundo-body">
            <span>Últ. 24 meses:</span
            ><span>{{ data.month24 }} %</span>
          </div>
          <div class="fundo-body">
            <span>Últ. 36 meses:</span
            ><span>{{ data.month36 }} %</span>
          </div>
        </div>
      </card>
      </div>
    </div>
  </div>
</template>

<script src="./founds.js" />
<style lang="scss"  scoped src="./founds.scss" />
