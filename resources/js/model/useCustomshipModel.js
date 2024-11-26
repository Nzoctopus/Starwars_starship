export default function useCustomshipModel() {
    const fetchAllCustomship = async () => {
        const result = await fetch("/api/custom");
        return await result.json();
    };

    const fetchSingleCustomship = async (id) => {
        const result = await fetch(`/api/custom/${id}`);
        return await result.json();
    };

    const deleteCustomship = async (id) => {
        return await axios.post("/delete/customship", { id: id });
    };

    const updateCustomship = async (data) => {
        return await axios.post('/modify/customship', data, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
    };

    const createCustomship = async (data) => {
        return await axios.post('/store/ship', data, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
    };

    return {
        fetchAllCustomship,
        fetchSingleCustomship,
        deleteCustomship,
        updateCustomship,
        createCustomship,
    };
}
