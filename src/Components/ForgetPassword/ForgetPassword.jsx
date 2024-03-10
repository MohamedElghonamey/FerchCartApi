import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';


export default function ForgetPassword() {
 
    let navigate = useNavigate()


    let validationSchema = Yup.object({
        email: Yup.string().required('This email is required').email('enter availd email'),
    })
  
    async function sendCode(values) {
        console.log(values);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
        console.log(data)
        if (data.statusMsg === 'success') {
            document.querySelector('.forgetpassword').classList.add('d-none')
            document.querySelector('.verfiyCode').classList.remove('d-none')
        }
    }
  
    let formik = useFormik({
        initialValues: {
            email: '',
        }
        ,
        validationSchema: validationSchema,
        onSubmit: sendCode
    })




    let validationSchema2 = Yup.object({
        resetCode: Yup.string().required('This verifycode is required')
    })
    
    async function sendData(values) {
        console.log(values);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
        console.log(data)
        if (data.status === 'Success') {
            navigate('/resetpassword')
        }
    }
    
    let verifyFormik = useFormik({
        initialValues: {
            resetCode: '',
        }
        ,
        validationSchema: validationSchema2,
        onSubmit: sendData
    })







    return (
        <>
        <div className='forgetpassword container  mt-5 pt-3'>
            <h1 className='text-main text-center my-5'>forget password</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="row  gy-4 my-5">
                    <div className="col-md-8 m-auto bg-light shadow p-4">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor='userEmail' className='mb-2 text-main'>please enter your verification code</label>
                                <input type='email' id='userEmail' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className='form-control' placeholder='email'></input></div>
                            <div className="col-md-12 text-center m-3"><button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>verify

                            </button></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div className='verfiyCode d-none container mt-5 pt-5'>
            <h1 className='text-main text-center my-5'>verify code</h1>
            <form onSubmit={verifyFormik.handleSubmit}>
                <div className="row  gy-4 my-5">
                    <div className="col-md-8 m-auto bg-light shadow p-4">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor='resetCode' className='mb-3 text-main'>resetCode</label>
                                <input type='text' id='resetCode' name='resetCode' onChange={verifyFormik.handleChange} value={verifyFormik.values.resetCode} onBlur={verifyFormik.handleBlur} className='form-control' placeholder='resetCode'></input></div>
                            {verifyFormik.errors.resetCode && verifyFormik.touched.resetCode ? <p className='text-danger'>{verifyFormik.errors.resetCode}</p> : ''}
                            <div className="col-md-12 text-center m-3"><button disabled={!(verifyFormik.isValid && verifyFormik.dirty)} type='submit' className='btn bg-main text-light'>sendCode
                            </button></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>





    </>
    )
}