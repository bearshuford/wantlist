
exports.handler = async (event) => {
  // We can retrive type of http method in event parameter
  const { httpMethod } = event;
  
  if (httpMethod === 'GET') {
   
    return { statusCode: 200, body: 'lmbda!' };
  }
  
  return { statusCode: 404 };
}