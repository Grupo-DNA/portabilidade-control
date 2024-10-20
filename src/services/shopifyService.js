export const fetchOrderDetails = async (idCompra) => {
  console.log('id compra shopify service front',idCompra)
  try {
    const response = await fetch(`https://9smyqqiekf.execute-api.us-east-1.amazonaws.com/dev/shopify-info?idCompra=${idCompra}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar o pedido na API');
    }
    const orderData = await response.json();
    console.log(orderData)
    return orderData;
  } catch (error) {
    console.error('Erro ao buscar o pedido:', error);
    throw error;
  }
};  