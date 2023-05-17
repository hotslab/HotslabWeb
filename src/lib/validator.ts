import Validator, { Rules, ErrorMessages } from 'validatorjs'

export type ValidatorResponse = {
    failed: boolean
    errors: string | null
}

const validator = async (body: any, rules: Rules, customMessages: ErrorMessages = {}): Promise<ValidatorResponse> => {
    const validation = new Validator(body, rules, customMessages)
    console.log(validation.passes(), validation.fails(), validation.errors.all())
    if (validation.passes()) return { failed: false, errors: null }
    const errors = Object.entries(validation.errors.all())

    let errorMessage = ""
    for (let i = 0; i < errors.length; i++) {
        const messages = errors[i][1]
            .reduce((pv, cv, i, arr) => pv += `<p>- ${cv}</p>`, '')
        errorMessage += `
        <p><b>${i + 1} .${errors[i][0]}</b></p>
        <p> ${messages}</p><br/>
        `
    }
    return { failed: true, errors: errorMessage }
}

export default validator