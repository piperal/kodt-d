'use client'
import { useState } from "react"

export default function ApiCall() {
    const [data, setData] = useState()
    const [error, setError] = useState()

    const callApi = async () => {
        try {
            const response = await fetch('/api/message')
            setData(await response.json())
            console.log(data)
        }
        catch (err) {
            if (err) {
                setError(err)
            }
        }
    }

    return (<>
        <div>
            <button onClick={() => { callApi() }}>Load server message</button>
        </div>

        {data && <div>{data.message}</div>}
        {error && <div>There seems to be an error with the API, contact custoemer support for more information</div>}
    </>)

}