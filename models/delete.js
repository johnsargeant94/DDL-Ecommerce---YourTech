await fetch(localhost:3000/admin/deleteProduct/, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id}) // body data type must match "Content-Type" header
  });
  
  
  // ------server------
  
  router.delete('/admin/deleteProduct/', (req, res) => {
      const {id} = req.body
      
deleteOne({})

      })
      
     //-----------button ---------- 
       <td><button type="button" class="btn btn-indigo btn-sm m-0">onclick="deleteProduct(event)" data-id = "{{this._id}}">Delete</button></td>