const URL = 'https://serene-garden-03124.herokuapp.com';
  
export const getScientists  = async () => {
    const resp = await fetch(`${URL}/scientists`);
    const data = await resp.json();
    return data;
}