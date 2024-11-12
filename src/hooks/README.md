## To use custom API
### Step 1
```js
   //import the useApi.js
   const {request ,loading ,error} = useApi(); 
```
### Step 2
```js

const apiCall = async () => {
  const responseJSON = await request({
    method: 'POST', //USE GET POST DELETE PUT PATCH
    url: '/your-endpoint', // Endpoint
    headers: {
      Authorization: 'Bearer your_token', // Optional: include if required
    },
    data: {
      //json Payload /Body 
      key1: 'value1', // Replace with your data
      key2: 'value2',
    },
    params:{
      key3:"value3"
    }
  });
  if (responseJSON) {
    console.log('Response:', response);
  }
};

```