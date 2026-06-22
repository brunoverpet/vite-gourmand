import vine from '@vinejs/vine'

export const updateMaterialLoanValidator = vine.create({
  materialLoan: vine.boolean(),
})
