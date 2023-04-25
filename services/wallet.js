const database                  = new Map()
const transactionLog            = new Map()
const transactionIdForWalletIds = new Map()
const wallet = "wallet"
let accountId = 1

function createAccount(name, balance) {
    console.log('00000', name, balance)
    const id = wallet+accountId
    const account = {
        walletId: id,
        name,
        balance: Number(balance),
        createdDate: new Date()
    };
    database.set(id, account)
    accountId++
    console.log('Database: ', database)
    return account
}

function getAccount(walletId) {
    const details = database.get(walletId)
    return details
}

function depositTransaction(walletId, amount, description){
    try{
        console.log(' 11 ', walletId, amount, description, database)
        if(database.has(walletId)){
            let customerDetail = database.get(walletId)
            customerDetail.balance += amount
            database.set(walletId, customerDetail)
            console.log('database =======> ', database)
            
            const transactionId = transactionIdForWalletIds.get(walletId) ?? 1

            const transactionDetails = {
                transactionId: "txn-"+walletId+"-"+transactionId,
                walletId,
                amount,
                balance: customerDetail.balance,
                description: description,
                createdDate: new Date()
            }

            console.log(' transactionDetails:  ', transactionDetails)
            
            // Incrementing the transactionId based upon the customer (i.e., walletId)
            transactionIdForWalletIds.set(walletId, transactionId+1)
            
            // Adding this transaction to the log
            const previousTransactionDetails = transactionLog.get(walletId) ?? []
            console.log( 'previousTransactionDetails', previousTransactionDetails )
            previousTransactionDetails.push(transactionDetails)

            transactionLog.set(walletId, previousTransactionDetails)

            console.log('transactionIdForWalletIds: ', transactionIdForWalletIds)
            console.log('transactionLog ', transactionLog)
            console.log('database ', database)
            return transactionDetails
        }
        return null
    } catch(error){
        console.log(' Error in deposit ', error)
        throw error
    }
}

function fetchTransactionsForWallet(walletId){
    console.log('----- transactionLog ', transactionLog)
    return transactionLog.get(walletId)
}

module.exports = { 
    createAccount, 
    getAccount,
    depositTransaction,
    fetchTransactionsForWallet
}