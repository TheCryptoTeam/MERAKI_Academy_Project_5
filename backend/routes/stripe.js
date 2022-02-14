const express = require("express")

const stripeRouter = express.Router()
const cors=require("cors");
const stripe = require("stripe")("sk_test_51KQqbdCywILMWPHuMzkrMCO0iiSN0fIbVRQehXTMJaasAO927Mn1weGMcprYEtoV3e9gWz3quXfgJ7GRhGCgl5PL00xdKgtFW2")



stripeRouter.use(cors())



stripeRouter.post("/", cors(), async (req, res) => {
	let { payment_method } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount:200,
			currency: "USD",
			description: "Spatula company",
			payment_method: payment_method,
			confirm: true
		})
	
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
	
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})





module.exports = stripeRouter;
