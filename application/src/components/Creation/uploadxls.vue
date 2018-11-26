<template>
  <v-layout row wrap>
    <v-flex xs12  offset-md1 md10>
      <h3 style="font-size: 120%;  color: #ffffff">Загрузите учебный план (*.xls или *.xlsx файл)  </h3>
    </v-flex>
      <v-flex xs12  offset-md1 md10>
          <label>
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
        </v-flex>
        <v-flex xs12  offset-md1 md6>
          <v-btn block color="md-add-item-btn blue lighten-1" @click.native="submitFile()">Импортировать </v-btn>
        </v-flex>
    </v-layout>
</template>
<script>

</script>
