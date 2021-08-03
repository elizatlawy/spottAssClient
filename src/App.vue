<template>
  <div id="app">
    <bootstrap-product-table></bootstrap-product-table>
  </div>
</template>

<script>
import BootstrapProductTable from "./components/BootstrapProductTable";
export default {
  name: 'App',
  components: {
    BootstrapProductTable,
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>