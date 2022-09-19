const {persistStore} = require('../services/store')

const persist = async (req, res) => {
  const file = req.file

  const {slug} = req.params

  try {
    const store = await persistStore(file, slug)

    return res.status(201).json({store})
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

module.exports = {persist}