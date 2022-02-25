const stripe = require("stripe")(
	// this is a public key
	process.env.STRIPE_SECRET
)

export default async function handler(req, res) {
	try {
		console.log(req.query.id)
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: req.query.productId,
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `https://web-d18qxmek9-rodrigoscola.vercel.app/product/${req.query.product}/?success=true`,
			cancel_url: `https://web-d18qxmek9-rodrigoscola.vercel.app/?canceled=true`,
		})
		res.redirect(303, session.url)
		res.send(req.query)
	} catch (err) {
		res.status(err.statusCode || 500).json(err.message)
	}
}
