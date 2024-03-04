import CircularJSON from "circular-json";


const credentials = {
    username: 'divyach@nanoheal.com',
    password: 'Nano@124$$'
};

let myresponse
export const sessionStart = async (req, res) => {
    try {
        const response = await fetch('https://app.five9.com/appsvcs/rs/svc/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify({ // Ensure correct capitalization
                passwordCredentials: credentials,
                policy: 'ForceIn'
            })
        });
        const data  = await response.json()
        myresponse = data
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}
console.log("myresponse is ", myresponse)

export const getAgents = async(req,res)=>{
    try {
        // Extract necessary information from the successful login response
        const { tokenId, sessionId, orgId, userId ,  constext} = req.body;

        // Construct the API URL using the context
        const apiUrl = "https://app-atl.five9.com:443/supsvcs/rs/svc/agents?from=0&limit=0";

        // Make a request to retrieve the list of agents
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer-ecfe14e9-d611-11ee-f1af-46e1aa3da046` 
            }
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Failed to fetch agents. Status: ${response.status}`);
        }

        // Parse the response JSON and send it back
        const agents = await response.json();
        res.status(200).json(agents);

    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}

export const supervisorLogin = async (req,res) => {
    const url = 'https://app.five9.com/appsvcs/rs/svc/auth/login';

    const requestBody = {
        passwordCredentials: {
            username:" divyach@nanoheal.com",
            password: "Nano@124$$"
        },
        appKey: 'web-ui',
        policy: 'AttachExisting'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch. Status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(CircularJSON.stringify({data}))
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function getAgentsByOrgId(req,res) {
    const baseUrl = "https://app-atl.five9.com:443/supsvcs/rs/svc";
    const endpoint = `/agents?from=0&limit=0`;

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer-ecfe14e9-d611-11ee-f1af-46e1aa3da046',
                "farmId":"3000000000000000021"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch agents. Status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(CircularJSON.stringify({data}))
        return data;
    } catch (error) {
        console.error('Error fetching agents:', error);
        res.status(500).json(CircularJSON.stringify({error}))
        throw error;
    }
}