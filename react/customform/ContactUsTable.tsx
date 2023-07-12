import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import documents from '../graphql/getContactForm.graphql'

const ContactUsTable = () => {
    const { data } = useQuery(documents, {
        variables: {
            acronym: 'PC',
            fields: [
                'firstname',
                'lastname',
                'subject',
                'age',
            ],
            schema: 'prekshaschema',
            page: 1,
            pageSize: 10
        },
        ssr: false,
    })
    console.log(data)
    const [contactData, setContactData] = useState<any>()
    useEffect(() => {
        if (data) {
            setContactData(data)
        }
    }, [data])
        return (
            <table className='w-100' >
              <thead className='bg-rebel-pink c-danger--faded pa4 text-white'>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Subject </th>

                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {contactData.documents.map((item:any, index:any) => (
                  <tr key={index} className='bg-black-60 c-on-base--inverted text-white'>
                    <td className='tc'>{index}</td>
                    <td className='tc'>{item.fields.find((field :any) => field.key === "firstname").value}</td>
                    <td className='tc'>{item.fields.find((field :any)=> field.key === "lastname").value}</td>
                    <td className='tc'>{item.fields.find((field :any)=> field.key === "subject").value}</td>
                    <td className='tc'>{item.fields.find((field :any)=> field.key === "age").value}</td>
                  </tr>
                ))}
                <button className='btn btn-primary'>See more</button>
              </tbody>
            </table>
          );
    }






export default ContactUsTable;
