var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'shamsurmir',
    password: '',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    appStart();
});

console.log('------------------------------------------------');
console.log('Welcome to bamazon');
console.log('------------------------------------------------\n');


var appStart = function() {
    inquirer.prompt([{
        name: "Menu",
        type: "rawlist",
        message: "What would you would like to do?",
        choices:['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }]).then(function(answer) {

            
            switch(answer.Menu) {
                case 'View Products for Sale': 
                    productsForSale();
                    break;
                case 'View Low Inventory':
                    lowInventory();
                    break;
                case 'Add to Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    newProduct();
                    break;
            } 

        }); 
}  
    
    function appContinue() {
    inquirer.prompt({
                name: "continue",
                type: "confirm",
                message: "Back to the main menu?",
            }).then(function(answer) {
                if (answer.continue == true) {
                    appStart();
                } else {
                    console.log("Ending");
                    connection.end();
                }
            }); 
    };
    
    function productsForSale() {
    connection.query('SELECT * FROM Products', function(err, res) {
        console.log('---------------------------------');
        console.log('bamazon Current Inventory');
        console.log('---------------------------------\n');
        
            var table = new Table({
                head: ['itemID', 'productName', 'departmentName', 'Price', 'stockQuantity'],
                colWidths: [10, 40, 10, 10]
            });
        for (var i=0; i < res.length; i++) {
        var productArray = [res[i].itemID, res[i].productName, res[i].departmentName, res[i].Price, res[i].stockQuantity];
        table.push(productArray);    
        }
        console.log(table.toString());
        appStart();
        });
    }
    function lowInventory() {
    connection.query('SELECT * FROM Products', function(err, res) {
        console.log('---------------------------------');
        console.log('bamazon Low Inventory');
        console.log('---------------------------------\n');
            var table = new Table({
                head: ['itemID', 'ProductName', 'Price', 'Quantity'],
                colWidths: [10, 40, 10, 10]
            });
        for (var i=0; i < res.length; i++) {
            if (res[i].StockQuantity < 5) {
            var productArray = [res[i].itemID, res[i].productName, res[i].Price, res[i].stockQuantity];
            table.push(productArray);
            }
        }
        console.log(table.toString());
        appStart();
        });
    }
    
    function addInventory() {
        connection.query('SELECT * FROM Products', function(err, res) {
        
            var table = new Table({
                head: ['itemID', 'productName', 'Price', 'Quantity'],
                colWidths: [10, 40, 10, 10]
            });
        for (var i=0; i < res.length; i++) {
        var productArray = [res[i].itemID, res[i].productName, res[i].Price, res[i].stockQuantity];
        table.push(productArray);    
        }
        console.log('\n\n\n');
        console.log(table.toString());
        console.log('\n');
        });
            inquirer.prompt([{
                name:'itemID',
                type:'input',
                message: '\n\nEnter the ID of the Product you want to increase the inventory of'
            }, {
                name: 'qty',
                type:'input',
                message: 'Enter the quantity you want to add to inventory'
            }]).then(function(answer) {
                var addAmount = (parseInt(answer.qty));
                connection.query("SELECT * FROM Products WHERE ?", [{itemID: answer.itemID}], function(err, res) {
                            if(err) {
                                throw err;
                            } else {
                            var updateQty = (parseInt(res[0].stockQuantity) + addAmount);                      
                            }
                    connection.query('UPDATE products SET stockQuantity = ? WHERE ItemID = ?', [updateQty, answer.itemID], function(err, results) {
                            if(err) {
                                throw err;
                            } else {
                            console.log('New Inventory Added!\n');
                            appContinue();                      
                            }
                    });

                });
               
        });
    }
    
    function newProduct() {
        inquirer.prompt([{
            name: "product",
            type: "input",
            message: "Type the name of the Product you want to add to bamazon"
        }, {
            name: "department",
            type: "input",
            message: "Type the Department name of the Product you want to add to bamazon"
        }, {
            name: "price",
            type: "input",
            message: "Enter the price of the product without currency symbols"
        }, {
            name: "quantity",
            type: "input",
            message: "Enter the amount you want to add to the inventory"
        }]).then(function(answers) {
            var productName = answers.product;
            var departmentName = answers.department;
            var Price = answers.price;
            var stockQuantity = answers.quantity;
            connection.query('INSERT INTO Products (productName, departmentName, Price, stockQuantity) VALUES (?, ?, ?, ?)', [productName, departmentName, Price, stockQuantity], function(err, data) {
                if (err) {
                    throw err;
                } else {
                console.log('\n\nProduct: ' + productName + ' added successfully!\n\n');
                appContinue();
                }
            });
        });
    }   
