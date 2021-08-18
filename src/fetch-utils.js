const URL = 'https://serene-garden-03124.herokuapp.com';
  
export const getScientists = async () => {
    const resp = await fetch(`${URL}/scientists`);
    const data = await resp.json();
    return data;
}

export const getScientist = async (id) => {
    const resp = await fetch(`${URL}/scientists/${id}`);
    const data = await resp.json();
    return data;
}

// export const upDateScientist = async (id, obj) {
//     const 
// } 

export const getSpecialties = async () => {
    const resp = await fetch(`${URL}/specialties`);
    const data = await resp.json();
    return data;
}

export const getIdByName = async (obj, name) => {
    for (let item of obj) {
        if (item.name === name) {
            return item.id;
        }
    }
    return null;
}

export const putScientist = async (id, obj) => {
    const response = await fetch(`${URL}/scientists/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    return response.json();
    
}