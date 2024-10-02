export const fetchOrderDetails = async (idCompra) => {
  try {
    const response = await fetch(`https://1marrj7oz6.execute-api.us-east-1.amazonaws.com/prod/purchase-info?idCompra=${idCompra}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar o pedido na API');
    }

    const orderData = await response.json();
    return orderData;
  } catch (error) {
    console.error('Erro ao buscar o pedido:', error);
    throw error;
  }
};
