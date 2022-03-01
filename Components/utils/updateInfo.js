import { useState, useEffect } from "react"
import { user } from "../../utils/User"
import { RenderForm } from "./RenderForm"
import { WarnAlert } from "./warning"
export const UpdateInfoComponent = () => {
	const [userInfo, setUserInfo] = useState()
	useEffect(() => {
		user.getUser().then(res => {
			setUserInfo({
				firstName: res.firstName,
				lastName: res.lastName,
				email: res.email,
				age: res.age,
				billingAdress: res.billingAdress,
				city: res.city,
				country: res.country,
				id: res.id,
				zipCode: res.zipCode,
			})
		})
	}, [])
	console.log(userInfo)
	const handleSubmit = async () => {
		const updatedUser = await user.alterUser({ newInfo: userInfo })
	}
	return (
		<form onSubmit={handleSubmit}>
			<WarnAlert
				handleSubmit={handleSubmit}
				ButtonText={"alter Info"}
				HeaderText="Alter your user info"
				ConfirmButton="Confirm"
			>
				<RenderForm data={userInfo} setData={setUserInfo} />
			</WarnAlert>
		</form>
	)
}
