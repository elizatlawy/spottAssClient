import {mount} from '@vue/test-utils';
import EditModal from '@/components/EditProductModal'

describe('EditProductModal Unit Tests', () => {
    let wrapper = null
    beforeEach(() => {
        wrapper = mount(EditModal)
    })
    afterEach(() => {
        wrapper.destroy()
    })
    it('Test Modal exist', async () => {
        const modal = wrapper.find('[id="editProductModal"]');
        expect(modal.exists()).toBe(true);
    })
    it('Test form exist', async () => {
        const form = wrapper.find('[qa-data="updateProductForm"]');
        expect(form.exists()).toBe(true);
    })
    it('Test errorAlert not exist when showError is false', async () => {
        await wrapper.setData({showError: false})
        const errorAlert = wrapper.find('[id="errorAlert"]');
        expect(errorAlert.exists()).toBe(false);
    })
    it('Test errorAlert exist when showError is true', async () => {
        await wrapper.setData({showError: true, errorArray: ["error"]})
        const errorAlert = wrapper.find('[id="errorAlert"]');
        expect(errorAlert.exists()).toBe(true);
    })
    it('Test submit button exist', async () => {
        const submitButton = wrapper.find('[qa-data="submitButton"]');
        expect(submitButton.exists()).toBe(true);

    })
    it('Test cancel button exist', async () => {
        const cancelButton = wrapper.find('[qa-data="cancelButton"]');
        expect(cancelButton.exists()).toBe(true);
    })
    it('Test Modal fields show correct data', async () => {
        await wrapper.setData({
            form: {
                id: "B08QPPGNNZ",
                productName: "MediChair Kneeling Chair",
                cogs: {
                    unitManufacturingCost: 10,
                    shipmentUnitCost: 20,
                    monthlyAdvertismentCost: 30,
                    manufacturingCountry: "Angola"
                }
            },
            showModal: true
        })
        expect(wrapper.find('[qa-data="Unit-manufacturing-cost-input"]').element.value).toBe("10")
        expect(wrapper.find('[qa-data="shipment-unit-cost-input"]').element.value).toBe("20")
        expect(wrapper.find('[qa-data="monthly-advertising-cost-input"]').element.value).toBe("30")
        expect(wrapper.find('[qa-data="manufacturing-country-group-select"]').element.value).toBe("Angola")
    })
    it('Test cancel button close the modal', async () => {
        await wrapper.setData({showModal: true})
        const cancelButton = wrapper.find('[qa-data="cancelButton"]');
        expect(wrapper.vm.$data.showModal).toBe(true);
        await cancelButton.trigger('reset')
        expect(wrapper.vm.$data.showModal).toBe(false);
    })
    it('Test modal submit button calls the onSubmit function ', async () => {
        const onSubmitMethod = jest.spyOn(EditModal.methods, 'onSubmit')
        wrapper = mount(EditModal)
        const manufacturingCostInput = wrapper.find('[qa-data="Unit-manufacturing-cost-input"]');
        manufacturingCostInput.setValue("100")
        const submitButton = wrapper.find('[qa-data="submitButton"]')
        await submitButton.trigger('submit')
        expect(onSubmitMethod).toHaveBeenCalled()
    })
    it('Test modal submit button calls the postProductCogs function ', async () => {
        const onSubmitMethod = jest.spyOn(EditModal.methods, 'postProductCogs')
        wrapper = mount(EditModal)
        const submitButton = wrapper.find('[qa-data="submitButton"]')
        await submitButton.trigger('submit')
        expect(onSubmitMethod).toHaveBeenCalled()
    })
    it('Test modal cancel button calls the hide function ', async () => {
        const hideMethod = jest.spyOn(EditModal.methods, 'hide')
        wrapper = mount(EditModal)
        const cancelButton = wrapper.find('[qa-data="cancelButton"]')
        await cancelButton.trigger('reset')
        expect(hideMethod).toHaveBeenCalled()
    })
    it('Test modal cancel button calls the resetData function ', async () => {
        const resetDataMethod = jest.spyOn(EditModal.methods, 'resetData')
        wrapper = mount(EditModal)
        const cancelButton = wrapper.find('[qa-data="cancelButton"]')
        await cancelButton.trigger('reset')
        expect(resetDataMethod).toHaveBeenCalled()
    })
})
