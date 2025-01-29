const Billing = require('../models/BillingModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');


const addBillForCart = async (req, res) => {
    const { userId } = req.params;
    const { productIds, firstName, lastName, country, address, city, state, pincode, phoneNumber, email, totalPrice, status } = req.body;

    if (!Array.isArray(productIds) || !productIds.length) {
        return res.status(400).json({ error: 'Product IDs must be a non-empty array' });
    }
    if (!firstName || !lastName || !country || !address || !city || !state || !pincode || !phoneNumber || !email || !status) {
        return res.status(400).json({ error: 'All billing details must be provided' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const bill = await Billing.create({
            userId,
            productIds,
            firstName,
            lastName,
            country,
            address,
            city,
            state,
            pincode,
            phoneNumber,
            email,
            totalPrice,
            status
        });

        res.status(201).json(bill);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addBillForOne = async (req, res) => {
    const { userId, productId } = req.params;
    const { firstName, lastName, country, address, city, state, pincode, phoneNumber, email, totalPrice, status, productIds } = req.body;

    if (!firstName || !lastName || !country || !address || !city || !state || !pincode || !phoneNumber || !email || !totalPrice || !status|| !productIds) {
        return res.status(400).json({ error: 'All billing details must be provided' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const bill = await Billing.create({
            userId,
            productIds: [productIds],
            firstName,
            lastName,
            country,
            address,
            city,
            state,
            pincode,
            phoneNumber,
            email,
            totalPrice,
            status
        });

        res.status(201).json(bill);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const editBill = async (req, res) => {
    const { billId } = req.params;
    const data = req.body;

    try {
        const bill = await Billing.findByIdAndUpdate(billId, data, { new: true });
        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        res.status(200).json(bill);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBills = async (req, res) => {
    try {
        const bills = await Billing.find({}).sort({ createdAt: -1 });
        res.status(200).json(bills);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBillById = async(req, res)=>{
    const {id} = req.params 
    try{
        const bill = await Billing.findById(id)
        if(!bill)
        {
            return res.status(404).json("Bill not found")
        }
        res.status(200).json(bill)
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

const deleteBill = async (req, res) => {
    const { billId } = req.params;

    try {
        const bill = await Billing.findByIdAndDelete(billId);
        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        res.status(200).json({ message: 'Bill deleted successfully', bill });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addBillForCart, addBillForOne, editBill, getBills,getBillById, deleteBill };
