import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

export default function KambazNavigation() {
    const location = useLocation();

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? "list-group-item text-center border-0 bg-white text-danger"
            : "list-group-item text-center border-0 bg-black text-white";
    };

    return (
        <div id="wd-kambaz-navigation" style={{ width: 120 }}
            className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
            <a id="wd-neu-link" target="_blank"
                href="https://www.northeastern.edu/"
                className="list-group-item bg-black border-0 text-center">
                <img src="/images/NEU.png" width="75px" /></a>
            <Link to="/Kambaz/Account" id="wd-account-link"
                className={getLinkClass("/Kambaz/Account")}>
                <FaRegCircleUser className="fs-1 text-danger" /><br />
                Account </Link>
            <Link to="/Kambaz/Dashboard" id="wd-dashboard-link"
                className={getLinkClass("/Kambaz/Dashboard")}>
                <AiOutlineDashboard className="fs-1 text-danger" /><br />
                Dashboard </Link>
            <Link to="/Kambaz/Dashboard" id="wd-course-link"
                className={getLinkClass("/Kambaz/Courses")}>
                <LiaBookSolid className="fs-1 text-danger" /><br />
                Courses </Link>
            <Link to="/Kambaz/Calendar" id="wd-calendar-link"
                className={getLinkClass("/Kambaz/Calendar")}>
                <IoCalendarOutline className="fs-1 text-danger" /><br />
                Calendar </Link>
            <Link to="/Kambaz/Inbox" id="wd-inbox-link"
                className={getLinkClass("/Kambaz/Inbox")}>
                <FaInbox className="fs-1 text-danger" /><br />
                Inbox </Link>
            <Link to="/Labs" id="wd-labs-link"
                className={getLinkClass("/Kambaz/Labs")}>
                <LiaCogSolid className="fs-1 text-danger" /><br />
                Labs </Link>
        </div>
    );
}