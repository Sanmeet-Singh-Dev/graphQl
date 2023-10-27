import { useQuery } from '@apollo/client'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdatePerson from '../forms/UpdatePerson'
import { GET_CARS } from '../../graphql/queries'
import { List } from 'antd'
import CarCard from '../listItems/CarCard'
import { Link, useLocation } from 'react-router-dom'

const PersonCard = ( props ) => {
  const location = useLocation();
  const [editMode, setEditMode] = useState(false)
  const { id, firstName, lastName } = props
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_CARS)
  console.log("data",data);
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const personCar = data.getCars.filter(car=> car.personId === id);

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }
  
  const isHomePage = location.pathname === '/';

  let renderLearnMoreLink = isHomePage;

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePerson id={id} />
          ]}
        >
          {firstName} {lastName}
          <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {personCar.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
          <CarCard id={id} year={year} make={make} model={model} price={price} personId={personId} />
        </List.Item>
      ))}
    </List>

    {/* <Link to={`people/${id}`}>Learn More</Link> */}
    {renderLearnMoreLink && <Link to={`people/${id}`}>Learn More</Link>}
          
        </Card>
      )}
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '100%'
  }
})

export default PersonCard
