import moment from "moment";
export default function DefaultDateFormat ( date ) {
    return moment(date).format("MMMM DD, YYYY")
}