<template>
  <main class="l-home-page">
    <app-header :rpdsVisible="rpdsVisible"
      @toggleVisibleDataRpd="rpdsVisible=true; rpdCreation=true"
      @toggleVisibleDataUser="rpdsVisible=false; rpdCreation=false"
      :selectState="selectState"
      :search="search"
      v-model="search">
    </app-header>

    <div class="l-home">
      <h4 class="white--text text-xs-center my-0">
        Автоматизированная система генерации РПД
      </h4>
      <v-tooltip bottom v-if="rpdsVisible">
        <v-btn color="purple lighten-2"
               dark
               small
               fab
               slot="activator"
               @click.native="rpdCreation = false; listPage = true; rpdsVisible = true">
              <v-icon>assessment</v-icon>
        </v-btn>
        <span>Список РПД</span>
      </v-tooltip>
         <v-tooltip bottom v-if="rpdsVisible">
              <v-btn color="light-blue lighten-1"
                     dark
                     small
                     fab
                     slot="activator"
                     @click.native="rpdCreation = true; listPage = false; editPage = false; createPage = true">
                    <v-icon>assignment</v-icon>
              </v-btn>
              <span>Добавить РПД</span>
            </v-tooltip>
            <v-tooltip bottom v-if="!rpdsVisible">
              <v-btn color="deep-orange lighten-2"
                     dark
                     small
                     fab
                     slot="activator"
                     @click.native="rpdCreation = false; listPage = true; rpdsVisible = false;">
                    <v-icon>supervisor_account</v-icon>
              </v-btn>
              <span>Список пользователей</span>
            </v-tooltip>
            <v-tooltip bottom v-if="!rpdsVisible">
              <v-btn color="green lighten-1"
                     dark
                     small
                     fab
                     slot="activator"
                     @click.native="rpdCreation = false; listPage = false; editPage = false; createPage = true">
                    <v-icon>account_circle</v-icon>
              </v-btn>
              <span>Добаввить пользователя</span>
            </v-tooltip>


      <list v-if="listPage">
        <list-header slot="list-header" :headers="rpdsVisible ? rpdHeaders : clientHeaders"></list-header>
        <list-body slot="list-body"
                   :rpdsVisible="rpdsVisible"
                   :data="rpdsVisible ? rpds : clients"
                   :search="search"
                   :deleteItem="deleteItem"
                   :getRpd="getRpd"
                   :getClient="getClient"
                   :parsedRpds="parsedRpds">
        </list-body>
      </list>

      <create v-else-if="createPage"
        :rpdCreation="rpdCreation"
        :rpdEdit="rpdEdit"
        :editPage="editPage"
        :clients="clients"
        :rpd="rpd"
        :client="client"
        :saveRpd="saveRpd"
        :saveClient="saveClient"
        :fixClientNameAndUpdate="fixClientNameAndUpdate"
        :updateClient="updateClient">
      </create>
    </div>

    <v-snackbar :timeout="timeout"
                bottom="bottom"
                :color="snackColor"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>


  </main>
</template>

