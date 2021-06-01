import valorInvestido from "../../components/Inputs/formGroupInput";
import prazoInvestimento from "../../components/Inputs/formGroupInput";
import investimentoData from "../../components/Inputs/formGroupInput";
import taxaInvestimento from "../../components/Inputs/formGroupInput";

import calcBtn from "../../components/Button";

import nomeInvestimento from "../../components/Dropdown.vue";
import rentabilidadeInvestimento from "../../components/Dropdown.vue";

import { baseURL } from "../../config/constants"

import axios from 'axios'

export default {
  name: "rendaFixa",
  components: {
    valorInvestido,
    prazoInvestimento,
    investimentoData,
    taxaInvestimento,
    calcBtn,
    nomeInvestimento,
    rentabilidadeInvestimento,
  },
  methods: {
    checkValues(errorList) {

      errorList = [],

      // Stage 1
      !this.stages.stage1.selectedProfitability ? errorList.push('Escolha uma das opções de tipo de rentabilidade para o cenário 1') : this.userData.stage1.profitability = this.stages.stage1.selectedProfitability;
      !this.stages.stage1.selectedInvestment ? errorList.push('Escolha uma das opções de tipo investimento para o cenário 1') : this.userData.stage1.investment = this.stages.stage1.selectedInvestment;
      !this.stages.stage1.inputYield && !isNaN(this.stages.stage1.inputYield) ? errorList.push('Taxa de Rendimento do cenário 1 deve ser maior que zero') : this.userData.stage1.inputYield = parseFloat(this.stages.stage1.inputYield);

      //Stage 2
      if (this.stages.stage2.selectedInvestment && this.stages.stage2.selectedProfitability) {
        this.userData.stage2.investment = this.stages.stage2.selectedInvestment;
        this.userData.stage2.profitability = this.stages.stage2.selectedProfitability;
        !this.stages.stage2.inputYield && !isNaN(this.stages.stage2.inputYield) ? errorList.push('Taxa de Rendimento do cenário 2 deve ser maior que zero') : this.userData.stage2.inputYield = parseFloat(this.stages.stage2.inputYield);
      }
      else if (this.stages.stage2.selectedInvestment && !this.stages.stage2.selectedProfitability) {
        errorList.push('Escolha uma das opções de tipo de rentabilidade para o cenário 2');
      }
      else if (!this.userData.stage2.selectedInvestment && this.userData.stage2.selectedProfitability) {
        errorList.push('Escolha uma das opções de tipo investimento para o cenário 2')
      }
      else if(!this.userData.stage2.selectedInvestment && !this.userData.stage2.selectedProfitability){
        this.userData.stage2.inputYield = parseFloat('0');
      }

      //Stage 3
      if (this.stages.stage3.selectedInvestment && this.stages.stage3.selectedProfitability) {
        this.userData.stage3.investment = this.stages.stage3.selectedInvestment;
        this.userData.stage3.profitability = this.stages.stage3.selectedProfitability;
        !this.stages.stage3.inputYield && !isNaN(this.stages.stage3.inputYield) ? errorList.push('Taxa de Rendimento do cenário 3 deve ser maior que zero') : this.userData.stage3.inputYield = parseFloat(this.stages.stage3.inputYield);
      }
      else if (this.stages.stage3.selectedInvestment && !this.stages.stage3.selectedProfitability) {
        errorList.push('Escolha uma das opções de tipo de rentabilidade para o cenário 3');
      }
      else if (!this.stages.stage3.selectedInvestment && this.stages.stage3.selectedProfitability) {
        errorList.push('Escolha uma das opções de tipo investimento para o cenário 3')
      }
      else if(!this.userData.stage3.selectedInvestment && !this.userData.stage3.selectedProfitability){
        this.userData.stage3.inputYield = parseFloat('0');
      }

      //Valores Globais
      !this.userData.amount && !isNaN(this.userData.amount) ? errorList.push('Preencha o valor que será investido') : this.userData.amount = parseFloat(parseFloat(this.userData.amount).toFixed(2));

      //REGEX para o campo de data
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      if ( !this.userData.deadline ){
        errorList.push('Preencha o prazo de investimento')
      }
      else if ( this.userData.deadline.match(regEx) == null ) {
        errorList.push('Preencha corretamente o prazo de investimento');
        this.userData.deadline = "";
      }
      else {
        this.userData.deadline = this.userData.deadline;
      }

      console.log(errorList);
      return errorList;
    },
    sendValues() {
      this.errosList = this.checkValues(this.errosList);
      // this.mostraGrafico = false;

      // Chama notificação de erro ou mostra gráfico (envia para backend)
      if (this.errosList.length) {
        this.errosList.forEach(x => {
          this.$notify({message: x, type: "danger", icon: "ti-alert"})
        });
      }
      else {
        let url = `${baseURL}/comparescenarios`
        axios
          .post(url, this.userData)
          .then(res => {
            this.series = res.data.series
            this.$notify({message: "Comparativo carregado com sucesso!", type: "success"})
            this.mostraGrafico = true;
          })
          .catch(e => {
            this.$notify({message: e.data, type: "danger"})
          })
      }

      // console.log("this.userData :>> ", this.userData);
    },
  },
  data() {
    return {
      mostraGrafico: true,
      errosList: [],
      userData: {
        amount: "",
        deadline: "",
        stage1: {
          investment: "",
          profitability: "",
          inputYield: "",
        },
        stage2: {
          investment: "",
          profitability: "",
          inputYield: "",
        },
        stage3: {
          investment: "",
          profitability: "",
          inputYield: "",
        }
      },
      stages: {
        stage1: {
          name: "Cenário 1",
          selectedInvestment: "",
          selectedProfitability: "",
          inputYield: "",
          investmentTypes: [
            { type: "IPCA+", stage: "investmentStage1", value: "ipca" },
            { type: "CDB/LC", stage: "investmentStage1", value: "cdb" },
            { type: "LCI/LCA", stage: "investmentStage1", value: "lci" },
          ],
          profitabilityTypes: [
            {
              type: "Pré-Fixada",
              stage: "profitabilityStage1",
              value: "prefixada",
            },
            {
              type: "Pós-Fixada",
              stage: "profitabilityStage1",
              value: "posfixada",
            },
          ],
        },
        stage2: {
          name: "Cenário 2",
          selectedInvestment: "",
          selectedProfitability: "",
          inputYield: "",
          investmentTypes: [
            { type: "IPCA+", stage: "investmentStage2", value: "ipca" },
            { type: "CDB/LC", stage: "investmentStage2", value: "cdb" },
            { type: "LCI/LCA", stage: "investmentStage2", value: "lci" },
          ],
          profitabilityTypes: [
            {
              type: "Pré-Fixada",
              stage: "profitabilityStage2",
              value: "prefixada"
            },
            {
              type: "Pós-Fixada",
              stage: "profitabilityStage2",
              value: "posfixada"
            },
          ],
        },
        stage3: {
          name: "Cenário 3",
          selectedInvestment: "",
          selectedProfitability: "",
          inputYield: "",
          investmentTypes: [
            { type: "IPCA+", stage: "investmentStage3", value: "ipca" },
            { type: "CDB/LC", stage: "investmentStage3", value: "cdb" },
            { type: "LCI/LCA", stage: "investmentStage3", value: "lci" },
          ],
          profitabilityTypes: [
            {
              type: "Pré-Fixada",
              stage: "profitabilityStage3",
              value: "prefixada"
            },
            {
              type: "Pós-Fixada",
              stage: "profitabilityStage3",
              value: "posfixada"
            },
          ],
        },
      },
      series: [],
      chartOptions: {
        title: {
          text: "Resultado Comparativo",
          align: "center",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "25px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        subtitle: {
          text: "Nos valores indicados já está o IR",
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 40,
          floating: false,
          style: {
            fontSize:  '12px',
            fontWeight:  'normal',
            fontFamily:  undefined,
            color:  '#9699a2'
          },
        },
        chart: {
          type: "bar",
          distributed: true,
          stacked: false,
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          position: 'center',
          style:{
            // colors: ["#00cc00", "#247BA0", "#3366cc"],
          },
          formatter: function (num, { seriesIndex, dataPointIndex, w }) {
            // console.log('w', w)
            // console.log('num', num)
            if (!isNaN(parseFloat(num))) {
              var numParsed = parseFloat(num);
              if (numParsed >= 1000000 || numParsed <= -1000000)
                return numParsed.toExponential(3);
              if (
                (numParsed > 0 && numParsed < 1) ||
                (numParsed < 0 && numParsed > -1)
              ) {
                numParsed = numParsed.toFixed(4);
              } else {
                numParsed = numParsed.toFixed(2);
              }
              numParsed = numParsed.replace(".", ",").split(",");
              let v1 = numParsed[0];
              let v2 = numParsed[1];
              v1 = v1.split("").reverse();
              let i = 0;
              var stop = 0;
              if (v1.length / 3 >= 1 && v1.length % 3 != 0) {
                i = 1;
                stop = Math.trunc(v1.length / 3);
              }
              if (v1.length / 3 >= 1 && v1.length % 3 == 0) {
                i = 1;
                stop = Math.trunc(v1.length / 3) - 1;
              }
              var pos = 3;
              if (i >= 1) {
                for (i; i <= stop; i++) {
                  v1.splice(pos, 0, ".");
                  pos = pos + 4;
                }
              }
              numParsed = v1.reverse().join("") + "," + v2;
              if (numParsed.includes("-.")) {
                numParsed = numParsed.replace("-.", "-");
              }
              return `R$ ${numParsed}` ;
            }
            return;
          },
        },
        noData: {
          text: "Sem dados para exibição!",
          align: 'center',
          verticalAlign: 'middle',
          style: {
            // color: "#FFFFFF",
            // fontSize: '14px',
            // fontFamily: undefined
          }
        },
        grid: {
          row: {
            //colors: ['#eef0f1', '#bdc1c1', '#7b7d7b', '#535350', '##9b9e9d']
            colors: ['#f4f3ef', '#f4efdb', '#f4e9bd', '#f4e5a9', '#f2d57c']
          },
          column: {
            colors: ["#d9d6d1"],
            opacity: 0.5
          },
          padding: {
            top: 0,
            right: 0,
            // left: 0,
            bottom: 0,
          },
        },
        stroke: {
          width: 10,
          show: true,
          colors: ['transparent']
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            distributed: false
          },
          area: {
            fillTo: "origin",
          },
        },
        colors: ["#059905", "#247BA0", "#8819bb"],
        markers: {
          // size: [2, 2, 2],
        },
        xaxis: {
          type: 'category',
          categories: ["Cenário1", "Cenário2", "Cenário3"],
          labels: {
            show: false,
          },
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "black",
            },
            labels: {
              style: {
                colors: "#263238",
              },
            },
            title: {
              text: "Rentabilidade",
              style: {
                color: "#263238",
              },
            },
          },
        ],
        tooltip: {
          shared: false,
          intersect: true,
          x: {
            show: false,
          },
          y: {
            formatter: function (num, { seriesIndex, dataPointIndex, w }) {
              // console.log('w', w)
              // console.log('num', num)
              if (!isNaN(parseFloat(num))) {
                var numParsed = parseFloat(num);
                if (numParsed >= 1000000 || numParsed <= -1000000)
                  return numParsed.toExponential(3);
                if (
                  (numParsed > 0 && numParsed < 1) ||
                  (numParsed < 0 && numParsed > -1)
                ) {
                  numParsed = numParsed.toFixed(4);
                } else {
                  numParsed = numParsed.toFixed(2);
                }
                numParsed = numParsed.replace(".", ",").split(",");
                let v1 = numParsed[0];
                let v2 = numParsed[1];
                v1 = v1.split("").reverse();
                let i = 0;
                var stop = 0;
                if (v1.length / 3 >= 1 && v1.length % 3 != 0) {
                  i = 1;
                  stop = Math.trunc(v1.length / 3);
                }
                if (v1.length / 3 >= 1 && v1.length % 3 == 0) {
                  i = 1;
                  stop = Math.trunc(v1.length / 3) - 1;
                }
                var pos = 3;
                if (i >= 1) {
                  for (i; i <= stop; i++) {
                    v1.splice(pos, 0, ".");
                    pos = pos + 4;
                  }
                }
                numParsed = v1.reverse().join("") + "," + v2;
                if (numParsed.includes("-.")) {
                  numParsed = numParsed.replace("-.", "-");
                }
                return `R$ ${numParsed}` ;
              }
              return;
            },
          },
        },
        legend: {
          show: true,
          horizontalAlign: "center",
          offsetX: 40,
        },
      },
    };
  },
};
