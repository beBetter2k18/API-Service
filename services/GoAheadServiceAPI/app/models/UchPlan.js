const mongoose = require('mongoose');

const Schema = mongoose.Schema({

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

    numberSeminar: { //Кол-во часов для семинарской работы
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

    know: { //знать
        type: String
    },

    can: { //уметь
        type: String
    },

    own: { // владеть
        type: String
    },

    items: [{}],

    data: [{}]

});

mongoose.model('UchPlan', Schema);