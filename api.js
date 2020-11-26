// log out
$('#logOut').on('click',(e)=>{
    e.preventDefault();
    // Sign-out successful.
    window.localStorage.removeItem('user');
    window.location="index.html";
    
})

// AJAX
const getList=async ()=>{
    try{
        const res=await axios.get('https://jsonplaceholder.typicode.com/todos');
        const lists=res.data;
        console.log(lists);
        let listcontent='';
        lists.forEach((el,index)=>{
            listcontent+=`<li class="list-group-item  ${index%2?'list-group-item-info':'list-group-item-success'}"> <input type="checkbox" class="checkbox" ' checked':''}/> <label for=""> ${el.title}</label></li>`
        });
        $('#todoList').html(listcontent);
        if(checkedCount){
            checkedCount=0;
        }

    }
    catch(e){
        console.log('failed to fetch lists data',e);
    }
}
// GET LIST 
$('#getList').on('click',(e)=>{
    e.preventDefault();
    getList();
});

//cndtn
let checkedCount=0;

const alertPromise= ()=>{
     return new Promise((resolve)=>{

         
        if(checkedCount===5){
            resolve(checkedCount)
        }
      });
}

const promiseCall=()=>{
    alertPromise().then((data)=>{
        alert(`Congrats!!! ${data} activities completed!!!`);
    })
    .catch((err)=>{
        console.log('promise rejected');
    })
}


getList();

$('#todoList').on('change','.checkbox',function(e){
    if($(this).prop('checked')===true){
        console.log('checked');
        checkedCount++; 
        $(this).parent().addClass('active');
    }
    else{
        checkedCount--;
        console.log('unchecked');
        $(this).parent().removeClass('active');
    }
    
    promiseCall();


});
