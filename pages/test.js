import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button } from "@chakra-ui/react"
export default function Test() {
	const stripe = useStripe()
	const elements = useElements()

	const handleSubmit = async e => {
		e.preventDefault()

		if (!stripe || !elements) return
	}

	return (
		<Elements>
			<form>
				<PaymentElement />
				<Button type="submit">Submit</Button>
			</form>
		</Elements>
	)
}
