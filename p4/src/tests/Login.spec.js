import { mount, createLocalVue } from '@vue/test-utils';
import VeeValidate from 'vee-validate'
import Login from '../admin/Login/Login'; // name of your Vue component

const localVue = createLocalVue();
localVue.use(VeeValidate);

describe('Login', () => {
    let wrapper = mount(Login, {
        localVue
    });

    it('check email, password are required fields with invalid data', async () => {
        wrapper.setData({
            loginModel: {
                sEmail: undefined,
                sPassword: undefined
            }
        });
        await wrapper.vm.$validator.validate();
        expect(wrapper.vm.$validator.errors.any()).toBe(true);
    })
    
    it('check valid email address with invalid email', async () => {
        wrapper.setData({
            loginModel: {
                sEmail: 'any',
                sPassword: undefined
            }
        });
        await wrapper.vm.$validator.validate();

        expect(wrapper.vm.$validator.errors.has('Email')).toBe(true);
    });

    it('check password is required with invalid password', async () => {
        wrapper.setData({
            loginModel: {
                sEmail: 'example@gmail.com',
                sPassword: undefined
            }
        });
        await wrapper.vm.$validator.validate();

        expect(wrapper.vm.$validator.errors.has('Password')).toBe(true);
    });
});