const server = require("../../utils/server")
import { Avatar, Box, Text, Divider, VStack } from "@chakra-ui/react"
import Link from "next/link"
import useUserInfo from "../../Components/utils/hooks/useUserInfo"
import { LogOut } from "../../Components/utils/Logging"
import NewProductComponent from "../../Components/utils/NewProductComponent"
import { UpdateInfoComponent } from "../../Components/utils/updateInfo"
import { WarnAlert } from "../../Components/utils/warning"
import { user } from "../../utils/User"
const string = require("lodash/string")
const { getProduct } = require("../../utils/Product")
export default function ProfilePage({ userInfo, products, file }) {
	let [userId, value] = useUserInfo()
	if (!userInfo) return <>user not found</>
	const name = `${string.capitalize(userInfo.firstName)} ${string.capitalize(userInfo.lastName)}`
	let component
	console.log(value)
	if (value && userId == userInfo.userId) {
		component = (
			<VStack alignItems="flex-start" spacing="5">
				{value.verified ? (
					<>
						<NewProductComponent />
						<UpdateInfoComponent />
					</>
				) : null}
				<WarnAlert
					BodyText="this action cannot be undone"
					ButtonText="Delete Account"
					HeaderText="Delete Account"
					ConfirmButton="Delete"
					handleSubmit={user.deleteAccount}
				/>
				<LogOut />
			</VStack>
		)
	}
	return (
		<Box m="15">
			{file ? <Avatar size="2xl" src={file} /> : null}
			<Text>{name}</Text>
			<Text>{userInfo.email}</Text>
			<Text>
				{userInfo.verified ? "verified account" : <Link href="/validate-account">verify account</Link>}
			</Text>
			{component}
			<Divider />
			{/* <ProductsComponent products={products} /> */}
		</Box>
	)
}
export async function getStaticProps({ params }) {
	const { id } = params
	let userInfo = await user.getUser(id)

	let products = await getProduct()
	const file = await server.getFile({
		userId: id,
	})
	return {
		props: {
			file,
			userInfo,
			products: products,
		},
	}
}
export async function getStaticPaths() {
	return {
		paths: [{ params: { id: "0d3684bf-aeb9-4b41-a95b-3b783a56ed4a" } }],
		fallback: true,
	}
}
