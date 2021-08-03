import ProductTable from '@/components/BootstrapProductTable'
import {BAlert, BCol, BRow, BTable} from 'bootstrap-vue';
import {mount} from '@vue/test-utils';
import EditProductModal from "@/components/EditProductModal";

describe('ProductTable Unit Tests', () => {
    let wrapper = null
    beforeEach(() => {
        wrapper = mount(ProductTable)
    })
    afterEach(() => {
        wrapper.destroy()
    })
    it('Test all table components was mount correctly When table has data', async () => {
        await wrapper.setData({products: mockProduct})
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.find("h1").text()).toBe("Product Table Home Assignment");
        expect(wrapper.find("h2").text()).toBe("Eli Zatlawy");
        expect(wrapper.findComponent(BTable).exists()).toBe(true);
        expect(wrapper.findComponent(BAlert).exists()).toBe(true);
        expect(wrapper.findComponent(BRow).exists()).toBe(true);
        expect(wrapper.findComponent(BCol).exists()).toBe(true);
        expect(wrapper.findComponent(EditProductModal).exists()).toBe(true);
    })
    it('Test The Row is updated correctly with 1 product data', async () => {
        expect(wrapper.findAll('tbody > tr')).toHaveLength(0);
        await wrapper.setData({products: mockProduct})
        expect(wrapper.findAll('tbody > tr')).toHaveLength(1);
        expect(wrapper.findAll('tbody > tr > td').at(0).text()).toBe('MediChair Kneeling Chair');
        expect(wrapper.findAll('tbody > tr > td').at(1).text()).toBe('1$');
        expect(wrapper.findAll('tbody > tr > td').at(2).text()).toBe('2$');
        expect(wrapper.findAll('tbody > tr > td').at(3).text()).toBe('3$');
        expect(wrapper.findAll('tbody > tr > td').at(4).text()).toBe('Israel');
    })
    it('Test 3 Rows are updated correctly with 3 products data', async () => {
        expect(wrapper.findAll('tbody > tr')).toHaveLength(0);
        await wrapper.setData({products: mockProducts})
        const trs = wrapper.findAll('tbody > tr').wrappers
        expect(trs).toHaveLength(3);
        expect(trs[0].findAll('td').at(0).text()).toBe('MediChair Kneeling Chair');
        expect(trs[0].findAll('td').at(1).text()).toBe('1$')
        expect(trs[0].findAll('td').at(2).text()).toBe('2$')
        expect(trs[0].findAll('td').at(3).text()).toBe('3$')
        expect(trs[0].findAll('td').at(4).text()).toBe('Israel')
        expect(trs[1].findAll('td').at(0).text()).toBe('Arcade Basketball Hoop Game by BestKidBall');
        expect(trs[1].findAll('td').at(1).text()).toBe('4$')
        expect(trs[1].findAll('td').at(2).text()).toBe('5$')
        expect(trs[1].findAll('td').at(3).text()).toBe('6$')
        expect(trs[1].findAll('td').at(4).text()).toBe('Angola')
        expect(trs[2].findAll('td').at(0).text()).toBe('Drawing Stencil Set for Kids with 240+ Shapes.');
        expect(trs[2].findAll('td').at(1).text()).toBe('7$')
        expect(trs[2].findAll('td').at(2).text()).toBe('8$')
        expect(trs[2].findAll('td').at(3).text()).toBe('9$')
        expect(trs[2].findAll('td').at(4).text()).toBe('Albania')
    })
    it('Test loading spinner appear when table is busy', async () => {
        await wrapper.setData({isTableBusy: true})
        expect(wrapper.find('[id="loadingSpinnerDiv"]').exists()).toBe(true);
        expect(wrapper.find('[id="loadingSpinnerDiv"]').text()).toBe("Loading...");
    })
    it('Test loading spinner not appear when table is not busy', async () => {
        await wrapper.setData({isTableBusy: false})
        expect(wrapper.find('[id="loadingSpinnerDiv"]').exists()).toBe(false);
    })
    it('Test errorAlert exist when showError is true', async () => {
        await wrapper.setData({showError: true, errorArray: ["error"]})
        const errorAlert = wrapper.find('[id="errorAlert"]');
        expect(errorAlert.exists()).toBe(true);
    })
    it('Test "No Content To" Show appear When Products are empty', async () => {
        await wrapper.setData({products: []})
        expect(wrapper.find('[id="no-content-label"]').exists()).toBe(true)
        expect(wrapper.find('[id="no-content-label"]').text()).toBe("No Content To Show");
    })
    it('Test "No Content To" not Show do not appear When Products are not empty', async () => {
        await wrapper.setData({products: mockProduct})
        expect(wrapper.find('[id="no-content-label"]').exists()).toBe(false);
    })
    it('Test Edit button click show modal component', async () => {
        const wrapper = mount(ProductTable)
        await wrapper.setData({products: mockProduct})
        const button = wrapper.find('[id="openProductModalButton"]')
        const modal = wrapper.find('[id="EditModal"]')
        expect(modal.vm.$data.showModal).toBe(false);
        await button.trigger('click')
        expect(modal.vm.$data.showModal).toBe(true);
        wrapper.destroy();
    })
    it('Test modal component show correct data after open', async () => {
        await wrapper.setData({products: mockProduct})
        const button = wrapper.find('[id="openProductModalButton"]')
        await button.trigger('click')
        expect(wrapper.find('[qa-data="Unit-manufacturing-cost-input"]').element.value).toBe("1")
        expect(wrapper.find('[qa-data="shipment-unit-cost-input"]').element.value).toBe("2")
        expect(wrapper.find('[qa-data="monthly-advertising-cost-input"]').element.value).toBe("3")
        expect(wrapper.find('[qa-data="manufacturing-country-group-select"]').element.value).toBe("Israel")
    })
    it('Test cancel button close the modal', async () => {
        const mockHideFucn = jest.spyOn(EditProductModal.methods, 'hide')
        // need to mount again after spyOn
        const wrapper = mount(ProductTable)
        await wrapper.setData({products: mockProduct})
        const button = wrapper.find('[id="openProductModalButton"]')
        const modal = wrapper.find('[id="EditModal"]')
        expect(modal.vm.$data.showModal).toBe(false)
        await button.trigger('click')
        expect(modal.vm.$data.showModal).toBe(true)
        const cancelButton = wrapper.find('[qa-data="cancelButton"]')
        await cancelButton.trigger('reset')
        expect(modal.vm.$data.showModal).toBe(false)
        expect(mockHideFucn).toHaveBeenCalled()
    })
})

