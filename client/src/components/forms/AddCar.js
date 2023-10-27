import { useMutation } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../graphql/queries'

const { Option } = Select;
const AddCar = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [addCar] = useMutation(ADD_CAR)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const people = data.getPeoples;

  const onFinish = values => {

    const { make, model } = values

    const personId = values.person
    const year = parseInt(values.year)
    const price = parseFloat(values.price)
    console.log('Adding a new car with the following values:');
    console.log('Year:', year);
    console.log('Make:', make);
    console.log('Model:', model);
    console.log('Price:', price);
    console.log('Person ID:', personId);

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price, 
        personId
      },

      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS })
        console.log('Current data from cache:', data);
       
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            getCars: [...data.getCars, addCar]
          }
          
        })
        console.log('Cache has been updated with the new car:', addCar)
      }
    })
    
  }

  return (
    <div>
    { people.length>0 ? (
        <div>
        <h3>Add Car</h3>
    <Form
      name='add-car-form'
      layout='inline'
      size='large'
      style={{ marginBottom: '40px' , maxWidth: 600 }}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
      label="Year: "
        name='year'
        rules={[{ required: true, message: 'Please enter a year' }]}
      >
        <Input placeholder='Year' />
      </Form.Item>
      <Form.Item label="Make: " name='make' rules={[{ required: true, message: 'Please enter a make' }]}>
        <Input placeholder='Make' />
      </Form.Item>
      <Form.Item label="Model: " name='model' rules={[{ required: true, message: 'Please enter a model' }]}>
        <Input placeholder='Model' />
      </Form.Item>
      <Form.Item label="Price: " name='price' rules={[{ required: true, message: 'Please enter a price' }]}>
        <Input placeholder='Price' addonBefore="$"/>
      </Form.Item>
      <Form.Item label="Person: " name='person' rules={[{ required: true, message: 'Please enter a Person' }]}>
      <Select
          placeholder="Select a person"
        >
        {data.getPeoples.map(person => (
            <Option key={person.id} value={person.id}>
              {`${person.firstName} ${person.lastName}`}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
    </div>
     )  :  null
    }
    </div>
  )
}

export default AddCar
