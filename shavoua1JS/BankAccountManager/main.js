import {
    createAccount, showCustomers, showStatistics, deposit,
    withdraw, closeAccount, searchCustomer, clientServices
} from "./account.js";
import input from "analiza-sync";



const menu = () => `=====================MENU==============================
        Welcome to your bank account manager :
        Please choose your choice 
        1: Create a new count 
        2: Show all account 
        3: Show all statistics 
        4: Depose some money 
        5: Whithdraw money 
        6: Close account
        7: Search account 
        8: exit
    `

const main = () => {
    while (true) {
        console.log(menu())
        const choice = input("Please enter your choice : ")
        if (choice == 1) {
            const fullname = input(`Enter the specifique data : fullname: str , `)
            const accountType = input(`accountType : ["regular", "premium", "student"] : `)
            const balance = +input(`and balance: int `)
            const user = createAccount(fullname, accountType, balance)
            if (user !== "TypeAccount must be in this list [regular, premium, student]"
                && user !== "Balance must be a positive integrer" && user !== "Name cant be empty") {
                clientServices.addClient(user)
            }
            console.log(user)
        }
        else if (choice == 2) {
            console.log(showCustomers())
        }
        else if (choice == 3) {
            console.log(showStatistics())
        }
        else if (choice == 4) {
            const clientId = +input("Enter a id : int :")
            const amount = +input("and amount : int  to depose money : ")
            const success = deposit(clientId, amount)
            console.log(success)
        }
        else if (choice == 5) {
            const clientId = +input("Enter a id : int :")
            const amount = +input("and amount : int  to retire money : ")
            const success = withdraw(clientId, amount)
            console.log(success)
        }
        else if (choice == 6) {
            const clientId = +input("Enter the id to close their count :")
            const success = closeAccount(clientId)
            console.log(success)
        }
        else if (choice == 7) {
            const id = +input("Enter a id  :")
            const name = input("or name : not obligatory : ")
            const result = searchCustomer(id, name)
            console.log(result)
        }
        else if (choice == 8) {
            break
        }
        else {
            console.log("this option is not valid")
        }

    }
}

main()