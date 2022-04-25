<template>
  <div id="ProductTable" class="container mt-3 mb-5">
    <h1 class="mainTitle">Product Table Home Assignment </h1>
    <h2 class="subTitle">Eli Zatlawy</h2>
    <b-alert id="errorAlert" variant="danger"
      :show="showError"
      v-for="(error,index) in errorArray" :key="index"
      dismissible>
      {{ error }}
    </b-alert>
    <b-row class="mb-3">
      <b-col md="3">
        <b-form-input v-model="filterInput" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
      </b-col>
    </b-row>
    <b-table id="product-table" striped hover head-variant="light"
      :busy="isTableBusy"
      :items="products"
      :filter="filterInput"
      :fields="fields"
      :bordered="bordered"
      :borderless="bordered">
      <template #table-busy>
        <div id="loadingSpinnerDiv" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(cogs.unitManufacturingCost)="row">
        {{
          row.item.cogs.unitManufacturingCost ? Number(row.item.cogs.unitManufacturingCost).toLocaleString() + '$' : '0$'
        }}
      </template>
      <template #cell(cogs.shipmentUnitCost)="row">
        {{ row.item.cogs.shipmentUnitCost ? Number(row.item.cogs.shipmentUnitCost).toLocaleString() + '$' : '0$' }}
      </template>
      <template #cell(cogs.monthlyAdvertismentCost)="row">
        {{
          row.item.cogs.monthlyAdvertismentCost ? Number(row.item.cogs.monthlyAdvertismentCost).toLocaleString() + '$' : '0$'
        }}
      </template>
      <template #cell(cogs.manufacturingCountry)="row">
        {{ row.item.cogs.manufacturingCountry ? row.item.cogs.manufacturingCountry : '-' }}
      </template>
      <template #cell(actions)="row">
        <b-button id="openProductModalButton" data-qa="EditButton" size="md" variant="primary"
                  @click="openEditProductModal(row.item)">
          Edit
        </b-button>
        <edit-product-modal ref="EditProductModal" id="EditModal" :item="row.item"
                            @fetchProducts="fetchProducts"></edit-product-modal>
      </template>
    </b-table>
    <label id="no-content-label"
      v-if="products.length===0 && !isTableBusy">
      No Content To Show
    </label>
  </div>
</template>

<script>
import EditProductModal from "@/components/EditProductModal";
import {BootstrapVue} from 'bootstrap-vue'
import Vue from 'vue'

Vue.use(BootstrapVue)


export default {
  name: "BootstrapProductTable",
  components: {
    'edit-product-modal': EditProductModal,
  },
  data() {
    return {
      filterInput: "",
      bordered: true,
      isTableBusy: false,
      products: [],
      fields: [
        {key: 'productName', label: 'Product Name', sortable: true, sortDirection: 'desc'},
        {key: 'cogs.unitManufacturingCost', label: 'Unit manufacturing cost', sortable: true,},
        {key: 'cogs.shipmentUnitCost', label: 'Shipment unit cost', sortable: true},
        {key: 'cogs.monthlyAdvertismentCost', label: 'Monthly advertising cost', sortable: true,},
        {key: 'cogs.manufacturingCountry', label: 'Manufacturing country', sortable: true,},
        {key: 'actions', label: 'Actions'}
      ],
      errorArray: [],
      showError: false
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    openEditProductModal(row) {
      this.$refs.EditProductModal.show(row)
    },
    async fetchProducts() {
      try {
        this.isTableBusy = true;
        //delay example
        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await delay(1000)
        let response;
        response = await this.axios.get(
            "http://localhost:3001/products"
        );
        this.products = response.data;
      } catch (error) {
        this.showError = true;
        this.errorArray = error.response ? error.response.data.errors : [error]
      }
      this.isTableBusy = false;
    }
  }
}
</script>

<style scoped>

.mainTitle {
  font-size: 36px;
  margin-bottom: 16px;
  margin-top: 20px;
  text-align: center;
}

.subTitle {
  font-size: 24px;
  margin-top: 16px;
  text-align: center;
}

</style>
