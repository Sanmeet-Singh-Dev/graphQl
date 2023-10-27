import { Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdateCar from '../forms/UpdateCar'

const CarCard = props => {
  const [editMode, setEditMode] = useState(false)
  const { id, year, make, model, price, personId } = props
  const styles = getStyles()

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} />
          ]}
        >
          {year} {make} {model} {`-> $`} {price.toLocaleString()}
        </Card>
      )}
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '700px'
  }
})

export default CarCard
