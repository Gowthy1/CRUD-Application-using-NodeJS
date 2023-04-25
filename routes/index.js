const express = require("express");
const router = express.Router();
const walletController = require('./../controller/createWallet');

router.get("/test", function (req,res) {
    res.send('donnneee')
})

router.post('/wallet',                          walletController.createNewWallet);
router.get('/wallet/:walletId',                 walletController.fetchWalletById);
router.post('/wallet/:walletId/transaction',    walletController.createTransaction);
router.get('/wallet/:walletId/transaction',     walletController.fetchTransactionsForWallet);


module.exports = router;
