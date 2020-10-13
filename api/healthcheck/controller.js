const model = require('../model/healthcheck')

const healthCheck = async (req, res) => {
  try {
    const healthCheck = await model.healthCheck()
    res.status(200).send(healthCheck)
  } catch (error) {
    const message = 'Error requesting health check!'
    res.status(500).send({ message })
  }
}

module.exports = {
  healthCheck,
}
