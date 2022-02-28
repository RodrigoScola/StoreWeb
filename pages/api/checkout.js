const stripe = require("stripe")(
	"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"
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
			success_url: "https://stripe.com/docs/error-handling",
			cancel_url: `https://www.codecademy.com/learn`,
		})
		// res.redirect(303, session.url)
		console.log(session)
		res.send(req.query)
	} catch (err) {
		console.log(err)
		res.status(err.statusCode || 500).json(err.message)
	}
}
