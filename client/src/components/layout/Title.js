const Title = () => {
    const styles = getStyles()

  return <h1 style={styles.title}>People and their cars</h1>
}

const getStyles = () => ({
    title: {
        fontSize: 15,
        padding: '15px',
        marginBottom: 50
    }
})

export default Title