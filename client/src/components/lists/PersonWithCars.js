import { useQuery } from '@apollo/client'
import { PEOPLE_WITH_CARS } from '../../graphql/queries'
import { List } from 'antd'
import PersonCard from '../listItems/PersonCard'
import { Link, useParams } from 'react-router-dom'


const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const PersonWithCars = () => {
  const { personId } = useParams()

  const styles = getStyles()
  const { loading, error, data } = useQuery(PEOPLE_WITH_CARS,{
    variables: { personId }
  })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  console.log(data.getPeopleWithCars.person)

  return (
    <div>
    <Link to={"/"}>Go Back</Link>
    <h3>More Details</h3>
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      
        <List.Item key={data.getPeopleWithCars.person.id}>
          <PersonCard id={data.getPeopleWithCars.person.id} firstName={data.getPeopleWithCars.person.firstName} lastName={data.getPeopleWithCars.person.lastName} />
        </List.Item>
      
    </List>
    </div>
  )
}

export default PersonWithCars
