import { LoginSchemaType, registerSchemaType } from "@/lib/AuthSchemas/RegisterSchema";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function signUpUser(formdata: registerSchemaType) {
    const response = await fetch(`${API_URL}/auth/signup`,
        {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const data = await response.json();

    return data

}

export async function signInUser(formdata: LoginSchemaType) {
    const response = await fetch(`${API_URL}/auth/signin`,
        {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const data = await response.json();

    return data

}