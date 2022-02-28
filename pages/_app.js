import { ChakraProvider } from "@chakra-ui/react"
import { Nav } from "../Components/Navbar"
import theme from "../theme"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromize = loadStripe(
	"pk_live_51KR12VC6yP4tONR7fCIzq1neY7vY7O8o3ugvkIOmNw4j02xjAr7THrWQBHbdroJl0U7V1cHiSYMej3CvVxdLKHJI00GaVI5BSk"
)

function MyApp({ Component, pageProps }) {
	const options = {
		clientSecret:
			"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",
	}
	return (
		<ChakraProvider theme={theme}>
			<Elements stripe={stripePromize} options={options}>
				<Nav />
				<Component {...pageProps} />
			</Elements>
		</ChakraProvider>
	)
}

export default MyApp
