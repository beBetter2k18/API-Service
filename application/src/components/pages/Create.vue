<template>
  <div class="l-create-page">
    <rpd-creation v-if="rpdCreation && !editPage" slot="rpd-creation" :clients="clients" :saveRpd="saveRpd"></rpd-creation>
    <client-creation v-if="!rpdCreation && !editPage" slot="client-creation" :saveClient="saveClient"></client-creation>

    <rpd-edit v-else-if="rpdEdit && editPage"
      slot="rpd-creation"
      :clients="clients"
      :selectedRpd="rpd"
      :fixClientNameAndUpdate="fixClientNameAndUpdate">
    </rpd-edit>

    <client-edit v-else-if="!rpdEdit && editPage"
      slot="client-creation"
      :selectedClient="client"
      :updateClient="updateClient">
    </client-edit>
  </div>
</template>

<script>
  import ListHeader from './../List/ListHeader'
  import ListBody from './../List/ListBody'
  import RpdCreation from './../Creation/RpdCreation'
  import ClientCreation from './../Creation/ClientCreation'
  import RpdEdit from './../Creation/RpdEdit'

  import ClientEdit from './../Creation/ClientEdit'
  export default {
    props: [
      'rpdCreation', 'clients', 'saveRpd',
      'saveClient', 'rpd', 'client', 'updateClient',
      'fixClientNameAndUpdate', 'editPage', 'rpdEdit'
    ],
    components: {
      'list-header': ListHeader,
      'list-body': ListBody,
      'rpd-creation': RpdCreation,
      'client-creation': ClientCreation,
      'rpd-edit': RpdEdit,
      'client-edit': ClientEdit
    }
  }
</script>
