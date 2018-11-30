<template>
  <div class="l-rpd-creation">
    <v-layout row wrap>
      <tabs :options = "{useUrlFragment: false}">
              <tab prefix="<i class='material-icons icon'>info</i>"  name = "Основная информация">
                <v-layout row wrap>
                  <v-flex xs12 offset-md1 md5>
                    <v-text-field label="Дисциплина"
                                  v-model="rpd.title"
                                  required
                                  color="light-blue lighten-1">
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12 offset-md1 md5>
                    <v-text-field
                      label="Шифр дисциплины"
                      v-model="rpd.codeD"
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12 offset-md1 md5>
                    <v-select
                      label="Автор"
                      :items="clients"
                      v-model="rpd.client"
                      item-text="name"
                      item-value="_id"
                    >
                    </v-select>
                  </v-flex>
                  <v-flex xs12 offset-md1 md5>
                    <v-select
                      label="Статус"
                      :items="states"
                      v-model="rpd.state"
                    >
                    </v-select>
                  </v-flex>
                  <v-flex xs12 offset-md1 md10>
                    <v-radio-group v-model="rpd.radio_bachelor_master" row required>
                      <v-radio
                        label="Бакалавриат"
                        color="light-blue lighten-1"
                        value="bachelor"
                      ></v-radio>
                      <v-radio
                        label="Магистратура"
                        color="light-blue lighten-1"
                        value="master"
                      ></v-radio>
                    <v-radio
                      label="Аспирантура"
                      color="light-blue lighten-1"
                      value="graduateSchool"
                    ></v-radio>
                  </v-radio-group>
                  </v-flex>

                <v-flex xs12 offset-md1 md3>
                  <v-select
                    label="Факультет"
                    :items="faculties"
                    v-model="rpd.faculty"
                  >
                  </v-select>
                </v-flex>

                <v-flex xs12 offset-md1 md3  >
                  <v-select
                    label="Кафедра"
                    :items="departments1"
                    v-model="rpd.department"
                  >
                  </v-select>
                </v-flex>

                <v-flex xs12 offset-md1 md2>
                  <v-select
                    label="Профиль"
                    :items="sections"
                    v-model="rpd.section"
                  >
                  </v-select>
                </v-flex>

                <v-flex xs12 offset-md1 md10>
                  <v-text-field
                    label="Руководитель ОПОП"
                    v-model="rpd.rukOpop"
                  >
                  </v-text-field>
                </v-flex>
                  </v-layout>
              </tab >
              <tab prefix="<i class='material-icons icon'>description</i>" name = "Протоколы">
                <v-layout row wrap>
                  <v-flex xs12 offset-md1 md10>
                    <h3 style="font-size: 120%;  color: #ffffff">Рабочая программа утверждена на кафедре </h3>
                  </v-flex>

                  <v-flex xs12 offset-md1 md2>
                    <v-text-field
                      label="Протокол №"
                      v-model="rpd.numProtocolKafedra"
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12 offset-md1 md3>
                    <v-text-field
                      label="Дата"
                      v-model="rpd.dataKafedra"
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12 offset-md1 md4>
                    <v-text-field
                      label="Зав. кафедрой"
                      v-model="rpd.zavKafedra"
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12 offset-md1 md10>
                    <h3 style="font-size: 120%;  color: #ffffff">Рабочая программа одобрена на заседании УМК факультета </h3>
                  </v-flex>

                  <v-flex xs12 offset-md1 md2>
                    <v-text-field
                      label="Протокол №"
                      v-model="rpd.numProtocolUmk"
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12 offset-md1 md3>
                    <v-text-field
                      label="Дата"
                      v-model="rpd.dataUmk"
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12 offset-md1 md4>
                    <v-text-field
                      label="Председатель УМК"
                      v-model="rpd.predUmk"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </tab >
              <tab prefix="<i class='material-icons icon'>insert_drive_file</i>" name = "Дополнительная информация">
                  <v-layout row wrap>
                    <v-flex xs12 offset-md1 md5>
                      <v-text-field
                        label="Цель и задачи изучения дисциплины"
                        textarea
                        v-model="rpd.objectives">
                      </v-text-field>
                    </v-flex>

                    <v-flex xs12  offset-md1 md5>
                      <v-text-field
                        label="Описать место дисциплины в структуре ООП ВО (ВПО)"
                        textarea
                        v-model="rpd.placeDisp"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 offset-md1 md5>
                      <v-text-field
                        label="Семестр"
                        v-model="rpd.numberSemester"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12  offset-md1 md5>
                      <v-text-field
                        label="Шифр компетенции"
                        v-model="rpd.numberCompetent"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12  offset-md1 md3>
                      <v-text-field
                        label="Знать"
                        textarea
                        v-model="rpd.know"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 offset-md1 md3>
                      <v-text-field
                        label="Уметь"
                        textarea
                        v-model="rpd.can"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 offset-md1 md3>
                      <v-text-field
                        label="Владеть"
                        textarea
                        v-model="rpd.own"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 offset-md1 md5>
                      <v-text-field
                        label="Вопрос на зачет/экзамен"
                        textarea
                        v-model="rpd.own"
                      >
                      </v-text-field>
                    </v-flex>

                    <v-flex xs12 offset-md1 md5>
                      <v-text-field
                        label="Методические материалы"
                        textarea
                        v-model="rpd.own"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
              </tab >
              <tab prefix="<i class='material-icons icon'>library_books</i>" name = "Литература">
                  <v-layout row wrap>
                      <v-flex xs12 offset-md1 md10>
                        <h4 class="white--text text-xs-center my-0">Список литературы</h4>
                      </v-flex>
                    <v-layout  row wrap v-for="item in rpd.items" class="l-budget-item" :key="item.id">
                <v-flex xs12 offset-md1 md3>
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

                  <v-btn icon top class="lighten-1--text" @click.native="removeItem(item)"><i class='material-icons icon'>highlight_off</i></v-btn>
        </v-layout>
              <v-flex xs12 md4 offset-md8>
                <v-btn block color="md-add-item-btn light-blue lighten-1" @click.native="addItem()">Добавить поле</v-btn>
              </v-flex>

                  </v-layout>
              </tab >

              <tab prefix="<i class='material-icons icon'>attach_file</i>" name = "Загрузка учебного плана">
                    <uploadxls></uploadxls>
              </tab >
              <tab prefix="<i class='material-icons icon'>vertical_align_bottom</i>" name = "Сгенерировать РПД">
                    <uploadxls></uploadxls>
              </tab >
          </tabs>



      <v-flex xs12 md2 offset-md10>
        <v-btn block color="md-add-item-btn green lighten-1" @click.native="saveRpd(rpd)">Сохранить</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import uploadxls from './../Creation/upload/Uploadxls'
