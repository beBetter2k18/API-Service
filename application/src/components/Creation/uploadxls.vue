<template>
  <v-layout row wrap>
    <v-flex xs12  offset-md1 md10>
      <h3 style="font-size: 120%;  color: #ffffff">Загрузите учебный план (*.xls или *.xlsx файл)  </h3>
    </v-flex>
      <v-flex xs12  offset-md1 md10>
          <label>
        <input type="file" id="files" ref="files"  multiple  v-on:change="handleFilesUpload()"/>
      </label>
      <div v-for="(file, key) in files" class="file-listing">{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )"><i class='material-icons icon'>highlight_off</i></span></div>

        </v-flex>
        <v-flex xs12  offset-md1 md6>
          <v-btn block color="md-add-item-btn blue lighten-1" @click.native="submitFiles()">Импортировать </v-btn>
        </v-flex>
    </v-layout>
</template>
<style lang="scss">
  @import "./../../assets/styles";
  .file-listing{
    color: $border-color-input;
  }
</style>


<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'
const RpdManagerAPI = 'http://localhost:3001'

export default {
    /*
      Defines the data used by the component
    */
  data () {
    return {
      files: []
    }
  },
  /*
    Defines the method used by the component
  */
  methods: {
    /*
      Adds a file
    */
    addFiles () {
      this.$refs.files.click()
    },
    /*
      Submits files to the server
    */
    submitFiles () {
      /*
        Initialize the form data
      */
      let formData = new FormData()
      /*
        Iteate over any file sent over appending the files
        to the form data.
      */
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i]
        formData.append('files[' + i + ']', file)
      }
      Axios.post(`${RpdManagerAPI}/api/v1/xlsximport`, formData, {
        headers: {
          'Authorization': Authentication.getAuthenticationHeader(this)
        },
        params: { user_id: this.$cookie.get('user_id') }
      }).then(function () {
        console.log('SUCCESS!!')
      }).catch(function () {
        console.log('FAILURE!!')
      })
    },
    /*
      Handles the uploading of files
    */
    handleFilesUpload () {
      let uploadedFiles = this.$refs.files.files
      /*
        Adds the uploaded file to the files array
      */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
    },
    /*
      Removes a select file the user has uploaded
    */
    removeFile (key) {
      this.files.splice(key, 1)
    }
  }
}
</script>
