'use server'

export async function signInAction() {
    const data = await fetch('http://localhost:3001/sign-in',
        {
            method: 'POST',
            body: JSON.stringify({
                email: "kot_yo_nok1@ukr.net",
                password: "Password1!"
            }),
        });
    const token = await data.json()
    console.log(token);
}