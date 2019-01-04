
export function lookupOptionsPOSTNoToken(data){
    return{
        method: "POST",
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
}


export function lookupOptionIncludeToken(token) {
    return {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        credentials: 'include'
    }
}

export function lookupOptionPOST(token, data) {
    return {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }
}


export function lookupOptionPUT(token, data) {
    return {
        method: 'PUT',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }
}

export function lookupOptionDELETE(token) {
    return {
        method: 'DELETE',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        credentials: 'include',

    }
}