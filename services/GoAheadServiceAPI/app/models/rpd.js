const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  client: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },


  description: {
    type: String,
    required: true
  },

  objectives: { //{Задачи} Цель и задачи изучения дисциплины
    type: String
  },

  placeDisp: { //Описать место дисциплины
    type: String
  },
  numberSemester: { //{№ Семестра}
      type: String
    },

  numberCredits: { //Количество зачетных единиц
            type: String
          },
  numberLab: { //Кол-во часов для лабораторной работы
        type: String
        },
    numberPractica: { //Кол-во часов для практической работы
          type: String
        },
    numberSeminar: { //Кол-во часов для семинарачной работы
          type: String
        },

    numberIndependentWork: {
        type: String
    },
    totalHours: { //{ОбщееКолЧ}
          type: String
        },
     numberCompetent: { //Шифр компетенции
         type: String
     },
     know: {  //знать
       type: String
     },
     can: {  //знать
       type: String
     },
     own: {  //знать
       type: String
     },
     items: [{}],


  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }


});

mongoose.model('Rpd', Schema);