const mockProduct = [
    {
        "id": "B08QPPGNNZ",
        "productName": "MediChair Kneeling Chair",
        "cogs": {
            "unitManufacturingCost": 1,
            "shipmentUnitCost": 2,
            "monthlyAdvertismentCost": 3,
            "manufacturingCountry": "Israel"
        }
    }];


const mockProducts = [
    {
        "id": "B08QPPGNNZ",
        "productName": "MediChair Kneeling Chair",
        "cogs": {
            "unitManufacturingCost": 1,
            "shipmentUnitCost": 2,
            "monthlyAdvertismentCost": 3,
            "manufacturingCountry": "Israel"
        },
    },
    {
        "id": "B093TGGHS7",
        "productName": "Arcade Basketball Hoop Game by BestKidBall",
        "cogs": {
            "unitManufacturingCost": 4,
            "shipmentUnitCost": 5,
            "monthlyAdvertismentCost": 6,
            "manufacturingCountry": "Angola"
        }
    },
    {
        "id": "B078J1F569",
        "productName": "Drawing Stencil Set for Kids with 240+ Shapes.",
        "cogs": {
            "unitManufacturingCost": 7,
            "shipmentUnitCost": 8,
            "monthlyAdvertismentCost": 9,
            "manufacturingCountry": "Albania"
        }
    }];



