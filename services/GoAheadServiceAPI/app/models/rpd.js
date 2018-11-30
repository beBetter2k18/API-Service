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

   metodMaterial:  {  //методические материал
     type: String
   },
   questionsZach:  {  //вопросы  на зач/экзам
     type: String
   },

   predUmk: {  //председатель умк
     type: String
   },
   dataUmk:  {  //дата протокала
     type: String
   },
   numProtocolUmk:  {  //номер протокола
     type: String
   },
   zavKafedra:  {  //завед кафедр
     type: String
   },
   dataKafedra:  {  //дата утверждения на кафедре
     type: String
   },
   numProtocolKafedra:  {  //номер протокола
     type: String
   },
   rukOpop:  {  //руковод опоп
     type: String
   },
   section:  {  //профиль дисц
     type: String
   },
   department:  {  //кафедра
     type: String
   },
   faculty:  {  //факультет
     type: String
   },
   radio_bachelor_master:  {  //уровень
     type: String
   },
   codeD:  {  //код дисципл
     type: String
   },

    naprPodg:{     //Направление подготовки
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
