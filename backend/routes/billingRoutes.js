const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const { addBillForCart, addBillForOne, editBill, getBills,getBillById, deleteBill } = require('../controllers/billingController')

const router = express.Router()

router.post('/billforcart/:userId', requireAuth('User'), addBillForCart)

router.post('/billforone/:userId/:productId', requireAuth('User'), addBillForOne)

router.put('/editbill/:billId', editBill)

router.get('/getbills',getBills)

router.get('/getbillbyid/:id',getBillById)

router.delete('/deletebill/:billId', requireAuth('User'), deleteBill)

module.exports = router