import useCustomshipModel from "./useCustomshipModel";

export default function useCustomshipViewModel () {
    
    const {fetchAllCustomship, fetchSingleCustomship, deleteCustomship, updateCustomship, createCustomship} = useCustomshipModel()

    return {fetchAllCustomship, fetchSingleCustomship, deleteCustomship, updateCustomship, createCustomship}
}