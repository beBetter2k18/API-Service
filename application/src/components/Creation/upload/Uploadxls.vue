<template>
  <v-layout row wrap>
    <v-flex xs12  offset-md1 md10>
      <h3 style="font-size: 120%;  color: #ffffff">Загрузите учебный план (*.xls или *.xlsx файл)  </h3>
    </v-flex>
      <v-flex xs12  offset-md1 md10>
          <label>
        <input type="file" id="file" name ="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
        </v-flex>
        <v-flex xs12  offset-md1 md6>
          <v-btn block color="md-add-item-btn blue lighten-1" @click.native="submitFile()">Импортировать </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
  import uploadxls from '@/components/Creation/upload'
  
  export default {
    /*
      Defines the data used by the component
    */
    data () {
      return {
        file: ''
      }
    },

    methods: {
      /*
        Submits the file to the server
      */
      submitFile () {
        /*
            Initialize the form data
        */
        let formData = new FormData()

        /*
            Add the form data we need to submit
        */
        formData.append('file', this.file)
        /*
            Make the request to the POST /single-file URL
        */
        uploadxls.uploadxlsfile(this, formData, '/')
      },
      /*
        Handles a change on the file upload
      */
      handleFileUpload () {
        this.file = this.$refs.file.files[0]
      }
    }
  }
</script>