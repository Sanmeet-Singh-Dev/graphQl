import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../graphql/queries'
import { List } from 'antd'
import PersonCard from '../listItems/PersonCard'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const People = () => {
  const styles = getStyles()
  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
console.log("data",data)
  return (
    <div>
    <h3>Records</h3>
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.getPeoples.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <PersonCard id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
    </div>
  )
}

export default People
