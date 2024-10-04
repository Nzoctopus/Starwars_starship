export default function useCustomshipModel () {
    
    const fetchAllCustomship = async () => {
        const result = await fetch('/api/custom');
        return await result.json();
    }

    const fetchSingleCustomship = async (id) => {
        const result = await fetch(`/api/custom/${id}`);
        return await result.json();
    }

    const deleteCustomship = async (id) => {
        console.log("id = ", id);
        console.log("send to ", '/delete/customship');
        return await axios.post('/delete/customship', {id: id});
    }

    const updateCustomship = async (data) => {
        console.log("link = ", '/modify/customship');
        console.log("final data = ", data);
        return await axios.post('/modify/customship', data);
    }

    const createCustomship = async (data) => {
        console.log("link = ", '/store/ship');
        console.log("final data = ", data);
        return await axios.post('/store/ship', data);
    }

    return {fetchAllCustomship, fetchSingleCustomship, deleteCustomship, updateCustomship, createCustomship};
}