export const sendFormData = async (formData) => {
    try {
      const response = await fetch('https://twe0vlzezc.execute-api.us-east-1.amazonaws.com/dev/dynamoDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error('Erro ao enviar os dados para o DynamoDB.');
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      throw error;
    }
  };
  