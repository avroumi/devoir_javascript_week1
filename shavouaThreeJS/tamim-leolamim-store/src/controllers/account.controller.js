import { getCustomerBalance } from "../services/account.service.js"
import { sendSuccess } from "../utils/responses.js"

export const getBalance = async (req, res) => {
    const { customerId } = req.query

    const balance = await getCustomerBalance(customerId)

    sendSuccess(res, balance)
}