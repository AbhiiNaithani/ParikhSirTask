
export const getDomains = async () => {
    try {
        const response = await fetch(`https://api.propeers.in/api/v1/domains/allDomains`, {
            method: 'GET'
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        return { "msz": "Something went wrong", "success": false, }
    }
};