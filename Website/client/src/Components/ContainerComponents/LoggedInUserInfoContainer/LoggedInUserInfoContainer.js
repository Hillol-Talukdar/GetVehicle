import { React } from "react";
import { ButtonGroup, Dropdown, DropdownButton, Image } from 'react-bootstrap';
import "./LoggedInUserInfoContainer.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { TooltipConstants, DropDownContants } from "../../../Constants/CommonConstants";
import { useDispatch } from "react-redux";
import { googleLogout } from "../../../Services/GoogleAuthService";


const LoggedInUserInfoContainer = ({ userInfo }) => {

    const dispatch = useDispatch();
    
    const handleSelection = (eventKey) => {
        switch(eventKey) {
            case DropDownContants.VIEW_PROFILE.EVENT_KEY:
              //TODO
              break;
            case DropDownContants.LOGOUT.EVENT_KEY:
              googleLogout(dispatch);
              break;
          }
    }

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
                onSelect={handleSelection}
            >
                <Dropdown.Item eventKey={DropDownContants.VIEW_PROFILE.EVENT_KEY}>{DropDownContants.VIEW_PROFILE.DISPLAY_VALUE}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey={DropDownContants.LOGOUT.EVENT_KEY}>{DropDownContants.LOGOUT.DISPLAY_VALUE}</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default LoggedInUserInfoContainer;