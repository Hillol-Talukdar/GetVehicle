import { React } from "react";
import { ButtonGroup, Dropdown, DropdownButton, Image } from 'react-bootstrap';
import "./LoggedInUserInfoContainer.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { TooltipConstants, DropDownContants } from "../../../Constants/CommonConstants";


const LoggedInUserInfoContainer = ({ userInfo }) => {
    
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {TooltipConstants.LOGGED_IN_USER_IMAGE_HOVER_TOOLTIP}
        </Tooltip>
    );

    return (
        <div className="ms-auto">
            <DropdownButton
                align={{ sm: 'end' }}
                title={
                    <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 320 }}
                        overlay={renderTooltip}
                        trigger={["click", "hover"]}
                    >
                        <div className="Drop small btn-primary-outline" >
                            <Image src={userInfo.imageUrl} rounded thumbnail className="user-image" key={userInfo._id} />
                        </div>
                    </OverlayTrigger>
                }
                size="sm"
                variant="light"
            >
                <Dropdown.Item eventKey="1">{DropDownContants.VIEW_PROFILE}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2">{DropDownContants.LOGOUT}</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default LoggedInUserInfoContainer;
