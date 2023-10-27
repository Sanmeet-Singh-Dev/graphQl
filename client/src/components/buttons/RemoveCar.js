import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../graphql/queries";
import { DeleteOutlined } from '@ant-design/icons'
import { filter } from 'lodash'


const RemoveCar = ({ id }) => {
    const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, { data: { removeCar } }) {
            const { getCars } = cache.readQuery({ query: GET_CARS })

            cache.writeQuery({
                query: GET_CARS,
                data: {
                    getCars: filter(getCars, c => {
                        return c.id !== removeCar.id
                    })
                }
            })
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm('Are you sure?')

        if (result) {
            removeCar({
                variables: {
                    id
                }
            })
        }
    }
    return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{color: 'red'}} />


}
export default RemoveCar