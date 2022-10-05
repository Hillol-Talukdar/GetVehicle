import { React } from "react";
import { Image } from 'react-bootstrap';
import "./LoggedInUserInfoContainer.css"


const LoggedInUserInfoContainer = ({ userInfo }) => {
    return (
       <Image src={userInfo.imageUrl} rounded thumbnail className="user-image" key={userInfo._id}/>
    )
}

export default LoggedInUserInfoContainer;
