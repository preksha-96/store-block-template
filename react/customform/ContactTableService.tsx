import React, { useEffect, useState } from 'react';
import { Button, ModalDialog, Input } from 'vtex.styleguide'


const ContactTableService = () => {
  const [contactData, setContactData] = useState([])
  const [error, setErr] = useState('')
  const [show, setShow] = useState({ isModalOpen: false })

  const [condata, setCondata] = useState({
    firstname: "",
    lastname: "",
    subject: "",
    message: "",
    email: "",
    age: "",
    id: ""
  })
  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const res = await fetch('/contact')
    if (res.ok) {
      const response = await res.json()
      setContactData(response)
    } else {
      setErr('Failed to recieve contact details due to some error')
    }
  }

  const onEdit = async (item: any) => {
    handleModalToggle(item)
  }

  const onDelete = async (id: number) => {
    const res = await fetch(`/contact/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    })
    if (res.ok) {
      fetchUserData()
    }
  }
  const handleModalToggle = (item: any) => {
    setShow({ isModalOpen: !show.isModalOpen })
    setCondata(prevState => ({
      ...prevState,
      ...item
    })
    )
  }
  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setCondata((prevProps) => ({
      ...prevProps, [name]: value
    }))
  };
  const onSubmit = async () => {
    const res = await fetch(`/contact/${condata.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      }, body: JSON.stringify({
        ...condata
      })
    })
    if (res.ok) {
      fetchUserData()
      setShow({ isModalOpen: !show.isModalOpen })
    }
  }

 

  return (
    <div>
      <table className='w-100' >
        <thead className='bg-rebel-pink c-danger--faded pa4 text-white'>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Message </th>
            <th>Age</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contactData.length ? contactData.map((item: any, index: any) => (
            <tr key={index} className='bg-black-60 c-on-base--inverted text-white'>
              <td className='tc w-10'>{index}</td>
              <td className='tc'>{item.firstname}</td>
              <td className='tc'>{item.lastname}</td>
              <td className='tc'>{item.message}</td>
              <td className='tc'>{item.age}</td>
              <td className='tc'>{item.subject}</td>
              <td className='tc flex justify-center'>
                <Button onClick={() => onEdit(item)}>
                  Edit
                </Button>
                <Button className="mr3" variation="danger" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>)) : <>{error}</>}
        </tbody>
      </table>

      <ModalDialog
        centered
        confirmation={{
          onClick: onSubmit,
          label: 'Submit',
        }}
        cancelation={{
          onClick: handleModalToggle,
          label: 'Cancel',
        }}
        isOpen={show.isModalOpen}
        onClose={handleModalToggle}>
        <div className="flex  flex-row-ns">

          <div className="w-100  mv4 ">
            <h6 className='ma0'>
              Edit Contact Form
            </h6>
            <div className='flex justify-between'>
              <div className="w-40 mv2">
                <Input placeholder="Name" value={condata.firstname}
                  onChange={handleInputChange} name="firstname" size="large" />
              </div>
              <div className="w-40  mv2">
                <Input placeholder="Last name" name="lastname" size="large" value={condata.lastname}
                  onChange={handleInputChange} />
              </div>
            </div>
            <div className='flex justify-between'>
              <div className="w-40 mv2">
                <Input placeholder="Message" name="message" size="large" value={condata.message}
                  onChange={handleInputChange} />
              </div>
              <div className="w-40  mv2">
                <Input placeholder="Email" name="email" size="large" value={condata.email}
                  onChange={handleInputChange} />
              </div>
            </div>
            <div className='flex justify-between'>
              <div className="w-40 mv2">
                <Input placeholder="Subject" nanme="subject" size="large" value={condata.subject}
                  onChange={handleInputChange} />
              </div>
              <div className="w-40  mv2">
                <Input placeholder="Age" name="age" size="large" value={condata.age}
                  onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>
      </ModalDialog>
     


    </div>
  );
}






export default ContactTableService;
