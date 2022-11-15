// import { ImInstagram } from "react-icons/im";


const Contact = ()=>{
    return(
        <div className="contact-page">
            <h1>Dress to Impress</h1>
            <h1>info@dresstoimpress</h1>
            {/* <h2>ImInstagram <ImInstagram /> </h2> */}
            <form>
                <label>Email</label>
                <input type="text"/>
                <button>Subscribe</button>
            </form>
        </div>
    )
}

export default Contact;