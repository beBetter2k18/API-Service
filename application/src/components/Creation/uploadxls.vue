<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
        <button v-on:click="submitFile()">Иипортировать </button>
    </div>
  </div>
</template>
<script>

</script>