export default {
  props: ['clients', 'saveRpd'],
  components: {
    'uploadxls': uploadxls
  },
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
        state: 'редактируется',
        client: null,
        items: [
          {
            title: null,
            type: null,
            quantity: 0
          }
        ]
      },
      faculties: [
        'Факультет экономики, менеджмента и информационных технологий', 'Факультет психологии и педагогического образования', 'Факультет истории, искусств и крымскотатарского языка и литературы', 'Филологический факультет', 'Инженерно-технологический факультет'
      ],
      departments1: [
        '38.03.01. Экономика', '09.03.03 Прикладная информатика', '38.03.02 Менеджмент',
        '38.04.01 Экономика', '38.04.02 Менеджмент', '09.04.03 Прикладная информатика',
        '38.06.01 Экономика',
        '44.04.01 Педагогическое образование', '37.04.01 Психология', '44.04.03 Специальное (дефектологическое) образование',
        '44.03.01 Педагогическое образование', '44.03.03 Специальное (дефектологическое) образование', '37.03.01 Психология', '45.03.01 Филология',
        '45.04.01 Филология', '45.06.01. Языкознание и литературоведение', '10.01.01. Русская литература',
        '15.03.01 Машиностроение', '15.03.05 Конструкторско-технологическое обеспечение машиностроительных производств', '20.03.01 Техносферная безопасность', '23.03.03 Эксплуатация транспортно-технологических машин и комплексов', '44.03.04 Профессиональное обучение'
      ],
      sections: [
        'Бухгалтерский учет, анализ и аудит', 'Финансовый контроль и государственный аудит', 'Налоги и налогообложение', 'Мировая экономика',
        'Прикладная информатика в информационной сфере',
        'Менеджмент (гостиничный, курортный и туристический бизнес', 'Логистика и управление цепями поставок'
      ],
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
  li.tabs-component-tab {
    margin: 20px 0px;
    padding: 5px;
    border: 1px solid #16b5f9;
}
.tabs-component-tab-a {
    /* margin: 13px 0px; */
    text-decoration: none;
    color: $background-tint!important;
}
  .tabs-component.max {
    width: 100%;
}
  ul.tabs-component-tabs {
      width: 173px;
      float: left;
  }

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
