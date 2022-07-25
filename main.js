
var form = document.getElementById('my-form');
form.addEventListener('submit',additem);
var i = 0;


function showNewExpenseOnScreen(Expense){
    const parentNode = document.getElementById("lStrorage");
    const childNode = `<li id=${Expense._id}> Expense Amount : ${Expense.amnt} - Description : ${Expense.description} - Category : ${Expense.category}
                                  <button onclick=deleteExpense('${Expense._id}')> Delete</button>
                                  <button onclick=editExpense('${Expense._id}','${Expense.amnt}','${Expense.description}','${Expense.category}')> Edit </button>
                                </li>`;
    parentNode.innerHTML = parentNode.innerHTML+childNode;         
}

function removeExpenseFromScreen(em){
    const parentNode = document.getElementById('lStrorage');
    const childnode = document.getElementById(em);
    if(childnode){
        parentNode.removeChild(childnode);
    }

}

window.addEventListener('DOMContentLoaded', (event) => {
    axios.get("https://crudcrud.com/api/300801b62a1e40239cd4ca039295919f/Expenses")
            .then((response)=>{
                let d = document.getElementById("lStrorage");
            for (var i = 0; i < response.data.length; i++) { 
                showNewExpenseOnScreen(response.data[i]);
            }
            console.log(response);
            })
            .catch((err)=>{
                console.log(err)
            })
            
});

       

function additem(e){
    e.preventDefault();
    var eAmnt = document.getElementById('eAmnt').value;
    var des = document.getElementById('des').value;
    var cat = document.getElementById('cat').value;
      let myObj = {
              amnt : eAmnt,
              description : des,
              category : cat
      };
      axios.post("https://crudcrud.com/api/300801b62a1e40239cd4ca039295919f/Expenses",myObj)
      .then((response)=>{
        showNewExpenseOnScreen(response.data)
        console.log(response)
      })
      .catch((err)=>{
          document.body.innerHTML=document.body.innerHTML+'Something went wrong.'
          console.log(err)
      })
    
      document.getElementById("des").disabled = false;
      document.getElementById('des').value = "";
      document.getElementById('cat').value = "";
      document.getElementById('eAmnt').value = "";

}
        
function deleteExpense(id){
    axios.delete(`https://crudcrud.com/api/300801b62a1e40239cd4ca039295919f/Expenses/${id}`)
    removeExpenseFromScreen(id);
}

function editExpense(id,eAmnt,description,cat){
    document.getElementById('eAmnt').value = eAmnt;
    document.getElementById('des').value = description;
    document.getElementById("des").disabled = true;
    document.getElementById('cat').value=cat;
    deleteExpense(id);
}


        