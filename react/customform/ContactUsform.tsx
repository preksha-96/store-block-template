import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-apollo';
import createDocument from '../graphql/postContact.graphql';

import uploadFile from '../graphql/uploadFile.graphql';
import ReCAPTCHA from "react-google-recaptcha";
// import Swal from 'sweetalert2'



const ContactUsform = () => {
    const [uploadfile] = useState('')
    const captchaRef = useRef(null)
    const [token, setToken] = useState('')
    const [sitek, setSitekey] = useState('')
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        subject: "",
        uploadfile: "",
        email: "",
        message: "",
        age: ""
    });
    const [save] = useMutation(createDocument)
    const [uploadfle] = useMutation(uploadFile)
    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        setState((prevProps) => ({
            ...prevProps, [name]: value
        }))
    };
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target as any;
        const { data } = await uploadfle({
            variables: { file: files[0] },
        })
        setState(
            {
                ...state, uploadfile: data.uploadFile.fileUrl
            }
        )
    }

    const handleSubmit = async (event: any) => {
        console.log(state)
        event.preventDefault();
        const object: any = {
            fields: Object.keys(state).map((key: string) => ({ key, value: state[key as keyof typeof state] }))
        }
        try {
            const data = save({
                variables: {
                    document: object,
                    schema: 'preksha',
                    dataEntity: "preksha",
                    account: "trika",
                    acronym: "PC"
                }
            })
            if (data !== undefined) {
                // Swal.fire({
                //     title: 'Success',
                //     showClass: {
                //         popup: 'animate__animated animate__fadeInDown'
                //     },
                //     hideClass: {
                //         popup: 'animate__animated animate__fadeOutUp'
                //     }
                // })
                setState({
                    firstname: "",
                    lastname: "",
                    subject: "",
                    uploadfile: "",
                    email: "",
                    message: "",
                    age: ""
                })
            }
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    };
    const handleRecaptchaChange = (value: any) => {
        if (value) {
            console.log(value)

            setToken(value)
        }
    };

    useEffect(() => {
        fetchCaptcha()
    }, [])

    const fetchCaptcha = async () => {
        const res = await fetch('/captcha')
        if (res.ok) {
            const response = await res.json()
            if(response.sitekey.length){
                setSitekey(response.sitekey)
            }
            
        }
    }


    return (
        <article className="pa4 black-80">
            <form action="sign-up_submit" className='flex justify-center' onSubmit={handleSubmit}>
                <fieldset id="sign_up" className="ba-m ma5 mh0 pa4 ph0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="firstname">First Name</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="firstname" id="firstname"
                            value={state.firstname}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="lastname" >Last Name</label>
                        <input className="b pa2 input-reset ba bg-transparent"
                            value={state.lastname}
                            onChange={handleInputChange}
                            type="text" name="lastname" id="lastname" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="age">Age</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="text" name="age" id="age"
                            value={state.age}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email">Email</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="text" name="email" id="email"
                            value={state.email}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="subject">Subject</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="text" name="subject" id="subject" value={state.subject}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="message">Message</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="text" name="message" id="message" value={state.message}
                            onChange={handleInputChange} />
                    </div>

                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="uploadfile">Upload file</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="file" name="uploadfile" id="uploadfile" value={uploadfile}
                            onChange={(e) => { handleFileChange(e) }} />
                    </div>
                    <div className="mt3">
                        {/* Google reCAPTCHA */}
                        {sitek && <ReCAPTCHA onChange={(e) => { handleRecaptchaChange(e) }}
                            sitekey={sitek} // Replace with your reCAPTCHA site key
                            ref={captchaRef}
                        />}
                    </div>
                    <div className="mt3"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="submit" disabled={!token && !token.length} /></div>

                </fieldset>
            </form>
        </article>
    )

};



export default ContactUsform;
