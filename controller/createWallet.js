const walletService         = require('./../services/wallet')
const nameMissing           = "Invalid input : Name is missing"
const balanceMissing        = "Invalid input : Balance is missing"

const createNewWallet = (req, res) => {
    try {
        if(req?.body && req.body?.name && req.body?.balance){
            const { name, balance } = req.body
            const response = walletService.createAccount(name, balance);
            res.status(200).send(response);
        } else {
            const errorResponse = []
            if(req.body === undefined){
                errorResponse.push([nameMissing, balanceMissing])
            } else {
                if(req.body.name === undefined){
                    errorResponse.push([nameMissing])
                }
                if(req.body.balance === undefined){
                    errorResponse.push([balanceMissing])
                }
            }
            res.status(400).send(errorResponse);
        }
    } catch (error) {
        console.log('Error while creating wallet', error);
    }
}

const fetchWalletById = (req, res) => {
    try {
        if(req.params.walletId){
            const walletId = req.params.walletId
            const response = walletService.getAccount(walletId);
            if(response === undefined){
                const message = "Wallet not found"
                res.status(400).send({message});
            }
            res.status(200).send(response);
        } else {
            const errorResponse = []
            if(req.body.walletId === undefined){
                errorResponse.push([walletId])
            }
            res.status(400).send(errorResponse);
        }
    } catch (error) {
        console.log('ddddd', error);
    }
}

function createTransaction(req, res) {
    console.log(' Inside createTransaction ', req.params)
    try{
        if(req?.params?.walletId && req?.body?.amount && req?.body?.description){
            const walletId      = req.params.walletId
            const amount        = Number(req.body.amount)
            const description   = req.body.description
            if(amount>=0){
                const response = walletService.depositTransaction(walletId, amount, description)
                console.log(' deposit response: ', response)
                if(!response){
                    const message= "Invalid request body supplied"
                    res.status(400).send({message})
                    return
                }
                res.status(200).send(response)
            }
        }
    } catch(error) {
        console.log('createTransaction failed', error)
        res.status(400).send({message:error})
    }
}

function fetchTransactionsForWallet(req, res) {
    try {
        if(req.params.walletId){
            const walletId = req.params.walletId
            const response = walletService.fetchTransactionsForWallet(walletId);
            if(response === undefined){
                const message = "Wallet not found"
                res.status(400).send({message});
            }
            res.status(200).send(response);
        } else {
            const errorResponse = []
            if(req.body.walletId === undefined){
                errorResponse.push([walletId])
            }
            res.status(400).send(errorResponse);
        }
    } catch (error) {
        console.log('ddddd', error);
    }
}

module.exports = {
    createNewWallet, 
    fetchWalletById, 
    createTransaction,
    fetchTransactionsForWallet
}