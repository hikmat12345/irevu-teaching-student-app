export default function axiosOptions ( userToken ) {
    return {
        headers : {
            Authorization : `${userToken}`
        }
    }
}