<script>
  import Axios from 'axios'
  import Authentication from '@/components/pages/Authentication'
  import ListHeader from './../List/ListHeader'
  import ListBody from './../List/ListBody'

  const RpdManagerAPI = 'http://localhost:3001'

  export default {
    components: {
      'list-header': ListHeader,
      'list-body': ListBody
    },
    data () {
      return {
        parsedRpds: null,
        rpd: null,
        client: null,
        state: null,
        search: null,
        rpds: [],
        clients: [],
        rpdHeaders: ['Автор', 'Дисциплина', 'Статус', 'Редактировать'],
        clientHeaders: ['Пользователь', 'Email', 'Телефон', 'Редактировать'],
        rpdsVisible: true,
        snackbar: false,
        timeout: 6000,
        message: '',
        fab: false,
        listPage: true,
        createPage: false,
        editPage: false,
        rpdCreation: true,
        rpdEdit: true,
        snackColor: 'red lighten-1'
      }
    },
    mounted () {
      this.getAllRpds()
      this.getAllClients()
      this.hidden = false
    },
    watch: {
      'search': function () {
        if (this.search !== null || this.search !== '') {
          const searchTerm = this.search
          const regex = new RegExp(`^(${searchTerm})`, 'g')
          const results = this.rpds.filter(rpd => rpd.client.match(regex))
          this.parsedRpds = results
        } else {
          this.parsedRpds = null
        }
      }
    },
    methods: {
      getAllRpds () {
        Axios.get(`${RpdManagerAPI}/api/v1/rpd`, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: { user_id: this.$cookie.get('user_id') }
        }).then(({data}) => {
          this.rpds = this.dataParser(data, '_id', 'client', 'title', 'state', 'client_id')
        }).catch(error => {
          this.errorHandler(error)
        })
      },

      getAllClients () {
        Axios.get(`${RpdManagerAPI}/api/v1/client`, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: { user_id: this.$cookie.get('user_id') }
        }).then(({data}) => {
          this.clients = this.dataParser(data, 'name', 'email', '_id', 'phone')
        }).catch(error => {
          this.errorHandler(error)
        })
      },

      getRpd (rpd) {
        Axios.get(`${RpdManagerAPI}/api/v1/rpd/single`, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: {
            user_id: this.$cookie.get('user_id'),
            _id: rpd._id
          }
        }).then(({data}) => {
          this.rpd = data
          this.enableEdit('rpd')
        }).catch(error => {
          this.errorHandler(error)
        })
      },

      getClient (client) {
        Axios.get(`${RpdManagerAPI}/api/v1/client/single`, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: {
            user_id: this.$cookie.get('user_id'),
            _id: client._id
          }
        }).then(({data}) => {
          this.client = data
          this.enableEdit('client')
        }).catch(error => {
          this.errorHandler(error)
        })
      },

      enableEdit (type) {
        if (type === 'rpd') {
          this.listPage = false
          this.rpdEdit = true
          this.rpdCreation = false
          this.editPage = true
        } else if (type === 'client') {
          this.listPage = false
          this.rpdEdit = false
          this.rpdCreation = false
          this.editPage = true
        }
      },

      saveRpd (rpd) {
        Axios.post(`${RpdManagerAPI}/api/v1/rpd`, rpd, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: { user_id: this.$cookie.get('user_id') }
        })
        .then(res => {
          this.resetFields(rpd)
          this.snackbar = true
          this.message = res.data.message
          this.snackColor = 'green lighten-1'
          this.getAllRpds()
        })
        .catch(error => {
          this.errorHandler(error)
        })
      },

      fixClientNameAndUpdate (rpd) {
        this.clients.find(client => {
          if (client._id === rpd.client_id) {
            rpd.client = client.name
          }
        })

        this.updateRpd(rpd)
      },

      updateRpd (rpd) {
        Axios.put(`${RpdManagerAPI}/api/v1/rpd/single`, rpd, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: { user_id: this.$cookie.get('user_id') }
        })
        .then(() => {
          this.snackbar = true
          this.message = 'Rpd updated'
          this.snackColor = 'green lighten-1'
          this.listPage = true
          this.rpdCreation = false
          this.rpdsVisible = true
          this.getAllRpds()
        })
        .catch(error => {
          this.errorHandler(error)
        })
      },

      updateClient (client) {
        Axios.put(`${RpdManagerAPI}/api/v1/client/single`, client, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: { user_id: this.$cookie.get('user_id') }
        })
        .then(() => {
          this.snackbar = true
          this.message = 'Client updated'
          this.snackColor = 'green lighten-1'
          this.listPage = true
          this.rpdCreation = false
          this.rpdsVisible = false
          this.getAllClients()
        })
        .catch(error => {
          this.errorHandler(error)
        })
      },

      saveClient (client) {
        Axios.post(`${RpdManagerAPI}/api/v1/client`, client, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: { user_id: this.$cookie.get('user_id') }
        })
        .then(res => {
          this.resetFields(client)
          this.snackbar = true
          this.message = res.data.message
          this.snackColor = 'green lighten-1'
          this.getAllClients()
        })
        .catch(error => {
          this.errorHandler(error)
        })
      },

      deleteItem (selected, literats, api) {
        let targetApi = ''
        api ? targetApi = 'rpd' : targetApi = 'client'
        Axios.delete(`${RpdManagerAPI}/api/v1/${targetApi}`, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: {
            user_id: this.$cookie.get('user_id'),
            _id: selected._id
          }
        })
        .then(() => {
          this.removeItem(selected, literats)
        })
        .then(() => {
          api ? this.getAllRpds() : this.getAllClients()
        })
        .catch(error => {
          this.errorHandler(error)
        })
      },

      errorHandler (error) {
        const status = error.response.status
        this.snackbar = true
        this.snackColor = 'red lighten-1'
        if (status === 404) {
          this.message = 'Invalid request'
        } else if (status === 401 || status === 403) {
          this.message = 'Unauthorized'
        } else if (status === 400) {
          this.message = 'Invalid or missing information'
        } else {
          this.message = error.message
        }
      },

      removeItem (selected, literats) {
        literats.forEach((literat, index) => {
          if (literat === selected) {
            literats.splice(index, 1)
          }
        })
      },

      dataParser (targetedArray, ...options) {
        let parsedData = []
        targetedArray.forEach(literat => {
          let parsedItem = {}
          options.forEach(option => (parsedItem[option] = literat[option]))
          parsedData.push(parsedItem)
        })
        return parsedData
      },

      resetFields (literat) {
        for (let key in literat) {
          literat[key] = null

          if (key === 'quantity' || key === 'price') {
            literat[key] = 0
          }

          literat['literats'] = []
        }
      },

      selectState (state) {
        this.state = state
        state === 'all' ? this.getAllRpds() : this.getRpdsByState(state)
      },

      getRpdsByState (state) {
        Axios.get(`${RpdManagerAPI}/api/v1/rpd/state`, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: { user_id: this.$cookie.get('user_id'), state }
        }).then(({data}) => {
          this.rpds = this.dataParser(data, '_id', 'client', 'title', 'state', 'client_id')
        }).catch(error => {
          this.errorHandler(error)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./../../assets/styles";

  .l-home {
    background-color: $background-color;
    margin: 25px auto;
    padding: 15px;
    min-width: 272px;
  }

  .snack__content {
    justify-content: center !important;
  }
</style>
