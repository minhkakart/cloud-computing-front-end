import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function MessageModal({ message, show, link }) {
    return (
        <Modal show={show} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Link to={link} className="btn btn-primary">Ok</Link>
            </Modal.Footer>
        </Modal>
    );
}

export default MessageModal;
