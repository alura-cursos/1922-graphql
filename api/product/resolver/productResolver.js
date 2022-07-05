
const listProducts = {produtos:[]}

const productResolvers = {
  Query: {
    products: () => listProducts.produtos
  }
}


module.exports = productResolvers
