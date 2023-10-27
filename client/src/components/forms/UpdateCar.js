import { useMutation } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../graphql/queries'

const { Option } = Select;

const UpdateCar = props => {
  const { id, year, make, model, price, personId } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const [updateCar] = useMutation(UPDATE_CAR)

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const onFinish = values => {
    const { make, model } = values

    const personId = values.person
    const year = parseInt(values.year)
    const price = parseFloat(values.price)

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      }
    })
    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year,
        make,
        model,
        price,
        personId
      }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please enter a year' }]}
      >
        <Input placeholder='Year' />
      </Form.Item>
      <Form.Item name='make' rules={[{ required: true, message: 'Please enter a make' }]}>
        <Input placeholder='Make' />
      </Form.Item>
      <Form.Item name='model' rules={[{ required: true, message: 'Please enter a Model' }]}>
        <Input placeholder='Model' />
      </Form.Item>
      <Form.Item name='price' rules={[{ required: true, message: 'Please enter a Price' }]}>
        <Input placeholder='Price' addonBefore="$"/>
      </Form.Item>
      <Form.Item name='person' rules={[{ required: true, message: 'Please enter a Person' }]}>
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
              (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price') && !form.isFieldTouched('person')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
