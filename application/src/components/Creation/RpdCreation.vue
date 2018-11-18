<template>
  <div class="l-rpd-creation">
    <v-layout row wrap>
      <v-flex xs12 md5>
        <v-text-field label="Дисциплина"
                      v-model="rpd.title"
                      required
                      color="light-blue lighten-1">
        </v-text-field>
      </v-flex>
      <v-flex xs12 offset-md1 md3>
        <v-select
          label="Автор"
          :items="clients"
          v-model="rpd.client"
          item-text="name"
          item-value="_id"
        >
        </v-select>
      </v-flex>
      <v-flex xs12 offset-md1 md2>
        <v-select
          label="Статус"
          :items="states"
          v-model="rpd.state"
        >
        </v-select>
      </v-flex>

      <v-flex xs12  md12>
      <v-text-field label="Описание"
                    v-model="rpd.description"
                    textarea
                    required
                    color="light-blue lighten-1">
      </v-text-field>
  </v-flex>

      <v-flex xs12 md6>
        <v-text-field
          label="Цель и задачи изучения дисциплины"
          textarea
          v-model="rpd.objectives"
        >
        </v-text-field>
      </v-flex>

      <v-flex xs12  md6>
        <v-text-field
          label="Описать место дисциплины в структуре ООП ВО (ВПО)"
          textarea
          v-model="rpd.placeDisp"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs12 md5>
        <v-text-field
          label="Семестр"
          v-model="rpd.numberSemester"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs12  offset-md1 md6>
        <v-text-field
          label="Шифр компетенции"
          v-model="rpd.numberCompetent"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs12  md4>
        <v-text-field
          label="Знать"
          textarea
          v-model="rpd.know"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-text-field
          label="Уметь"
          textarea
          v-model="rpd.can"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-text-field
          label="Владеть"
          textarea
          v-model="rpd.own"
        >
        </v-text-field>
      </v-flex>

      <v-flex xs12 md5>
        <v-text-field
          label="Вид оценочного средства"
          v-model="rpd.own"
        >
        </v-text-field>
      </v-flex>

      <v-flex xs12 offset-md1 md6>
        <v-text-field
          label="Методические материалы"
          textarea
          v-model="rpd.own"
        >
        </v-text-field>
      </v-flex>

      <h4 class="white--text text-xs-center my-0">Литература</h4>
      <v-layout  row wrap v-for="item in rpd.items" class="l-budget-item" :key="item.id">
  <v-flex xs12 md4>
    <v-text-field label="Наименование"
                  box dark
                  v-model="item.title"
                  color="light-blue lighten-1">
    </v-text-field>
  </v-flex>

  <v-flex xs12 md1 offset-md1>
    <v-text-field label="Тип"
                  box dark
                  v-model="item.type"
                  color="light-blue lighten-1">
    </v-text-field>
  </v-flex>
  <v-flex xs12 md2 offset-md1>
    <v-text-field label="Количество"
                  box dark
                  min="0"
                  v-model="item.quantity"
                  type="number"
                  color="light-blue lighten-1">
    </v-text-field>
  </v-flex>
  <v-flex xs12 md1 offset-md1>
    <v-btn class="lighten-1--text" @click.native="removeItem(item)">x</v-btn>
  </v-flex>
</v-layout>
<v-flex xs12 md3 offset-md9>
  <v-btn block color="md-add-item-btn light-blue lighten-1" @click.native="addItem()">Добавить литературу</v-btn>
</v-flex>

      <v-flex xs12 md5>
        <v-text-field
          label="Литература"
          textarea
          v-model="rpd.own"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs12 offset-md1 md6>
        <v-text-field
          label="Вопрос на зачет/экзамен"
          textarea
          v-model="rpd.own"
        >
        </v-text-field>
      </v-flex>




      <v-flex xs12 md2 offset-md10>
        <v-btn block color="md-add-item-btn green lighten-1" @click.native="saveRpd(rpd)">Сохранить</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: ['clients', 'saveRpd'],
    data () {
      return {
        rpd: {
          title: null,
          description: null,
          objectives: null,
          placeDisp: null,
          numberSemester: null,
          totalHours: null,
          numberCredits: null,
          numberLab: null,
          numberPractica: null,
          numberSeminar: null,
          numberIndependentWork: null,
          state: 'writing',
          client: null,
          items: [
            {
              title: null,
              type: null,
              quantity: 0
            }
          ]
        },
        states: [
          'редактируется', 'на проверке', 'отправлена на доработку', 'утверждена'
        ]
      }
    },
    methods: {
      addItem () {
        const items = this.rpd.items
        const item = {
          title: '',
          type: '',
          quantity: 0
        }
        items.push(item)
      },
      removeItem (selected) {
        const items = this.rpd.items
        items.forEach((item, index) => {
          if (item === selected) {
            items.splice(index, 1)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./../../assets/styles";

  .uppercased {
    text-transform: uppercase;
  }

  .l-rpd-creation {
    label, input, .icon, .input-group__selections__comma, textarea {
      color: #29b6f6!important;
    }

    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }

    .input-group__input {
      border-color: $border-color-input !important;

      .input-group--text-field__prefix {
        margin-bottom: 3px !important;
      }
    }

    .input-group--focused {
      .input-group__input {
        border-color: #29b6f6!important;
      }
    }
  }

  .md-rpd-state-hint {
    margin: 10px 0;
    display: block;
    width: 100%;
  }

  .md-rpd-state {
    background-color: rgba(41, 182, 246, .6);
    display: flex;
    height: 35px;
    width: 100%;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    margin: 10px 0 15px;
  }

  .l-rpd-item {
    align-items: center;
  }

  .md-rpd-item-subtotal {
    font-size: 16px;
    text-align: center;
    display: block;
  }

  .md-rpd-item-total {
    font-size: 22px;
    text-align: center;
    display: block;
    width: 100%;
    margin: 30px 0 10px;
  }

  .md-add-item-btn {
    margin-top: 30px !important;
    display: block;
  }

  .list__tile__title, .input-group__selections {
    text-transform: uppercase !important;
  }
</style>
