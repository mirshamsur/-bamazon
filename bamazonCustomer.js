var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'shamsurmir',
    password: ' ',
    database: 'bamazon'
});


function bamazon()
{
    
    connection.query('SELECT * FROM Products', function(err, res) {

    
        console.log('ID Product Name\tDepartment Name\tPrice\tStock');
        for(var i = 0; i < res.length; i++){
            
                    var item = res[i];
            console.log('#'+item.itemID + '   ' + item.productName + '\t' + item.departmentName + '\t' + item.Price + '\t' + item.stockQuantity);
        }

        
        inquirer.prompt([
        {
            name: 'id',
            message: 'Enter ID of product they would like to buy:'
        },
        {
            name : 'quantity',
            message: 'Enter units of the product they would like to buy:'
        }]).then(function(answer)
        {
            
            purchaseItem(answer.id, answer.quantity, res);
        });
    });
}


function purchaseItem(id, quantity, res)
{
     
    var item = res[id-1];
    

    if(item.stockQuantity == 0 || (item.stockQuantity - quantity < 0))
        connection.end(function(err){console.log('Insufficient quantity!')});
    else
    {
        
        connection.query('UPDATE Products SET ? WHERE ?',
        [
            {
                stockQuantity: (item.stockQuantity - quantity)
            },
            {
                ItemID: id
            }
        ],
        function(err, res2)
        {
            
            connection.end(function(err){
                console.log('Purchase Total: $' + (quantity * item.Price));
            });
        });
    }
}

bamazon();

