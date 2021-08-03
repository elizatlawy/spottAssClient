<template>
  <div>
    <b-modal id="editProductModal" :static="true" v-model="showModal" :title="form.productName"
             headerBgVariant="primary" hide-footer @close="hide">
      <br>
      <div>
        <b-form @submit="onSubmit" qa-data="updateProductForm" @reset="hide">
          <b-form-group
              qa-data="unit-manufacturing-cost-group"
              label="Unit manufacturing cost:"
              label-for="Unit-manufacturing-cost-input"
              description="Unit manufacturing cost must be grater or equal to zero."
              align="left">
            <b-form-input
                qa-data="Unit-manufacturing-cost-input"
                v-model="form.cogs.unitManufacturingCost"
                type="number"
                min="0"
                step="0.01"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              qa-data="shipment-unit-cost-group"
              label="Shipment unit cost:"
              label-for="shipment-unit-cost-input"
              description="Shipment unit cost must be grater or equal to zero."
              align="left">
            <b-form-input
                qa-data="shipment-unit-cost-input"
                v-model="form.cogs.shipmentUnitCost"
                type="number"
                min="0"
                step="0.01"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              qa-data="monthly-advertising-cost-group"
              label="Monthly advertising cost:"
              label-for="monthly-advertising-cost-input"
              description="monthly advertising cost must be grater or equal to zero."
              align="left">
            <b-form-input
                qa-data="monthly-advertising-cost-input"
                v-model="form.cogs.monthlyAdvertismentCost"
                type="number"
                min="0"
                step="0.01"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              qa-data="manufacturing country-group"
              label="Manufacturing country:"
              label-for="manufacturing-country-group-select"
              align="left">
            <b-form-select
                qa-data="manufacturing-country-group-select"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="countries"
                v-model="form.cogs.manufacturingCountry">
              <b-form-select-option value="">No Country</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <div class="container">
            <div class="row">
              <div class="col text-center">
                <b-button class="modalButtonStyle" qa-data="submitButton" type="submit" variant="success">
                  Submit
                </b-button>
                <b-button qa-data="cancelButton" type="reset" title="cancel" variant="danger">
                  Cancel
                </b-button>
              </div>
            </div>
          </div>
          <b-alert id="errorAlert" variant="danger" @dismissed="onDismissError" :show="showError"
                   v-for="(error,index) in errorArray" :key="index"
                   dismissible>
            {{ error }}
          </b-alert>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {BootstrapVue} from 'bootstrap-vue'
import Vue from 'vue'

Vue.use(BootstrapVue)

export default {
  name: "EditProductModal",
  data: () => ({
    showModal: false,
    required: true,
    form: {
      id: '',
      productName: '',
      cogs: {
        unitManufacturingCost: '',
        shipmentUnitCost: '',
        monthlyAdvertismentCost: '',
        manufacturingCountry: '',
      },
    },
    countries: countries.map(country => country.name).sort(),
    showError: false,
    errorArray: []
  }),
  props: ['item'],
  methods: {
    show(itemFromParent) {
      this.form.id = itemFromParent.id
      this.form.productName = itemFromParent.productName
      this.form.cogs.unitManufacturingCost = itemFromParent.cogs.unitManufacturingCost
      this.form.cogs.shipmentUnitCost = itemFromParent.cogs.shipmentUnitCost
      this.form.cogs.monthlyAdvertismentCost = itemFromParent.cogs.monthlyAdvertismentCost
      this.form.cogs.manufacturingCountry = itemFromParent.cogs.manufacturingCountry
      this.showModal = true
    },
    onDismissError() {
      this.showError = false
    },
    hide() {
      this.showModal = false;
      this.resetData();
    },
    onSubmit(event) {
      event.preventDefault();
      this.postProductCogs();
    },
    resetData() {
      Object.assign(this.$data, this.$options.data())
    },
    async postProductCogs() {
      let productJson = this.form;
      try {
        await this.axios.post("http://localhost:3000/cogs", productJson);
        this.hide();
        this.$emit('fetchProducts');
      } catch (error) {
        this.showError = true;
        this.errorArray = error.response ? error.response.data.errors : [error]
      }
    }
  }
}
</script>

<style scoped>

.modalButtonStyle {
  align-content: center;
  margin: 10px;
}

</style>
